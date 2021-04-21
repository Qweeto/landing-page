const Provider = require('oidc-provider');
const { JWKS } = require('jose');
const Account = require('../models/account');
const FirestoreAdapter = require('../adapters/firestore.js');
const admin = require('../services/admin.js');

const db = admin.firestore();

// todo
// const { IS_PRODUCTION, SECURE_KEY } = require('../environment');

/**
 * @returns {Promise<Provider>}
 */
module.exports = async () => {
  const {
    interactionPolicy: { base: policy },
  } = Provider;

  const keystore = new JWKS.KeyStore();
  await Promise.all([
    keystore.generate('RSA', undefined, { use: 'sig' }),
    keystore.generate('EC', undefined, { key_ops: ['sign', 'verify'] }),
  ]);

  const querySnapshot = await db.collection('clients').get();

  const configuration = {
    get clients () {
      let clients = [];
      querySnapshot.forEach((doc) => {
        if (doc.id) {
          const data = doc.data();

          // насыщаем редирект текущим урлом сервера
          data.redirect_uris.unshift(process.env.SERVER_HOST + '/' + process.env.SERVER_PREFIX + '/oidcallback?client_id=tg'); // fixme поменять client_id

          clients.push(data);
        }
      });
      return clients;
    },
    get jwks() {
      return keystore.toJWKS(true);
    },

    // This interface is required by oidc-provider
    findAccount: Account.findAccount,

    // hack https://github.com/panva/node-oidc-provider/blob/master/docs/README.md#id-token-does-not-include-claims-other-than-sub
    conformIdTokenClaims: false,
    claims: {
      email: ['email', 'email_verified'],
      profile: ['locale', 'client_id', 'name', 'updated_at', 'zoneinfo'],
    },
    features: {
      clientCredentials: { enabled: true },
      introspection: { enabled: true },
      revocation: { enabled: true },
      registration: { initialAccessToken: true },
      requestObjects: { request: true },
      encryption: { enabled: true },
      jwtIntrospection: { enabled: true },
      jwtResponseModes: { enabled: true },
      devInteractions: { enabled: false },
    },
    interactions: {
      get policy() {
        // copies the default policy, already has login and consent prompt policies
        const interactions = policy();
        return interactions;
      },
      url(context) {
        return '/' + process.env.SERVER_PREFIX + `/interaction/${context.oidc.uid}`;
      },
    },
    format: { default: 'opaque' },
    ttl: {
      AccessToken: 1 * 60 * 60, // 1 hour in seconds
      AuthorizationCode: 10 * 60, // 10 minutes in seconds
      IdToken: 1 * 60 * 60, // 1 hour in seconds
      RefreshToken: 1 * 24 * 60 * 60, // 1 day in seconds
    },
  };
  console.log('oidc init');

  const provider = new Provider(process.env.SERVER_HOST, {
    adapter: FirestoreAdapter,
    ...configuration,
  });

  // if (IS_PRODUCTION) {
  //   provider.proxy = true;
  //   provider.keys = SECURE_KEY.split(',');
  // }
  return provider;
};

const jose = require('jose');
const e = require('express');
const fetch = require('node-fetch');

class OIDC {
  constructor(provider) {
    this.oidc = provider;
  }
  /**
   * @description callback должен выполняться на ассистенте и записывать JWT в свою БД
   * @param {e.Request} request - request
   * @param {e.Response} response - response
   * @returns {Promise<void>}
   */
  async oidcallback(request, response) {
    console.log('oidcallback @@@');
    try {
      if (request.error) {
        console.log('zzz 111')
        throw new Error(request.error);
      }
      if (request.query.error) {
        console.log('zzz 222')
        throw new Error(
          request.query.error + '\n' + request.query.error_description,
        );
      }
      console.log('zzz', request.query)

      const res = await fetch(process.env.SERVER_HOST + '/' + process.env.SERVER_PREFIX + '/token', {
        method: 'POST',
        body: new URLSearchParams({
            'client_id': request.query.client_id,
            'client_secret': 'foobar',
            'code': request.query.code,
            'grant_type': 'authorization_code',
            'redirect_uri': process.env.SERVER_HOST + '/' + process.env.SERVER_PREFIX + `/oidcallback?client_id=${request.query.client_id}`,
        }),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cache-Control': 'no-cache',
        },
      });
      console.log('olololo 222', JSON.stringify({
        'client_id': request.query.client_id,
        'client_secret': 'foobar',
        'code': request.query.code,
        'grant_type': 'authorization_code',
        'redirect_uri': process.env.SERVER_HOST + '/' + process.env.SERVER_PREFIX + `/oidcallback?client_id=${request.query.client_id}`,
      }))

      let tokenResult;
      try {
        tokenResult = await res.json();
      } catch (e) {
        console.log('e', e)
      }


      console.log('json', tokenResult);

      // перенести в апи marketplace-one
      const decoded = jose.JWT.decode(tokenResult.id_token);
      console.log('decoded', decoded);



      // думаю тут надо просто возвращать decoded без какой-либо остальной логики
      // а лучше возвращать данные маркетплейса


      // fixme перенести marketplace на firebase
      const marketplace = await apiRequest({
        jsonrpc: '2.0',
        id: 'xxxxx',
        method: 'marketplace-one',
        params: {
          client_id: request.query.client_id,
        },
      });
      const assistantBot = await apiRequest({
        jsonrpc: '2.0',
        id: 'xxxxx',
        method: 'assistant-one-by-email',
        params: {
          email: decoded.email,
        },
      });
      if (assistantBot) {
        // logger.info('Updating current assistant.bot');
        await apiRequest({
          jsonrpc: '2.0',
          id: 'xxxxx',
          method: 'assistant-update-token',
          params: {
            token: tokenResult.id_token,
            bot_user_email: assistantBot.bot_user_email,
          },
        });
      } else {
        // logger.info('Creating new assistant.bot');
        await apiRequest({
          jsonrpc: '2.0',
          id: 'xxxxx',
          method: 'assistant-create-new',
          params: {
            assistantMarketplaceId: marketplace.id,
            token: tokenResult.id_token,
            bot_user_email: decoded.email,
          },
        });
      }



      request.session.passportId = decoded.client_id;
      // в случае успеха надо перекидывать на homepage страницу ассистента
      if (marketplace.homepage.length > 0) {
        response.redirect(marketplace.homepage);
        return;
      }
      response.send(
        `Привязан/обновлен ассистент ${decoded.aud} для бота ${decoded.email}.`,
      );
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  }
  /**
   * @see https://github.com/panva/node-oidc-provider/blob/master/example/routes/express.js
   * @param {e.Request} request - request
   * @param {e.Response} response - response
   * @returns {any}
   */
  async interactionUID(request, response) {
    console.log('interactionUID');
    try {
      const details = await this.oidc.interactionDetails(request, response);
      const { uid, prompt, params, session } = details;
      // eslint-disable-next-line unicorn/no-fn-reference-in-iterator
      const client = await this.oidc.Client.find(params.client_id);
      switch (prompt.name) {
        case 'select_account': {
          if (!session) {
            return this.oidc.interactionFinished(
              request,
              response,
              { select_account: {} },
              { mergeWithLastSubmission: false },
            );
          }

          // todo findAccount
          // const account = await Account.findAccount(
          //   undefined,
          //   session.accountId,
          // );
          // const { email } = await account.claims(
          //   'prompt',
          //   'email',
          //   { email: null },
          //   [],
          // );

          // return res.render('select_account', {
          //   client,
          //   uid,
          //   email,
          //   details: prompt.details,
          //   params,
          //   title: 'Sign-in',
          //   session: session ? debug(session) : undefined,
          //   dbg: {
          //     params: debug(params),
          //     prompt: debug(prompt),
          //   },
          // });
          break;
        }
        case 'login': {
          const interactionLoginView = require('../views/oidc/interaction.login.js');
          response.send(interactionLoginView({
            uid,
            clientId: client.clientId
          }));
          break;
        }
        case 'consent': {
          const interactionConsentView = require('../views/oidc/interaction.consent.js');
          response.send(interactionConsentView({
            uid,
            details: prompt.details,
          }));
          break;
        }
        default: {
          return;
        }
      }
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  }
  /**
   * @description authenticate
   * @param {e.Request} request - request
   * @param {e.Response} response - response
   */
  async interactionLogin(request, response) {
    console.log('interactionLogin');
    try {
      const {
        prompt: { name },
      } = await this.oidc.interactionDetails(request, response);
      console.log('name: ' + name);
      const botInfo = {id: '3555d074-b52b-4703-a8c4-96ad9edf43e9'}
      // const botInfo = await apiRequest({
      //   jsonrpc: '2.0',
      //   id: 'xxxxx',
      //   method: 'bot-get-passport',
      //   params: request.body,
      // });
      const result = {
        select_account: {}, // make sure its skipped by the interaction policy since we just logged in
        login: {
          account: botInfo.id,
        },
      };
      await this.oidc.interactionFinished(request, response, result, {
        mergeWithLastSubmission: false,
      });
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  }
  /**
   * @param {e.Request} request - request
   * @param {e.Response} response - response
   */
  async interactionContinue(request, response) {
    console.log('interactionContinue');
    try {
      const interaction = await this.oidc.interactionDetails(request, response);
      if (request.body.switch) {
        if (interaction.params.prompt) {
          const prompts = new Set(interaction.params.prompt.split(' '));
          prompts.add('login');
          interaction.params.prompt = [...prompts].join(' ');
        } else {
          interaction.params.prompt = 'logout';
        }
        await interaction.save();
      }
      const result = { select_account: {} };
      await this.oidc.interactionFinished(request, response, result, {
        mergeWithLastSubmission: false,
      });
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  }
  /**
   * @param {e.Request} request - request
   * @param {e.Response} response - response
   */
  async interactionConfirm(request, response) {
    console.log('interactionConfirm');
    try {
      await this.oidc.interactionFinished(
        request,
        response,
        {
          consent: {
            // rejectedScopes: [], // < uncomment and add rejections here
            // rejectedClaims: [], // < uncomment and add rejections here
          },
        },
        {
          mergeWithLastSubmission: true,
        },
      );
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  }
  /**
   * @param {e.Request} request - request
   * @param {e.Response} response - response
   */
  async interactionAbort(request, response) {
    console.log('interactionAbort');
    try {
      const result = {
        error: 'access_denied',
        error_description: 'End-User aborted interaction',
      };
      await this.oidc.interactionFinished(request, response, result, {
        mergeWithLastSubmission: false,
      });
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  }
}

module.exports = OIDC;

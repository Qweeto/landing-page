# gotois Landing Page [![Build Status](https://travis-ci.org/gotois/landing-page.svg?branch=master)](https://travis-ci.org/gotois/landing-page) [![devDependencies Status](https://david-dm.org/gotois/landing-page/dev-status.svg)](https://david-dm.org/gotois/landing-page?type=dev)

## Open Mobirise project
[Install app](https://mobirise.com/)

## Serve local server
```bash
npm run dev
```

### Log in
```bash
./node_modules/.bin/firebase login:ci
```

### Use Travis CI set Environment Variables
```
FIREBASE_TOKEN: ••••••••••••••••
```

### Set firebase credential environment
Set [google service accounts credential](https://console.firebase.google.com/project/tewst-landing-page/settings/serviceaccounts/adminsdk)
```bash
firebase functions:config:set service_account.type=••••••••••••••••
firebase functions:config:set service_account.project_id=••••••••••••••••
firebase functions:config:set service_account.private_key_id=••••••••••••••••
firebase functions:config:set service_account.private_key=••••••••••••••••
firebase functions:config:set service_account.client_email=••••••••••••••••
firebase functions:config:set service_account.client_id=••••••••••••••••
firebase functions:config:set service_account.auth_uri=••••••••••••••••
firebase functions:config:set service_account.token_uri=••••••••••••••••
firebase functions:config:set service_account.auth_provider_x509_cert_url=••••••••••••••••
firebase functions:config:set service_account.client_x509_cert_url=••••••••••••••••
``` 

With ❤️

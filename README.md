# gotois Landing Page [![Build Status](https://travis-ci.org/gotois/landing-page.svg?branch=master)](https://travis-ci.org/gotois/landing-page) [![devDependencies Status](https://david-dm.org/gotois/landing-page/dev-status.svg)](https://david-dm.org/gotois/landing-page?type=dev)

## Open Mobirise project
[Install app](https://mobirise.com/)

```bash
firebase init emulators # toggle all
```

## Serve static local server
```bash
npm run dev
```

## Serve function local server
```bash
cd functions
npm run serve
```

## Server https
```bash
npm run expose
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

Remove \n symbols
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

Посмотреть список параметров oidc
---

<http://localhost:9000/oidc/.well-known/openid-configuration>
OR
https://e5eff3e97696.ngrok.io/tewst-landing-page/us-central1/app/.well-known/openid-configuration

Примеры
---
1) Зарегистрируйте клиента (ака ассистент, например, tg или email) в БД firestore

2) Сгенерируйте бота

3) Пусть бот авторизуется, например, с Telegram assistant'ом
https://e5eff3e97696.ngrok.io/tewst-landing-page/us-central1/app/auth?client_id=tg&client_secret=foobar&response_type=code&scope=openid%20email%20profile
Ввод ботом email/password вашего бота в OpenID Connect
Бот перейдет на колбэк, например, на <http://0.0.0.0:9000/oidcallback?code=EOB2dYP9V6ZO7H1fFVFVS81LAfLPTzXVFeiZDNXJQZ2>
Боту предоставится ключ для пользования выбранным ассистентом и определенным сроком жизни

With ❤️

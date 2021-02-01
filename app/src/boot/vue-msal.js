// import Vue from 'vue'
import msal from 'vue-msal';

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files
export default async ({ /*app, router,*/ Vue}) => {
  Vue.use(msal, {
    auth: {
      clientId: process.env.CLIENT_ID,
      requireAuthOnInitialize: true,
      authority: process.env.AUTHORITY,
      redirectUri: process.env.REDIRECT_URI
    }
  });
};

import msalCreator from 'vue-msal';

export let msal;
export default async ({ /*app, router,*/ Vue}) => {
  const msalOptions = {
    auth: {
      clientId: process.env.CLIENT_ID,
      // requireAuthOnInitialize: true,
      authority: process.env.AUTHORITY,
      redirectUri: process.env.REDIRECT_URI
    }
  };

  // Clever hack by Gunnar so we can also use the instantiated msal object as named import outside vue components. Hurray!!!
  // We basically skip the install function i.e. Vue.use(...) (vue plugin interface) and instead construct the object ourselves. Then we also attach it to the Vue prototype ourselves.
  msal = msalCreator(msalOptions, Vue);
  Vue.prototype.$msal = msal;


  // Vue.use(msal, {
  //   auth: {
  //     clientId: process.env.CLIENT_ID,
  //     // requireAuthOnInitialize: true,
  //     authority: process.env.AUTHORITY,
  //     redirectUri: process.env.REDIRECT_URI
  //   }
  // });

};

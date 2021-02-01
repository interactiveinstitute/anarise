import Vue from 'vue';
import VueRouter from 'vue-router';
import {msal} from 'boot/vue-msal';

import routes from './routes';

Vue.use(VueRouter);

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  });

  const guestRoutes = [
    '/unauthorized'
  ];

  Router.beforeEach((to, from, next)=>{
    console.log('Navigating from:', from);
    console.log('to:', to);
    console.log('msal:', msal);
    console.log('logged in:', msal.isAuthenticated());

    if(guestRoutes.includes(to.path)){
      //path is ok for guests
      next();
      return;
    }

    // eslint-disable-next-line no-constant-condition
    if(msal && msal.isAuthenticated()){
      next();
      return;
    }

    next('/unauthorized');
    return;

  });

  return Router;
}

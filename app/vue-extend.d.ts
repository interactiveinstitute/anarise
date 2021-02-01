import Vue from 'vue';
import msal from 'vue-msal';


import { AxiosStatic } from 'axios';


declare module 'vue/types/vue' {
  // 3. Declare augmentation for Vue
  interface Vue {
    
    $axios: AxiosStatic,
    // $msal: typeof msal,
  }
}
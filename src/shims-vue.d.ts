declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}
// declare module 'vue/types/vue' {
//   interface Vue {
//     $getConfig: (...arg: any) => any
//   }
// }

declare module '@/assets/installPlugins.js';
declare module 'vant/lib/toast';
declare module 'vant/lib/dialog';
declare module 'vant/lib/overlay';
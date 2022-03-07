import { createApp } from 'vue';
import { Notify, Quasar } from 'quasar';

import 'quasar/src/css/index.sass';
import '@quasar/extras/material-icons/material-icons.css';

import App from './App.vue';
import { key, store } from './store';

createApp(App)
  .use(Quasar, { plugins: { Notify } })
  .use(store, key)
  .mount('#app');

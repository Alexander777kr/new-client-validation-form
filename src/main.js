import { VuelidatePlugin } from '@vuelidate/core';
import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);
app.use(VuelidatePlugin);
app.config.devtools = true;
app.mount('#app');

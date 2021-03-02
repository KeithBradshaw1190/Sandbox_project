import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    applicationId: process.env.applicationId,
    clientToken: process.env.clientToken,
    site: 'datadoghq.com',
    service: 'Sandbox-Book App',
    env: 'sandbox',
    version: '1.0.0',
    sampleRate: 100,
    trackInteractions: true,
    allowedTracingOrigins:["*"]
});
// Import Bootstrap 
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
// Import Toast plugin
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

Vue.use(Toast);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')



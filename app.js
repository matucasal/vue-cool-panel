import Vue from 'vue';
//import Vuetify from 'vuetify'; la vuetify 1.5
//import vuetify from '@/plugins/vuetify' // path to vuetify export
import vuetify from './plugins/vuetify' // path to vuetify export
import 'material-design-icons-iconfont/dist/material-design-icons.css' ;
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en';
import axiosClient from './AxiosClient';
import { Model } from 'vue-api-query';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css'



import App from './components/App';

Model.$http = axiosClient;

Vue.use(require('vue-moment'));
Vue.use(ElementUI, {locale});
//Vue.use(Vuetify)

Vue.use(VueMaterial);

let vm;
vm = new Vue({
    router,
    store,
    vuetify,
    el: '#app',
    components: { App }
});

export default vm;

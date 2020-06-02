import Vue from 'vue';
import App from '@front/views/App';
import store from '@front/store/index.js';
import router from '@front/router/index.js';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

import * as filters from '@front/filters';

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});

Vue.prototype.$filters = Vue.options.filters;

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
});

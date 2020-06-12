import Vue from 'vue';
import App from '@front/views/App'; // Корневой компонент
import store from '@front/store/index.js'; // store нужен для хранения состояния приложения
import router from '@front/router/index.js'; // конфгурация маршрутизатора
import axios from 'axios'; // необходимо для использования ajax запросов
import VueAxios from 'vue-axios';
import * as filters from '@front/filters';

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});

Vue.prototype.$filters = Vue.options.filters;

// инициализация Vue
new Vue({
    el: '#app', // элемент в DOM для инициализации
    router,
    store,
    render: h => h(App), // компонент, используемый в качестве корневого
});

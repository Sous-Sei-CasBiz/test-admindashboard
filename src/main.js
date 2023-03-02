import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import router from './router/router'
import store from './store/store'

//prime
import PrimeVue from 'primevue/config'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primevue/resources/themes/lara-light-indigo/theme.css'
import InputText from 'primevue/inputtext';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import Checkbox from 'primevue/checkbox';
import Menu from 'primevue/menu';
import TieredMenu from 'primevue/tieredmenu';
import Password from "primevue/password";
import Sidebar from "primevue/sidebar";
import PanelMenu from "primevue/panelmenu";

const app = createApp(App);
app.component('InputText', InputText);
app.component('Dialog', Dialog);
app.component('Checkbox', Checkbox);
app.component('Button', Button);
app.component('Toast', Toast);
app.component('Menu', Menu);
app.component('TieredMenu', TieredMenu);
app.component("Password", Password);
app.component("Sidebar", Sidebar);
app.component("PanelMenu", PanelMenu);

//use
app.use(PrimeVue);
app.use(router);
app.use(store); 
app.mount('#app');

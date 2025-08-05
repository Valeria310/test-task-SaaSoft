import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createPinia } from "pinia";
import vuetify from "./plugins/vuetify";

createApp(App).use(createPinia()).use(vuetify).mount("#app");

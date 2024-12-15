import { createApp } from "vue";
import { createPinia } from "pinia";
import "./assets/css/style.css";

import App from "./App.vue";
import router from "./router";
import SvgIcon from "@/components/SvgIcon.vue";
import axios from "axios";
import "virtual:svg-icons-register";

const pinia = createPinia();
const app = createApp(App);
app.config.globalProperties.axios = axios;

app.use(pinia);
app.use(router);
app.component("svg-icon", SvgIcon);

router.isReady().then(() => app.mount("#app"));

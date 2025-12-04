import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.ts";
import { createPinia } from "pinia";
import VScaleScreen from "v-scale-screen"; // 大屏适配插件
import ElementPlus from "element-plus"; // UI 组件库
import DataVVue3 from "@kjgl77/datav-vue3";
import "element-plus/dist/index.css";
import "@/assets/styles/reset.scss"; // 样式重置
import "@/assets/styles/global.scss"; // 全局样式

// 创建 App 实例
const app = createApp(App);
// 注册依赖
app.use(createPinia());
app.use(router);
app.use(ElementPlus);
app.use(VScaleScreen);
app.use(DataVVue3);


// 挂载 App
app.mount("#app");

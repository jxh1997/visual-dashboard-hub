/// <reference types="vite/client" />

// 声明 Vue 组件类型（避免 TS 报错）
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

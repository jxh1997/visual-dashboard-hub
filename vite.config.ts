import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { viteMockServe } from "vite-plugin-mock";
import path from "path";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// 1. 定义GitHub仓库名称（关键：必须与你的GitHub仓库名完全一致）
const GITHUB_REPO_NAME = "visual-dashboard-hub";

// 2. 动态设置base：开发环境/，生产环境/仓库名/
const base =
  process.env.NODE_ENV === "production" ? `/${GITHUB_REPO_NAME}/` : "/";

export default defineConfig({
  base, // 动态base路径
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [
    vue(),
    viteMockServe({
      mockPath: "src/api/mock",
      localEnabled: true,
      prodEnabled: false,
      supportTs: true,
      watchFiles: true,
    }),
    AutoImport({ resolvers: [ElementPlusResolver()] }),
    Components({ resolvers: [ElementPlusResolver()] }),
  ],
  build: {
    target: "es2015",
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          echarts: ["echarts"],
          datav: ["@datav-vue3"],
          element: ["element-plus"],
        },
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 自动导入变量文件（让所有组件的SCSS能识别$shadow等变量）
        additionalData: `@use "@/assets/styles/variables.scss";`,
        api: 'modern-compiler' 
      }
    }
  },
  server: {
    port: 3000,
    open: true, // 启动后自动打开 http://localhost:3000/
    cors: true,
  },
});

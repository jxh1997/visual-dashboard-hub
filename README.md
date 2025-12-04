# 可视化大屏集合（visual-dashboard-hub）
一款基于 Vue3 + TypeScript + ECharts 构建的可视化大屏案例集合，包含基础图表、3D 地图、业务大屏等多类型可视化案例，支持大屏自适应、案例分类/搜索等功能，可直接作为可视化开发参考或二次开发模板。

## ✨ 特性
- 🎨 **丰富的可视化案例**：覆盖基础图表、3D 地图、树图/关系图、业务大屏等场景
- 📱 **自适应布局**：基于 `v-scale-screen` 实现大屏自适应，兼容 PC/移动端
- 🚀 **工程化配置**：Vue3 + Vite + TypeScript 构建，支持 Mock 数据、按需加载
- 🔍 **案例检索**：支持案例分类筛选、关键词搜索，快速定位所需案例
- 📦 **开箱即用**：完整的项目结构，无需额外配置即可启动开发

## 📋 技术栈
| 技术 | 版本 | 说明 |
|------|------|------|
| Vue | ^3.4.21 | 核心框架 |
| TypeScript | ^5.4.5 | 类型校验 |
| Vite | ^5.2.11 | 构建工具 |
| ECharts | ^5.4.3 | 可视化核心 |
| @datav-vue3 | ^1.7.10 | 大屏组件库 |
| Element Plus | ^2.7.0 | UI 组件库 |
| Pinia | ^2.1.7 | 状态管理 |
| Vue Router | ^4.3.0 | 路由管理 |
| sass | ^1.77.0 | CSS 预处理器 |

## 🚀 快速开始
### 环境要求
- Node.js ≥ 16.0.0
- npm ≥ 8.0.0
- Git

### 安装与启动
```bash
# 克隆仓库
git clone https://github.com/jxh1997/visual-dashboard-hub.git

# 进入项目目录
cd visual-dashboard-hub

# 安装依赖
npm install

# 启动开发服务器（默认端口：3000）
npm run dev

# 构建生产包
npm run build

# 本地预览生产包
npm run preview

# 部署到 GitHub Pages
npm run deploy
```

### 访问地址
- 开发环境：http://localhost:3000
- 生产预览：http://localhost:4173/visual-dashboard-hub/
- GitHub Pages：https://jxh1997.github.io/visual-dashboard-hub/

## 📁 项目结构
```
visual-dashboard-hub/
├── public/                # 静态资源（不会被打包）
├── src/
│   ├── api/               # 接口相关
│   │   ├── mock/          # Mock 数据配置
│   │   └── case.ts        # 案例接口封装
│   ├── assets/            # 静态资源
│   │   ├── icons/         # 图标
│   │   ├── images/        # 图片（案例封面等）
│   │   └── styles/        # 样式文件
│   │       ├── reset.scss # 样式重置
│   │       ├── global.scss # 全局样式
│   │       └── variables.scss # 全局变量
│   ├── components/        # 组件
│   │   ├── common/        # 通用组件（Header/Footer 等）
│   │   ├── layout/        # 布局组件（大屏适配/主布局）
│   │   ├── visual/        # 可视化封装组件（ECharts 封装）
│   │   └── case/          # 案例组件（各类型可视化案例）
│   ├── hooks/             # 自定义 Hooks
│   ├── router/            # 路由配置
│   ├── stores/            # Pinia 状态管理
│   ├── types/             # TypeScript 类型定义
│   ├── utils/             # 工具函数
│   ├── views/             # 页面视图
│   │   ├── Home/          # 首页（案例列表）
│   │   ├── CaseDetail/    # 案例详情页
│   │   ├── Category/      # 分类页
│   │   ├── About/         # 关于页
│   │   └── NotFound/      # 404 页
│   ├── App.vue            # 根组件
│   ├── main.ts            # 入口文件
│   └── vite-env.d.ts      # Vite 类型声明
├── .gitignore             # Git 忽略文件
├── index.html             # 入口 HTML
├── package.json           # 依赖配置
├── tsconfig.json          # TypeScript 配置
├── tsconfig.node.json     # TypeScript 节点配置
└── vite.config.ts         # Vite 配置
```

## 🎯 核心功能
### 1. 案例分类
- **基础图表**：折线图、柱状图、饼图等基础可视化图表
- **树图/关系图**：树形图、力导向图、桑基图等
- **地图可视化**：2D/3D 地图、热力图、迁徙图等
- **3D 可视化**：3D 柱状图、3D 散点图、3D 地图等
- **业务大屏**：数据驾驶舱、监控大屏等业务场景

### 2. 大屏适配
基于 `v-scale-screen` 实现大屏自适应，支持：
- 宽度优先/高度优先缩放模式
- 自动监听窗口大小变化
- 移动端/PC 端自适应展示

### 3. 案例详情
- 案例可视化效果预览
- 案例标签/描述展示
- 返回/面包屑导航
- 代码展示（Vue/ECharts 配置/样式）

### 4. 搜索与筛选
- 关键词搜索（案例名称/标签/描述）
- 分类筛选（按可视化类型）
- 搜索结果实时更新

## 📌 自定义开发
### 新增可视化案例
1. 在 `src/components/case/` 下新建对应分类文件夹（如 `map/`）
2. 创建案例组件（如 `ChinaMap3D.vue`），基于 `EChartsWrap` 封装可视化逻辑
3. 在 `src/stores/caseStore.ts` 中注册案例信息（id/名称/分类/标签等）
4. 新增案例封面图至 `src/assets/images/cases/`
5. 访问首页即可看到新增案例

### 扩展大屏适配
修改 `src/components/layout/DashboardLayout.vue` 中的缩放配置：
```vue
<v-scale-screen
  :width="1920"   # 设计稿宽度
  :height="1080"  # 设计稿高度
  :mode="scaleMode" # 缩放模式（width-first/height-first）
/>
```

### 自定义样式
- 全局变量：修改 `src/assets/styles/variables.scss` 中的颜色/阴影/尺寸等变量
- 全局样式：修改 `src/assets/styles/global.scss` 中的通用样式
- 组件样式：在对应组件的 `<style scoped>` 中编写组件专属样式

## 🚢 部署说明
### GitHub Pages 部署
1. 确保仓库名称与 `vite.config.ts` 中的 `GITHUB_REPO_NAME` 一致
2. 执行 `npm run deploy` 自动构建并部署
3. 部署完成后访问：https://你的用户名.github.io/仓库名称/

### 其他部署方式
1. 执行 `npm run build` 生成 `dist` 目录
2. 将 `dist` 目录部署至 Nginx/Apache/Netlify/Vercel 等静态服务器
3. 配置服务器根目录指向 `dist` 文件夹

## 🐛 常见问题
### 1. 本地访问 404
- 检查 `vite.config.ts` 中的 `base` 配置：开发环境需为 `/`
- 确保 `index.html` 在项目根目录，且引入了 `src/main.ts`

### 2. SCSS 变量未定义
- 检查 `vite.config.ts` 中是否配置了 SCSS 全局变量自动导入
- 确保 `src/assets/styles/variables.scss` 文件存在且变量定义正确

### 3. ECharts 地图加载失败
- 确保已导入对应地图数据（如 `echarts/map/js/china`）
- 检查地图数据路径是否正确

### 4. 部署后路由刷新 404
- GitHub Pages：在 `public` 目录下新建 `404.html`（内容与 `index.html` 一致）
- Nginx：配置 `try_files $uri $uri/ /index.html;`

## 📄 许可证
本项目基于 MIT 许可证开源，详情见 [LICENSE](LICENSE) 文件。

## 📞 联系与反馈
- GitHub Issues：https://github.com/你的用户名/visual-dashboard-hub/issues
- 邮箱：你的邮箱@example.com

## ✨ 致谢
- [Vue3](https://vuejs.org/) - 核心框架
- [ECharts](https://echarts.apache.org/) - 可视化库
- [Element Plus](https://element-plus.org/) - UI 组件库
- [@datav-vue3](https://datav-vue3.netlify.app/) - 大屏组件库
- [v-scale-screen](https://github.com/tnfe/v-scale-screen) - 大屏适配插件
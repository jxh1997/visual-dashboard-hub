// src/stores/case.ts
import { defineStore } from "pinia";
import type { CaseItem, CaseCategory, CaseBasicInfo } from "@/types/case";
import {
    VideoPlay,
    Tools,
    MapLocation,
    Aim,
    Refresh,
    DataAnalysis
} from '@element-plus/icons-vue'
// ======================== 1. 大屏类型分类配置（对应文档6大核心类型） ========================
const caseCategories: CaseCategory[] = [
  {
    type: "business-monitor",
    name: "业务监控大屏",
    icon: VideoPlay,
    desc: "实时追踪核心指标、异常告警，支持多维度下钻分析",
    scene: ["企业运维", "业务监控", "实时数据追踪"],
    tech: ["WebSocket", "ECharts增量渲染", "阈值联动"],
  },
  {
    type: "data-cockpit",
    name: "数据驾驶舱",
    icon: Tools,
    desc: "企业全局数据汇总、决策支持，核心KPI突出展示",
    scene: ["高管决策", "部门数据汇总", "销售/运营/财务分析"],
    tech: ["分层布局", "数据过滤组件", "图表联动逻辑"],
  },
  {
    type: "gis-map",
    name: "地理信息大屏",
    icon: MapLocation,
    desc: "空间数据展示、区域分布分析，支持3D地图/热力/飞线",
    scene: ["物流追踪", "门店分布", "区域销售", "疫情防控"],
    tech: ["ECharts-GL 3D地图", "GeoJSON解析", "地图交互"],
  },
  {
    type: "industry-special",
    name: "行业专题大屏",
    icon: Aim,
    desc: "聚焦特定业务场景，定制化行业指标与可视化图表",
    scene: ["电商销售", "运维分析", "金融风控", "政务数据"],
    tech: ["自定义ECharts系列", "业务逻辑封装", "行业化组件"],
  },
  {
    type: "real-time-situation",
    name: "实时态势大屏",
    icon: Refresh,
    desc: "动态展示事件进展、资源状态，支持流线动画/实时计数",
    scene: ["事件监控", "资源调度", "实时态势感知"],
    tech: ["动画帧优化", "Canvas渲染", "数据节流"],
  },
  {
    type: "data-report",
    name: "数据汇报大屏",
    icon: DataAnalysis,
    desc: "静态数据展示、成果呈现，支持导出/打印/美观化排版",
    scene: ["会议汇报", "成果展示", "数据报告打印"],
    tech: ["静态数据预加载", "PDF/图片导出", "打印适配"],
  },
];

// ======================== 2. 高频模板列表（对应文档5大模板） ========================
const mockCaseList: CaseItem[] = [
  // 模板1：企业数据驾驶舱（通用型）
  {
    id: "general-data-cockpit",
    name: "企业数据驾驶舱（通用型）",
    category: "data-cockpit",
    tags: ["通用型", "KPI", "多模块联动", "钻取分析"],
    cover: "/images/cases/general-data-cockpit.jpg",
    component: "GeneralDataCockpit",
    desc: "企业全局数据汇总驾驶舱，包含销售分析、运营数据、用户增长、区域分布等核心模块，支持多维度钻取",
    basicInfo: {
      scenario: "企业高管决策、部门数据汇总（销售/运营/财务）",
      techStack: "Vue3 + TypeScript + ECharts5 + Pinia + Grid布局",
      adaptTerminal: "16:9大屏/PC端（推荐分辨率1920*1080）",
      dataAccess: "REST API + 静态数据 + 筛选条件联动",
    },
  },
  // 模板2：GIS地理信息大屏（区域数据监控）
  {
    id: "gis-region-monitor",
    name: "GIS地理信息大屏（区域数据）",
    category: "gis-map",
    tags: ["3D地图", "热力图", "飞线", "下钻功能"],
    cover: "/images/cases/gis-region-monitor.jpg",
    component: "GISRegionMonitor",
    desc: "3D地图可视化大屏，支持省份/市/区下钻、热力图密度展示、飞线流向分析、区域排名统计",
    basicInfo: {
      scenario: "物流追踪、门店分布、区域销售、疫情防控",
      techStack: "Vue3 + TypeScript + ECharts-GL + GeoJSON",
      adaptTerminal: "16:9大屏/PC端（推荐分辨率2560*1440）",
      dataAccess: "GeoJSON地图数据 + 区域业务数据API",
    },
  },
  // 模板3：实时监控大屏（运维/业务）
  {
    id: "real-time-monitor-dashboard",
    name: "实时监控大屏（运维/业务）",
    category: "business-monitor",
    tags: ["实时刷新", "WebSocket", "异常告警", "大数字滚动"],
    cover: "/images/cases/real-time-monitor.jpg",
    component: "RealTimeMonitorDashboard",
    desc: "服务器/接口/订单实时监控大屏，包含核心指标大数字、接口趋势、错误率统计、异常日志列表，支持WebSocket实时推送",
    basicInfo: {
      scenario: "服务器监控、接口调用监控、订单实时统计、设备状态监控",
      techStack: "Vue3 + TypeScript + ECharts5 + WebSocket + vue-count-to",
      adaptTerminal: "16:9大屏/PC端（推荐分辨率1920*1080）",
      dataAccess: "WebSocket实时推送 + 异常日志API",
    },
  },
  // 模板4：电商销售分析大屏（行业专题）
  {
    id: "ecommerce-sales-analysis",
    name: "电商销售分析大屏（行业专题）",
    category: "industry-special",
    tags: ["电商", "销售分析", "用户画像", "导出功能"],
    cover: "/images/cases/ecommerce-sales.jpg",
    component: "EcommerceSalesAnalysis",
    desc: "电商平台销售数据大屏，包含销售趋势、品类分布、支付方式、区域排行、热门商品TOP10、用户画像等模块",
    basicInfo: {
      scenario: "电商平台销售数据、促销活动效果分析",
      techStack: "Vue3 + TypeScript + ECharts5 + html2canvas + xlsx",
      adaptTerminal: "16:9大屏/PC端（推荐分辨率1920*1080）",
      dataAccess: "销售数据API + 商品数据API + 用户画像API",
    },
  },
  // 模板5：数据汇报大屏（静态展示）
  {
    id: "static-report-dashboard",
    name: "数据汇报大屏（静态展示）",
    category: "data-report",
    tags: ["静态展示", "打印适配", "美观化", "数据导出"],
    cover: "/images/cases/static-report.jpg",
    component: "StaticReportDashboard",
    desc: "会议汇报专用静态大屏，包含核心结论、多维度图表、数据说明，支持打印适配和PDF/图片导出",
    basicInfo: {
      scenario: "会议汇报、成果展示、数据报告打印",
      techStack: "Vue3 + TypeScript + ECharts5 + html2canvas + print-js",
      adaptTerminal: "16:9大屏/PC端/打印（推荐分辨率1920*1080）",
      dataAccess: "静态JSON数据预加载",
    },
  },
  // 模板6：实时态势大屏（事件监控）
  {
    id: "real-time-situation-monitor",
    name: "实时态势大屏（事件监控）",
    category: "real-time-situation",
    tags: ["动态动画", "流线效果", "状态切换", "实时计数"],
    cover: "/images/cases/real-time-situation.jpg",
    component: "RealTimeSituationMonitor",
    desc: "事件进展与资源状态实时态势大屏，支持流线动画、状态切换、实时计数，适配应急指挥/资源调度场景",
    basicInfo: {
      scenario: "事件监控、资源调度、实时态势感知、应急指挥",
      techStack: "Vue3 + TypeScript + ECharts5 + Canvas + 动画帧优化",
      adaptTerminal: "16:9大屏/PC端（推荐分辨率2560*1440）",
      dataAccess: "SSE实时推送 + 状态数据API",
    },
  },
];

// ======================== 3. Pinia Store 定义 ========================
export const useCaseStore = defineStore("case", {
  state: () => ({
    // 基础数据
    categories: caseCategories, // 大屏分类列表
    caseList: mockCaseList, // 大屏模板列表
    // 筛选状态
    searchKeyword: "", // 搜索关键词
    activeCategory: "", // 当前激活分类
    activeCaseId: "", // 当前选中的案例ID
    // 大屏配置状态（适配可视化场景）
    screenConfig: {
      theme: "default", // 主题：default/blue/black/enterprise
      refreshRate: 5, // 实时大屏刷新频率（秒）
      isFullScreen: false, // 是否全屏展示
      isRealTime: true, // 是否开启实时数据
    },
  }),
  getters: {
    // 1. 筛选后的案例列表（搜索+分类）
    filteredCaseList: (state) => {
      return state.caseList.filter((caseItem) => {
        // 分类匹配
        const categoryMatch = state.activeCategory
          ? caseItem.category === state.activeCategory
          : true;
        // 搜索匹配（名称/标签/描述）
        const searchMatch = state.searchKeyword
          ? caseItem.name.toLowerCase().includes(state.searchKeyword.toLowerCase()) ||
            caseItem.tags.some((tag) => tag.toLowerCase().includes(state.searchKeyword.toLowerCase())) ||
            caseItem.desc.toLowerCase().includes(state.searchKeyword.toLowerCase())
          : true;
        return categoryMatch && searchMatch;
      });
    },
    // 2. 当前分类信息
    currentCategoryInfo: (state) => {
      if (!state.activeCategory) return null;
      return state.categories.find((cat) => cat.type === state.activeCategory);
    },
    // 3. 当前选中的案例详情
    currentCase: (state) => {
      if (!state.activeCaseId) return null;
      return state.caseList.find((item) => item.id === state.activeCaseId);
    },
    // 4. 按分类分组的案例列表（用于分类展示）
    caseListByCategory: (state) => {
      return state.categories.reduce((acc, category) => {
        acc[category.type] = state.caseList.filter(
          (item) => item.category === category.type
        );
        return acc;
      }, {} as Record<string, CaseItem[]>);
    },
  },
  actions: {
    // ========== 基础筛选操作 ==========
    /** 设置搜索关键词 */
    setSearchKeyword(keyword: string) {
      this.searchKeyword = keyword.trim();
    },
    /** 设置激活分类 */
    setActiveCategory(category: string) {
      this.activeCategory = category;
    },
    /** 重置筛选条件 */
    resetFilter() {
      this.searchKeyword = "";
      this.activeCategory = "";
    },
    // ========== 案例操作 ==========
    /** 根据ID获取案例 */
    getCaseById(id: string): CaseItem | undefined {
      return this.caseList.find((caseItem) => caseItem.id === id);
    },
    /** 设置当前选中的案例 */
    setActiveCaseId(id: string) {
      this.activeCaseId = id;
      // 选中案例时自动适配大屏主题（可选）
      if (id.includes("gis")) this.setScreenTheme("blue");
      if (id.includes("monitor")) this.setScreenTheme("black");
    },
    /** 添加自定义案例（扩展功能） */
    addCustomCase(caseItem: Omit<CaseItem, "id">) {
      const newId = `custom-${Date.now()}`;
      this.caseList.push({ ...caseItem, id: newId });
      return newId;
    },
    // ========== 大屏配置操作 ==========
    /** 设置大屏主题 */
    setScreenTheme(theme: "default" | "blue" | "black" | "enterprise") {
      this.screenConfig.theme = theme;
    },
    /** 设置实时刷新频率 */
    setRefreshRate(rate: number) {
      if (rate < 1) rate = 1; // 最小1秒
      if (rate > 60) rate = 60; // 最大60秒
      this.screenConfig.refreshRate = rate;
    },
    /** 切换全屏状态 */
    toggleFullScreen() {
      this.screenConfig.isFullScreen = !this.screenConfig.isFullScreen;
      // 实际全屏逻辑可结合screenfull库实现
      if (this.screenConfig.isFullScreen) {
        document.documentElement.requestFullscreen().catch((err) => {
          console.warn("全屏请求失败：", err);
        });
      } else {
        document.exitFullscreen().catch((err) => {
          console.warn("退出全屏失败：", err);
        });
      }
    },
    /** 切换实时数据开关 */
    toggleRealTime() {
      this.screenConfig.isRealTime = !this.screenConfig.isRealTime;
    },
  },
});
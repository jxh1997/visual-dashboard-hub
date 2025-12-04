import { defineStore } from "pinia";
import type { CaseItem, CaseCategory } from "@/types/case";

// 案例分类配置
const caseCategories: CaseCategory[] = [
  {
    type: "base-chart",
    name: "基础图表",
    icon: "el-icon-s-data",
    desc: "折线图、柱状图、饼图等基础可视化图表",
  },
  {
    type: "tree",
    name: "树图/关系图",
    icon: "el-icon-sitemap",
    desc: "树形图、力导向图、桑基图等关系可视化",
  },
  {
    type: "map",
    name: "地图可视化",
    icon: "el-icon-location",
    desc: "2D/3D 地图、热力图、迁徙图等地理可视化",
  },
  {
    type: "3d",
    name: "3D 可视化",
    icon: "el-icon-cube",
    desc: "3D 柱状图、3D 散点图、3D 地图等 3D 效果",
  },
  {
    type: "business",
    name: "业务大屏",
    icon: "el-icon-display",
    desc: "数据驾驶舱、监控大屏等业务场景可视化",
  },
];

// 模拟案例列表数据
const mockCaseList: CaseItem[] = [
  {
    id: "line-chart",
    name: "基础折线图",
    category: "base-chart",
    tags: ["ECharts", "2D", "动态数据"],
    cover: "/images/cases/line-chart.jpg",
    component: "LineChart",
    desc: "支持动态数据刷新、图例切换、tooltip 详情的基础折线图",
  },
  {
    id: "china-map-3d",
    name: "3D 中国地图",
    category: "map",
    tags: ["ECharts", "3D", "地图", "DataV"],
    cover: "/images/cases/china-map-3d.jpg",
    component: "ChinaMap3D",
    desc: "3D 可视化中国地图，支持省份数据展示、缩放旋转、热力映射",
  },
];

// 定义案例 Store
export const useCaseStore = defineStore("case", {
  state: () => ({
    categories: caseCategories, // 分类列表
    caseList: mockCaseList, // 案例列表
    searchKeyword: "", // 搜索关键词
    activeCategory: "", // 当前激活分类
  }),
  getters: {
    // 筛选后的案例列表（搜索+分类）
    filteredCaseList: (state) => {
      return state.caseList.filter((caseItem) => {
        const categoryMatch = state.activeCategory
          ? caseItem.category === state.activeCategory
          : true;
        const searchMatch = state.searchKeyword
          ? caseItem.name.includes(state.searchKeyword) ||
            caseItem.tags.some((tag) => tag.includes(state.searchKeyword)) ||
            caseItem.desc.includes(state.searchKeyword)
          : true;
        return categoryMatch && searchMatch;
      });
    },
    // 当前分类信息
    currentCategoryInfo: (state) => {
      if (!state.activeCategory) return null;
      return state.categories.find((cat) => cat.type === state.activeCategory);
    },
  },
  actions: {
    setSearchKeyword(keyword: string) {
      this.searchKeyword = keyword;
    },
    setActiveCategory(category: string) {
      this.activeCategory = category;
    },
    resetFilter() {
      this.searchKeyword = "";
      this.activeCategory = "";
    },
    getCaseById(id: string) {
      return this.caseList.find((caseItem) => caseItem.id === id);
    },
  },
});

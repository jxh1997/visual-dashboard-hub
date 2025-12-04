// 案例分类类型
export interface CaseCategory {
  type: "base-chart" | "tree" | "map" | "3d" | "business";
  name: string;
  icon: string;
  desc: string;
}

// 案例项类型
export interface CaseItem {
  id: string; // 案例唯一ID
  name: string; // 案例名称
  category: CaseCategory["type"]; // 所属分类
  tags: string[]; // 标签
  cover: string; // 封面图路径
  component: string; // 组件名称
  desc: string; // 案例描述
}

// 案例代码类型
export interface CaseCode {
  vue: string; // Vue 组件代码
  option?: string; // ECharts 配置代码（可选）
  style?: string; // 样式代码（可选）
}

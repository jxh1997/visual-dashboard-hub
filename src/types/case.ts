// src/types/case.ts
/** 大屏分类信息 */
export interface CaseCategory {
  type: string; // 分类标识
  name: string; // 分类名称
  icon: any; // 图标（Element Plus图标）
  desc: string; // 分类描述
  scene: string[]; // 适用场景
  tech: string[]; // 技术要点
}

/** 大屏基础信息（模板复用/技术实现） */
export interface CaseBasicInfo {
  scenario: string; // 适用场景
  techStack: string; // 技术栈
  adaptTerminal: string; // 适配终端/分辨率
  dataAccess: string; // 数据接入方式
}

/** 大屏案例项 */
export interface CaseItem {
  id: string; // 案例ID
  name: string; // 案例名称
  category: string; // 所属分类（关联CaseCategory.type）
  tags: string[]; // 标签
  cover: string; // 封面图
  component: string; // 对应组件名称（动态导入用）
  desc: string; // 案例描述
  basicInfo?: CaseBasicInfo; // 基础信息（可选）
}

/** 大屏配置项 */
export interface ScreenConfig {
  theme: "default" | "blue" | "black" | "enterprise"; // 主题
  refreshRate: number; // 刷新频率（秒）
  isFullScreen: boolean; // 是否全屏
  isRealTime: boolean; // 是否实时
}
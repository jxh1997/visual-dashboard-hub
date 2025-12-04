import { MockMethod } from "vite-plugin-mock";
import mapMock from "./map";

// 合并所有 Mock 配置
const mockModules: MockMethod[] = [...mapMock];

export default mockModules;

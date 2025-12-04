import { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";

// 3D 中国地图 Mock 数据
export default [
  {
    url: "/api/map/china-3d",
    method: "get",
    response: () => {
      const provinces = [
        "北京",
        "天津",
        "河北",
        "山西",
        "内蒙古",
        "辽宁",
        "吉林",
        "黑龙江",
        "上海",
        "江苏",
        "浙江",
        "安徽",
        "福建",
        "江西",
        "山东",
        "河南",
        "湖北",
        "湖南",
        "广东",
        "广西",
        "海南",
        "重庆",
        "四川",
        "贵州",
        "云南",
        "西藏",
        "陕西",
        "甘肃",
        "青海",
        "宁夏",
        "新疆",
        "台湾",
        "香港",
        "澳门",
      ];

      return {
        code: 200,
        message: "success",
        data: provinces.map((province) => ({
          name: province,
          value: Mock.mock("@integer(1000, 50000)"),
          growth: Mock.mock("@float(0.1, 10, 1, 2)"),
        })),
      };
    },
  },
] as MockMethod[];

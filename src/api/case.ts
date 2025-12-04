// 案例数据接口封装
export const getChina3DMapData = () => {
  return fetch("/api/map/china-3d").then((res) => res.json());
};

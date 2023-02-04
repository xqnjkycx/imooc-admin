/**
 * 存储数据
 * 简单封装
 */

export const setItem = (key: string, value: any) => {
  if (typeof value === "object") value = JSON.stringify(value);
  window.localStorage.setItem(key, value);
};

export const getItem = (key: string) => {
  const data = window.localStorage.getItem(key);
  try {
    return JSON.parse(data as string);
  } catch (err) {
    return data;
  }
};

export const removeItem = (key: string) => {
  window.localStorage.removeItem(key);
};

export const removeAllItem = (key: string) => {
  window.localStorage.clear();
};

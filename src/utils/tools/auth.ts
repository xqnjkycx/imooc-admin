import { TIME_STAMP, TOKEN_TIMEOUT_VALUE } from "./contrast";
import { setItem, getItem } from "./storage";

/**
 * 获取时间戳
 */
export function getTimeStamp() {
  return getItem(TIME_STAMP);
}

/**
 * 设置时间戳
 */
export function setTimeStamp() {
  return setItem(TIME_STAMP, Date.now());
}

/**
 * 是否超时
 */
export function isCheckTimeout() {
  const current_time = Date.now();
  const time_stamp = getTimeStamp();
  return current_time - time_stamp > TOKEN_TIMEOUT_VALUE;
}

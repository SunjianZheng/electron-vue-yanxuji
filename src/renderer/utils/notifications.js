import { Notification } from 'element-ui';
/**
 * 显示 element-ui 的 Notification 通知框
 * @param {String} title 标题
 * @param {String} message 通知信息
 * @param {String} type 类型 (success/warning/info/error)
 * @param {String} position 显示位置 (top-right/top-left/bottom-right/bottom-left)
 * @param {Number} duration 显示时常
 * @param {Number} offset 偏移量
 */

export default function showNotifications({
  title = '通知', message = '', type = 'success', duration = 2000, position = 'bottom-right', offset = 0,
} = {}) {
  Notification({
    title,
    message,
    type,
    offset,
    duration,
    position,
  });
}

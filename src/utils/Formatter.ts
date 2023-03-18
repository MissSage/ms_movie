import moment from 'moment'
import { padStart } from 'lodash-es'
export const DateFormtter = (date: number, placeHolder?: string) => {
  if (!date) return placeHolder || ''
  return moment(new Date(date)).format('YYYY-MM-DD HH:mm:ss')
}
/**
 * 格式化毫秒数成时分秒
 * @param duration
 * @returns
 */
export const formateDuration = (duration = 0, seperator: 'text' | 'colon' = 'colon') => {
  if (!duration) return '--'
  const secondUnit = seperator === 'colon' ? '' : '秒'
  const miniteUnit = seperator === 'colon' ? ':' : '分'
  const hourUnit = seperator === 'colon' ? ':' : '时'
  let str = ''
  const hour = Math.floor(duration / 3600)
  if (hour) {
    str += hour + hourUnit
  }
  const minite = Math.floor((duration % 3600) / 60)
  str += padStart(minite.toString(), 2, '0') + miniteUnit
  const second = Math.floor(duration % 60)
  str += padStart(second.toString(), 2, '0') + secondUnit
  return str
}

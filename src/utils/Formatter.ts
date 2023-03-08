import moment from 'moment'
export const DateFormtter = (date: number, placeHolder?: string) => {
  if (!date) return placeHolder || ''
  return moment(new Date(date)).format('YYYY-MM-DD HH:mm:ss')
}

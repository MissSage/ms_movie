import moment from 'moment'
export const DateFormtter = (date: number) => {
    console.log(date);
    return moment(new Date(date)).format('YYYY-MM-DD HH:mm:ss')
}
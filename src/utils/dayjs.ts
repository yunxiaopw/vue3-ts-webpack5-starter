import dayjs from 'dayjs'
import 'dayjs/locale/zh-tw'
import relativeTime from 'dayjs/plugin/relativeTime'
import toObject from 'dayjs/plugin/toObject'
import isBetween from 'dayjs/plugin/isBetween'
import duration from 'dayjs/plugin/duration'

dayjs.locale('zh-tw')
dayjs.extend(relativeTime)
dayjs.extend(toObject)
dayjs.extend(isBetween)
dayjs.extend(duration)

/**
 * 日期格式化
 * @param timeStamp 十位时间戳
 * @param type  格式化类型  ，默认 YYYY-MM-DD
 */
export const dayjsFormat = (timeStamp: number | string, type = 'YYYY-MM-DD') => {
  if (!timeStamp) {
    return '--:--'
  }
  if (timeStamp.toString().length === 10) {
    timeStamp = Number(timeStamp) * 1000
  }
  return dayjs(timeStamp).format(type)
}

/**
 * 倒计时
 * @param time.start  开始时间 十位时间戳 非必填
 * @param time.end  结束时间 十位时间戳  必填
 * @param cb 回调格式化的值
 */

export const dayjsCountdown = (
  time: { start?: string; end: string },
  // eslint-disable-next-line no-unused-vars
  cb: (format: string) => void
) => {
  const start = dayjs(time.start).valueOf()
  const end = dayjs(time.end).valueOf()
  // 当前时间戳
  let nowTime = dayjs().valueOf()
  // 还没有开始
  if (time.start && start > nowTime) {
    cb('<span>Not started</span>')
    return
  }
  if (end === 0) return

  function getCountData() {
    nowTime = dayjs().valueOf()
    if (end < nowTime) {
      cb('<span>Have ended</span>')
      return
    }

    const diffTime = dayjs.duration(end - nowTime)
    const day = diffTime.days() // 天
    const hours = diffTime.hours() // 小时
    const minutes = diffTime.minutes() // 分钟
    const seconds = diffTime.seconds() // 秒
    let time = `${hours < 10 ? `0${hours.toString()}` : hours} : ${
      minutes < 10 ? `0${minutes.toString()}` : minutes
    } : ${seconds < 10 ? `0${seconds.toString()}` : seconds}`
    if (day > 0) {
      time = `${day} Day ${time}`
    }
    cb(time)
  }

  getCountData()
  const timer = setInterval(() => {
    getCountData()
    // 已结束
    if (end < nowTime) {
      cb('<span>Have ended</span>')
      clearInterval(timer)
    }
  }, 1000)
}

export default dayjs

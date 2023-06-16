import { HourMinuteSecond, SlowHourMinuteSecond } from '@typinghare/hour-minute-second'

export const convertDateToTime = function(date ?: Date): HourMinuteSecond | undefined {
    if (date === undefined) return undefined

    const time: HourMinuteSecond = new SlowHourMinuteSecond(0)
    time.extendHour(date.getHours())
    time.extendMinute(date.getMinutes())

    return time
}
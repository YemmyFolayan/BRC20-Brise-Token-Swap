import React, { useEffect, useState } from 'react'
import moment from 'moment'

interface FormComponentProps {
  endtime: any
  currTime: any
}

const CountDownTimer = ({ endtime, currTime }: FormComponentProps) => {
  const calculateTimeLeft = (_endtime, _currTime) => {
    const leftTime = parseInt(_endtime) - parseInt(_currTime)
    let duration = moment.duration(leftTime * 1000, 'milliseconds')
    if (duration.asMilliseconds() <= 0) {
      return '00 Days 00 Hours 00 Minutes 00 Seconds'
    }
    duration = moment.duration(duration.asMilliseconds() - 1000, 'milliseconds')
    return `${duration.days()} Days ${duration.hours()} Hours ${duration.minutes()} Minutes ${duration.seconds()} Seconds`
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(endtime, currTime))

  useEffect(() => {
    setInterval(async () => {
      const currTime1 = moment().format('X')
      setTimeLeft(calculateTimeLeft(endtime, currTime1))
    }, 1000)
  }, [endtime])

  return <span>{timeLeft}</span>
}
export default CountDownTimer

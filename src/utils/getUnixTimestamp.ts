/* eslint-disable */

import { Contract } from 'ethers'
import moment from 'moment'

export default async function getUnixTimestamp(contract: Contract | null, datetime) {
  const year = moment(datetime).utc().format('YYYY')
  const month = moment(datetime).utc().format('M')
  const day = moment(datetime).utc().format('D')
  const hour = moment(datetime).utc().format('H')
  const minute = moment(datetime).utc().format('M')
  const second = moment(datetime).utc().format('S')

  if (contract) {
    const timestamp = await contract?.callStatic['toTimestamp(uint16,uint8,uint8,uint8,uint8,uint8)'](
      year,
      month,
      day,
      hour,
      minute,
      second
    )
    return timestamp.toNumber()
  }

  return ''
}

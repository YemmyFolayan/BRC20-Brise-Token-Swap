/* eslint-disable */

import { Contract } from 'ethers'
import moment from 'moment'

export default async function getUnixTimestamp(contract: Contract | null, datetime) {
  const year = moment(datetime).format('YYYY')
  const month = moment(datetime).format('M')
  const day = moment(datetime).format('D')
  const hour = moment(datetime).format('H')
  const minute = moment(datetime).format('M')
  const second = moment(datetime).format('S')

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

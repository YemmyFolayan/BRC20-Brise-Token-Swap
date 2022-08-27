/* eslint-disable */
import React, { useState, useEffect } from 'react'
import swal from 'sweetalert'

import Container from 'components/Container'

import './style.css'
import AirdropCard from './AirdropCard'
import getAllAirdrop from './apicalls'

export default function AirdropDirectory() {
  const [airdrops, setAirdrops] = useState<any[]>([])

  useEffect(() => {
    const fetchAirdropList = () => {
      getAllAirdrop()
        .then((response) => {
          setAirdrops(response)
        })
        .catch((err) => {
          console.log(err)
          swal('Oops', 'Something went wrong!', 'error')
        })
    }

    fetchAirdropList()
  }, [])

  return (
    <>
      <Container>
        <div className="row  w-100 h-100">
          {airdrops.map((airdrop) => (
            <AirdropCard data={airdrop} key={airdrop._id} />
          ))}
        </div>
      </Container>
      <div className="mt-5"> </div>
    </>
  )
}

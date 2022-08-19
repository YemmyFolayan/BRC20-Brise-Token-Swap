/* eslint-disable */
import React, { useState, useEffect } from 'react'
import swal from 'sweetalert'

import Container from 'components/Container'

import './style.css'
import PresaleCard from './PresaleCard'
import getAllPresale from './apicalls'

export default function PresaleDirectory() {
  const [presales, setPresales] = useState<any[]>([])

  useEffect(() => {
    const fetchPresaleList = () => {
      getAllPresale()
        .then((response) => {
          setPresales(response)
        })
        .catch((err) => {
          console.log(err)
          swal('Oops', 'Something went wrong!', 'error')
        })
    }

    fetchPresaleList()
  }, [])

  return (
    <>
      <Container>
        <div className="row  w-100 h-100">
          {presales.map((presale) => (
            <PresaleCard data={presale} key={presale._id} />
          ))}
        </div>
      </Container>
      <div className="mt-5"> </div>
    </>
  )
}

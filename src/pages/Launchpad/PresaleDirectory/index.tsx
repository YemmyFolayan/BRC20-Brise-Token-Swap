/* eslint-disable */
import React, { useState, useEffect } from 'react'
import swal from 'sweetalert'
import { Oval } from 'react-loader-spinner'

import Container from 'components/Container'
import Loader from 'components/Loader'

import './style.css'
import PresaleCard from './PresaleCard'
import getAllPresale from './apicalls'

import { StyledCardContainer, LoaderWrapper } from './styleds'

export default function PresaleDirectory() {
  const [presales, setPresales] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchPresaleList = () => {
      setLoading(true)
      getAllPresale()
        .then((response) => {
          setLoading(false)
          setPresales(response)
        })
        .catch((err) => {
          setLoading(false)

          console.log(err)
          swal('Oops', 'Something went wrong!', 'error')
        })
    }

    fetchPresaleList()
  }, [])

  return (
    <>
      <Container>
        {loading && (
          <LoaderWrapper>
            <Oval
              height={80}
              width={80}
              color="#000FFF"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#f4d85b"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          </LoaderWrapper>
        )}
        <StyledCardContainer>
          {presales.map((presale) => (
            <PresaleCard data={presale} key={presale._id} />
          ))}
        </StyledCardContainer>
      </Container>
      <div className="mt-5" />
    </>
  )
}

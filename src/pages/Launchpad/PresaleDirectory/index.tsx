/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { Button, CardBody, Grid } from '@evofinance9/uikit'
import swal from 'sweetalert'

import Container from 'components/Container'

import { AppBodyExtended } from 'pages/AppBody'

import './style.css'
import PresaleCard from './PresaleCard'

export default function PresaleDirectory() {
  return (
    <>
      <Container>
        <div className="row  w-100 h-100">
          <PresaleCard />
          <PresaleCard />
          <PresaleCard />
          <PresaleCard />
          <PresaleCard />
          <PresaleCard />
        </div>
      </Container>
      <div className="mt-5"> </div>
    </>
  )
}

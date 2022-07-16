/* eslint-disable */
import React from 'react'

import Header from 'pages/Home/Header'
import Footer from '../../components/Footer'
import CreateLaunchpad from './CreateLaunchpad'

import './style.css'

export default function Launchpad() {
  return (
    <>
      <Header />

      <CreateLaunchpad />

      <Footer />
    </>
  )
}

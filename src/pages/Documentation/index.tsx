/* eslint-disable */
import React from 'react'

import Header from 'pages/Home/Header'
import Footer from '../../components/Footer'

import './style.css'

export default function Documentation() {
  return (
    <>
      <Header />
      <div className="container text-white mb-5">
        <div className="form__container p-5">
          <h4 className="text-center">
            <i className="fas fa-file-pdf pdf__icon" /> <br />
            <a href="https://evo-server.in/whitepaper.pdf">
              <button type="button" className="btn btn-outline-warning mt-3">
                <i className="fas fa-download mx-2" />
                <span>Download</span>
              </button>
            </a>
          </h4>
        </div>
      </div>
      <div className="mt-5"> </div>
      <Footer />
    </>
  )
}

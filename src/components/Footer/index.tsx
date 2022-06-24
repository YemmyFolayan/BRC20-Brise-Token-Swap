import React from 'react'
import { Link } from 'react-router-dom'

import './style.css'

import EVO_LOGO from '../../assets/images/evo-blue.jpeg'
import CENTEX_LOGO from '../../assets/images/centex-logo.png'

export default function Footer() {
  return (
    <div className="">
      <footer className="text-center text-white" style={{ backgroundColor: '#000' }}>
        <div className="container">
          <section className="mt-5">
            <div className="row text-center d-flex justify-content-center pt-5">
              <div className="col-md-2">
                <h6 className="text-uppercase font-weight-bold">
                  <a href="#!" className="text-white">
                    Documentation
                  </a>
                </h6>
              </div>

              <div className="col-md-2">
                <h6 className="text-uppercase font-weight-bold">
                  <a href="#!" className="text-white">
                    Advertise
                  </a>
                </h6>
              </div>

              <div className="col-md-2">
                <h6 className="text-uppercase font-weight-bold">
                  <a href="https://tttttt.me/evofinances" className="text-white">
                    Support
                  </a>
                </h6>
              </div>

              <div className="col-md-2">
                <h6 className="text-uppercase font-weight-bold">
                  <a href="mailto:contact@evofinance.in" className="text-white">
                    Contact
                  </a>
                </h6>
              </div>
            </div>
          </section>

          <div className='custom__border w-100 my-5' />

          <section className="mb-5">
            <div className="row d-flex justify-content-center">
              <div className="col-lg-8">
                <h6 className=" font-weight-bold">Developed by</h6>

                <div className='p-3'>
                  <img src={EVO_LOGO} alt="" className='brand__logo' />
                  <img src={CENTEX_LOGO} alt="" className='brand__logo' />
                </div>
              </div>
            </div>
          </section>

          <section className="text-center mb-5">
          <a href="https://tttttt.me/evofinances" className="text-white mx-3">
              <i className="fab fa-telegram" />
            </a>
            <a href="https://twitter.com/Evo_finances" className="text-white mx-3">
              <i className="fab fa-twitter" />
            </a>
          </section>
        </div>

        <div className="text-center p-3" style={{ backgroundColor: ' rgba(0, 0, 0, 0.2)' }}>
          © {new Date().getFullYear()} Copyright:
          <a className="text-white mx-1" href="https://mdbootstrap.com/">
            Bitgert
          </a>
        </div>
      </footer>
    </div>
  )
}

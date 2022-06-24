/* eslint-disable */
import React from 'react'

import Header from 'pages/Home/Header'

import "./style.css"


export default function Advertise() {
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <Header />

      <div className="container text-white">
        <div className='form__container'>
        <h4 className='text-center'>Advertise</h4>
        <form onSubmit={handleSubmit}>
          
          <div className="mb-3">
            <label htmlFor="nameInput" className="form-label">
              Name
            </label>
            <input type="text" className="form-control" id="nameInput" placeholder="John" />
          </div>
          <div className="mb-3">
            <label htmlFor="emailInput" className="form-label">
              Email
            </label>
            <input type="email" className="form-control" id="emailInput" placeholder="name@example.com" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Message
            </label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows={3} placeholder="" />
          </div>

          <button type='submit' className='btn btn-outline-warning'>Send Message</button>
        </form>
        </div>
      </div>
    </>
  )
}

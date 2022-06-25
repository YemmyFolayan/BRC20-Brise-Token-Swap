/* eslint-disable */
import React, { useState } from 'react'
import swal from 'sweetalert'

import Header from 'pages/Home/Header'
import Footer from "../../components/Footer"

import sendMessage from './apicalls'

import './style.css'

export default function Advertise() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    username: '',
    message: '',
    loading: false,
    error: '',
  })

  const { name, email, username, message, loading, error } = values

  const handleChange = (name) => (event) => {
    const value = event.target.value
    setValues({ ...values, [name]: value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setValues({ ...values, error: '', loading: true })

    if (!name || !email || !username || !message) {
      swal('Oops', 'Provide all the fields', 'error')
      return
    }

    sendMessage(values).then((data) => {
      setValues({ ...values, error: '', loading: false })
      console.log(data)
      if (data.error) {
        swal('Oops', data.error, 'error')
      } else {
        swal('Congratulations!', 'Message sent!', 'success')
      }
    })
  }

  return (
    <>
      <Header />

      <div className="container text-white">
        <div className="form__container">
          <h4 className="text-center">Advertise</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="nameInput" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="nameInput"
                placeholder="John"
                value={name}
                onChange={handleChange('name')}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="emailInput" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="emailInput"
                placeholder="name@example.com"
                value={email}
                onChange={handleChange('email')}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="nameInput" className="form-label">
                Telegram username
              </label>
              <input
                type="text"
                className="form-control"
                id="nameInput"
                placeholder="John"
                value={username}
                onChange={handleChange('username')}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlTextarea1" className="form-label">
                Message
              </label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows={3}
                placeholder=""
                value={message}
                onChange={handleChange('message')}
              />
            </div>

            <button type="submit" className="btn btn-outline-warning">
              Send Message
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  )
}

import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function ResetPassword() {
  const myNav = useNavigate();
  let userData = {
    email: "",
    newPassword: "",
  }

  const [ResetSuccess, setResetSuccess] = useState(false)
  const [ResetError, setResetError] = useState(false)
  const [loading, setLoading] = useState(false)

  function sendUserData(userData) {
    setLoading(true)
    axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', userData)
      .then((res) => {
        if (res.data.token) {
          setResetSuccess("Welcome back! Your password has been changed.");
          setTimeout(() => {
            myNav('/SignIn');
          }, 1500);
        }
        setLoading(false)
        setResetError(false)
      })
      .catch((err) => {
        setResetSuccess(false)
        setLoading(false)
        setResetError(err.response.data.message)
        console.log("error", err);
      })
  }

  function formSubmit(values) {
    sendUserData(values)
  }

  let myFormik = useFormik({
    initialValues: userData,
    onSubmit: formSubmit,
    validate: function (values) {
      let errors = {}
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

      if (!passwordRegex.test(values.newPassword)) {
        errors.newPassword = "Password must be minimum eight characters, at least one letter, one number, and one special character."
      }
      return errors
    }
  })

  return (
    <>
      <Helmet>
        <title>Reset Password</title>
      </Helmet>
      <div className='w-75 m-auto py-5'>
        <h2 className='mb-4'>Reset Password</h2>

        {ResetSuccess ? <div className="alert alert-success text-center" role="alert">{ResetSuccess}</div> : ""}
        {ResetError ? <div className="alert alert-danger text-center" role="alert">{ResetError}</div> : ""}

        <form className='' onSubmit={myFormik.handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.email} type="text" placeholder='Your Email' className='mb-3 inp form-control' id='email' />
          {myFormik.errors.email && myFormik.touched.email ? <div className="alert alert-danger" role="alert">{myFormik.errors.email}</div> : ""}

          <label htmlFor="newPassword">New Password:</label>
          <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.newPassword} type="password" placeholder='Your New Password' className='mb-3 inp form-control' id='newPassword' />
          {myFormik.errors.newPassword && myFormik.touched.newPassword ? <div className="alert alert-danger" role="alert">{myFormik.errors.newPassword}</div> : ""}

          <button type='submit' className='btn bg-main text-white ms-auto d-block'>{loading ? <i className="fa-solid fs-3 fa-spinner fa-spin fa-flip-vertical"></i> : "Submit"}</button>
        </form>
      </div>
    </>
  );
}

import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function VerifyCode() {
  const myNav = useNavigate(); // Initialize the useNavigate hook
  let userData = {
    resetCode: "" , 
  }

  const [logError, setLogError] = useState(false)
  const [loading, setLoading] = useState(false)

  function verifyResetCode(userData) {
    setLoading(true)
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode' , userData)
    .then( (res) => {
      if(res.data.status === "Success") {
        myNav('/resetpassword'); // Navigate to ResetPassword page upon successful verification
      }
      setLoading(false) 
      setLogError(false)
    })
    .catch( (err) => {
      setLoading(false)
      setLogError(err.response.data.message)
      console.log("error", err);
    })
  }

  function formSubmit(values) {
    verifyResetCode(values)
  }

  let myFormik = useFormik({
    initialValues: userData ,
    onSubmit: formSubmit,
  })

  return (
    <>
      <Helmet>
        <title>Verify Code</title>
      </Helmet>
      <div className='w-75 m-auto py-5'>
        <h2 className='mb-4'>Verify Code</h2>

        {logError ?  <div className="alert alert-danger text-center" role="alert">{logError}</div> : ""}

        <form className='' onSubmit={myFormik.handleSubmit}>
          <label htmlFor="resetCode">Code:</label>
          <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.resetCode} type="text" placeholder='Your Code' className='mb-3 inp form-control' id='resetCode'/>
          <button type='submit' className='btn bg-main text-white ms-auto d-block'>{loading ? <i className="fa-solid fs-3 fa-spinner fa-spin fa-flip-vertical"></i> : "Submit"}</button>
        </form>
      </div>
    </>
  );
}

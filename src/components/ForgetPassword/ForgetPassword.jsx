import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function ForgetPassword() {
  const navigate = useNavigate();
  let userData = {
    email: "",
  };

  const [logError, setLogError] = useState(false);
  const [loading, setLoading] = useState(false);

  function sendCode(values) {
    setLoading(true);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", values)
      .then((res) => {
        if (res.data.statusMsg === "success") {
          navigate("/verifycode", { state: { email: values.email } });
        }
        setLoading(false);
        setLogError(false);
      })
      .catch((err) => {
        setLoading(false);
        setLogError(err.response.data.message);
        console.log("error", err);
      });
  }

  function formSubmit(values) {
    sendCode(values);
  }

  let myFormik = useFormik({
    initialValues: userData,
    onSubmit: formSubmit,
  });

  return (
    <>
      <Helmet>
        <title>Forget Password</title>
      </Helmet>
      <div className="w-75 m-auto py-5">
        <h2 className="mb-4">Forget Password</h2>
        {logError ? (
          <div className="alert alert-danger text-center" role="alert">
            {logError}
          </div>
        ) : (
          ""
        )}
        <form className="" onSubmit={myFormik.handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            onBlur={myFormik.handleBlur}
            onChange={myFormik.handleChange}
            value={myFormik.values.email}
            type="text"
            placeholder="Your Email"
            className="mb-3 inp form-control"
            id="email"
          />
          <button type="submit" className="btn bg-main text-white ms-auto d-block">
            {loading ? <i className="fa-solid fs-3 fa-spinner fa-spin fa-flip-vertical"></i> : "Send Code"}
          </button>
        </form>
      </div>
    </>
  );
}

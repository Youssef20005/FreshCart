import axios from "axios";
import { ErrorMessage, useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
export default function SignUp() {
  let [error,setErrors]=useState("")
  let [successMessage, setSuccessMessage] = useState("");
  let [loading,setLoading]=useState(true)
  let navigate=useNavigate()
  
  function sendData(values){
    setLoading(false)
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values).then(({data})=>{
      console.log(data);
      setSuccessMessage("Data stored successfully!");
      if(data.message==="success"){
        navigate("/signin")
      }
    }).catch((err)=>{
      console.log(err.response.data.message);
      setErrors(err.response.data.message)
      setLoading(true)
    })
  }
  function validationSchema() {
    let errors = Yup.object({
      name: Yup.string()
        .min(2, "Too Short!")
        .max(50, "Too Long!")
        .required("Required"),

      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string()
        .matches(
          /^(?=.*[A-Z])[a-zA-Z0-9@]{6,}$/,
          "Password must contain at least one uppercase letter"
        )
        .required("Required"),

      rePassword: Yup.string()
        .oneOf([Yup.ref("password")])
        .required("Required"),
      phone: Yup.string()
        .matches(/^[0-9]{11}$/)
        .required("Required"),
    });
    return errors;
  }

  let register = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: (values) => {
      sendData(values);
    
    },
  });
  
  return (
    <div>
      <div className="w-75 m-auto my-4">
        <h2>Register Now :</h2>
        <form onSubmit={register.handleSubmit}>
          <label htmlFor="name">Name :</label>
          <input
            value={register.values.name}
            onBlur={register.handleBlur}
            type="text"
            onChange={register.handleChange}
            name="name"
            id="name"
            className={`mb-3 form-control ${
              register.errors.name ? "is-invalid" : ""
            }`}
          />

          {register.errors.name && register.touched.name ? (
            <div className="alert alert-danger">{register.errors.name}</div>
          ) : (
            ""
          )}

          <label htmlFor="email">Email :</label>
          <input
            value={register.values.email}
            onBlur={register.handleBlur}
            type="email"
            onChange={register.handleChange}
            name="email"
            id="email"
            className={`mb-3 form-control ${
              register.errors.email ? "is-invalid" : ""
            }`}
          />

          {register.errors.email && register.touched.email ? (
            <div className="alert alert-danger">{register.errors.email}</div>
          ) : (
            ""
          )}

          <label htmlFor="password">Password :</label>
          <input
            value={register.values.password}
            onBlur={register.handleBlur}
            type="password"
            onChange={register.handleChange}
            name="password"
            id="password"
            className={`mb-3 form-control ${
              register.errors.password ? "is-invalid" : ""
            }`}
          />

          {register.errors.password && register.touched.password ? (
            <div className="alert alert-danger">{register.errors.password}</div>
          ) : (
            ""
          )}

          <label htmlFor="rePassword">rePassword :</label>
          <input
            value={register.values.rePassword}
            type="password"
            onBlur={register.handleBlur}
            onChange={register.handleChange}
            name="rePassword"
            id="rePassword"
            className={`mb-3 form-control ${
              register.errors.rePassword ? "is-invalid" : ""
            }`}
          />

          {register.errors.rePassword && register.touched.rePassword ? (
            <div className="alert alert-danger">
              {register.errors.rePassword}
            </div>
          ) : (
            ""
          )}

          <label htmlFor="phone">phone :</label>
          <input
            value={register.values.phone}
            type="text"
            onBlur={register.handleBlur}
            onChange={register.handleChange}
            name="phone"
            id="phone"
            className={`mb-3 form-control ${
              register.errors.phone ? "is-invalid" : ""
            }`}
          />

          {register.errors.phone && register.touched.phone ? (
            <div className="alert alert-danger">{register.errors.phone}</div>
          ) : (
            ""
          )}
{/* {error ? (
  <div className="alert alert-danger">{error}</div>
) : (
  !error? (
    <div className="alert alert-success">Done</div>
  ) : null
)} */}
{/* Conditional rendering for error message */}
{error && <div className="alert alert-danger">{error}</div>}
      {/* Conditional rendering for success message */}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

          <button
            disabled={!(register.isValid && register.dirty)}
            type="submit"
            className="btn bg-main text-white"
          >
          {loading?"register":<i className="fa fa-spinner fa-spin"></i>}
          </button>
          <button className="btn bg-main text-white mx-3" onClick={register.handleReset}>Clear Form</button>
        </form>
      </div>
    </div>
  );
}

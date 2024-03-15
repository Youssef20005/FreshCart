import axios from "axios";
import { ErrorMessage, useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
export default function SignIp() {
  let [error,setErrors]=useState("")
  let [successMessage, setSuccessMessage] = useState("");
  let [loading,setLoading]=useState(true)
  let navigate=useNavigate()
  
  function sendData(values){
    setLoading(false)
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',values).then(({data})=>{
      console.log(data);
      setSuccessMessage("Data stored successfully!"); 
      if(data.message==="success"){
        localStorage.setItem("token",data.token)
        navigate("/home")
      }
    }).catch((err)=>{
      console.log(err.response.data.message);
      setErrors(err.response.data.message)
      setLoading(true)
    })
  }
  function validationSchema() {
    let errors = Yup.object({
    

      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string()
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          "Password must contain at least one uppercase letter"
        )
        .required("Required"),

    
    });
    return errors;
  }

  let login = useFormik({
    initialValues: {
     
      email: "",
      password: "",
     
    },
    validationSchema,
    onSubmit: (values) => {
      sendData(values);
    
    },
  });
  
  return (
    <div>
      <div className="w-75 m-auto my-4">
        <h2>login Now :</h2>
        <form onSubmit={login.handleSubmit}>
         

          <label htmlFor="email">Email :</label>
          <input
            value={login.values.email}
            onBlur={login.handleBlur}
            type="email"
            onChange={login.handleChange}
            name="email"
            id="email"
            className={`mb-3 form-control ${
              login.errors.email ? "is-invalid" : ""
            }`}
          />

          {login.errors.email && login.touched.email ? (
            <div className="alert alert-danger">{login.errors.email}</div>
          ) : (
            ""
          )}

          <label htmlFor="password">Password :</label>
          <input
            value={login.values.password}
            onBlur={login.handleBlur}
            type="password"
            onChange={login.handleChange}
            name="password"
            id="password"
            className={`mb-3 form-control ${
              login.errors.password ? "is-invalid" : ""
            }`}
          />

          {login.errors.password && login.touched.password ? (
            <div className="alert alert-danger">{login.errors.password}</div>
          ) : (
            ""
          )}
          
   

{/* Conditional rendering for error message */}
{error && <div className="alert alert-danger">{error}</div>}
      {/* Conditional rendering for success message */}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

  <div className="d-flex justify-content-between">
  <Link to={'/ForgetPassword'} className='fw-bold text-main'>
  Forget Password ?
  </Link>
          <button
            disabled={!(login.isValid && login.dirty)}
            type="submit"
            className="btn bg-main text-white "
          >
          {loading?"login":<i className="fa fa-spinner fa-spin"></i>}
          </button>
  </div>
        </form>
      </div>
    </div>
  );
}


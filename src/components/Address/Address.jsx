import { ErrorMessage, useFormik } from "formik";
import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { StoreContext } from "../../context/storeContext";
export default function Address() {
  let [error,setErrors]=useState("")
  let [successMessage, setSuccessMessage] = useState("");
  let [loading,setLoading]=useState(true)
  let navigate=useNavigate()
  let {pay}=useContext(StoreContext)
  let {id}=useParams()
  
  async function sendData(values){
    setLoading(false)
  let data=await pay(id,values)
  console.log(data);
  if(data.status==="success")
  {
    window.location.href=data.session.url
  }
  }
 

  let address = useFormik ({
    initialValues: {
        details: "",
        phone: "",
        city:"",
     
    
     
    },
  
   
    onSubmit: (values) => {
      sendData(values);
    
    },
  });
  
  return (
    <div>
      <div className="w-75 m-auto my-4">
        <h2>address Now :</h2>
        <form onSubmit={address.handleSubmit}>
         

          <label htmlFor="details">Details :</label>
          <textarea
            value={address.values.details}
            onBlur={address.handleBlur}
            type="text"
            onChange={address.handleChange}
            name="details"
            id="details"
            className={'mb-3 form-control' }
          ></textarea>


          <label htmlFor="phone">phone :</label>
          <input
            value={address.values.phone}
            onBlur={address.handleBlur}
            type="phone"
            onChange={address.handleChange}
            name="phone"
            id="phone"
            className={'mb-3 form-control'}
          />
             <label htmlFor="city">City :</label>
          <input
            value={address.values.city}
            onBlur={address.handleBlur}
            type="text"
            onChange={address.handleChange}
            name="city"
            id="city"
            className={'mb-3 form-control' }
          />



          <button
            disabled={!(address.isValid && address.dirty)}
            type="submit"
            className="btn bg-main text-white"
          >
          {loading?"pay":<i className="fa fa-spinner fa-spin"></i>}
          </button>
        </form>
      </div>
    </div>
  );
}



import React from 'react'
import { useFormik } from 'formik'
import * as Yup from "yup"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Author_URL } from '../App'
import { toast } from 'react-toastify'
export const AddAuthor = () => {
let formik = useFormik({
    initialValues:{
        name:"",
        birth_date:"",
        biography:""
    },
    validationSchema: Yup.object({
        name:Yup.string().required('Name is required').max(20,'Name can not exceed 20 characters').min(3,'Name can not be shorter than 3 leters'),
        birth_date:Yup.date().required("Date of birth is required").max(new Date() , "Cannot be a future date"),
        biography:Yup.string().required("Biography is required").min(10,"Minimun 10 letters").max(200,"maximun 200 letters")
}),
     
    onSubmit: async (values) =>{
        try {
            let res = await axios.post(Author_URL,values)
            if(res.status===201){
                toast.success("Author details posted successfully")
                naviagte("/Dashboard")
            }
        } catch (error) {
           toast.error("Internal-server-error") 
        }
    }
})
let naviagte = useNavigate()
  return <div className='container col-6 mt-3'>
  <h5 className='h5 text-center'>Kndly Fill in the Author Details</h5>
  <form onSubmit={formik.handleSubmit} >
        <div className="mb-3">
          <label htmlFor='name' className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />  
         {formik.touched.name && formik.errors.name ? (<div style={{color:"red"}}>{formik.errors.name}</div>) : null}
        </div>
        <div className="mb-3">
        <label htmlFor='birth_date' className="form-label">
            D.O.B
          </label>
          <input
            type="date"
            className="form-control"
            id="birth_date"
            name="birth_date"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.birth_date}
             /> 
             {formik.touched.birth_date && formik.errors.birth_date ? (<div style={{color:"red"}}>{formik.errors.birth_date}</div>):null}
        </div>
        <div className="mb-3">
        <label htmlFor='biography' className="form-label">
            Short-Bio
          </label>
          <textarea
            type="text"
            className="form-control"
            id="biography"
            name="biography"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.biography}
             /> 
             {formik.touched.biography && formik.errors.biography ? (<div style={{color:"red"}}>{formik.errors.biography}</div>):null}
        </div>
    
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

</div>
}

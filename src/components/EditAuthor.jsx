import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as Yup from 'yup'
import axios from 'axios'
import { Author_URL } from '../App'
import { toast } from 'react-toastify'
export const EditAuthor = () => {
    let {id} = useParams()
    let navigate = useNavigate()
    let [initialValues,setInitialValues] = useState({
        author:"",
        birth_date:"",
        biography:""
    })
    let formik = useFormik({
        initialValues:initialValues,
        validationSchema:Yup.object({
            name:Yup.string().required('Name is required').max(20,'Author Name can not exceed 20 characters').min(3,'Author Name can not be shorter than 3 leters'),
            birth_date:Yup.date().required("Date of birth is required").max(new Date() , "Cannot be a future date"),
            biography:Yup.string().required("Biography is required").min(10,"Minimun 10 letters").max(200,"maximun 200 letters")
        }),
        enableReinitialize:true,
        onSubmit:async (values) =>{
            try {
                values.id = id
                let res = await axios.put(`${Author_URL}/${id}`,values)
                if(res.status===200){
                    toast.success("author details edited successfully")
                    navigate("/Dashboard")
                }
            } catch (error) {
            toast.error("internal server error")
            }
        }
    })
    let getData =async () =>{
        try {
            let res = await axios.get(`${Author_URL}/${id}`)
            setInitialValues({
                name:res.data.name,
                birth_date:res.data.birth_date,
                biography:res.data.biography
            })
        } catch (error) {
            toast.error("interval server error")
        }
    }
    useEffect(()=>{
        getData()
    },[])
  return <div className='container col-6 mt-3'>
  <h5 className='h5 text-center'>update the Author Details</h5>
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
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.name}
          />  
          {formik.touched.name && formik.errors.name ? (<div style={{color:"red"}}>{formik.errors.name}</div>):(null)}
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
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.birth_date}
             /> 
             {formik.touched.birth_date && formik.errors.birth_date ? (<div style={{color:"red"}}>{formik.errors.birth_date}</div>):(null)}
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
             {formik.touched.biography && formik.errors.biography ? (<div style={{color:"red"}}>{formik.errors.biography}</div>):(null)}
        </div>
    
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

</div>
}

import axios from 'axios'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from "yup"
import { Book_URL } from '../App'
export const EditBook = () => {
    let {id} = useParams()
    let [initialValues,setInitialValues] = useState({
        title:"",
        author:"",
        ISBN_number:"",
        Publication_date:""
    })
    let formik = useFormik({
        initialValues:initialValues,
        validationSchema:Yup.object({
          title:Yup.string().required("Title is required"),
          author:Yup.string().required("Author is required").max(20,'Author Name can not exceed 20 characters').min(3,'Author Name can not be shorter than 3 leters'),
          ISBN_number:Yup.string().required("ISBN is required"),
          Publication_date:Yup.date().required("publication date is required").max(new Date() , "Cannot be a future date")
        }),
        enableReinitialize:true,
        onSubmit : async (values) =>{
            try {
                values.id = id
                let res = await axios.put(`${Book_URL}/${id}`,values)
                if(res.status===200){
                    toast.success(" Book Details edited successfully")
                     navigate("/Dashboard")
                }
            } catch (error) {
                toast.error("internal server error")
            }
        }
    })
    let navigate = useNavigate()
    let getData = async() =>{
        try {
             let res = await axios.get(`${Book_URL}/${id}`)
            if(res.status===200){
                setInitialValues({
                    title:res.data.title,
                    author:res.data.author,
                    ISBN_number:res.data.ISBN_number,
                    Publication_date:res.data.Publication_date
                })
            }
        } catch (error) {
            toast.error("internal server error")
        }
    }
    useEffect(()=>{
        getData()
    },[])

  return <div className="container mt-3 col-6">
  <h5 className="h5 text-center m-3">Edit the Book Details</h5>
  <form onSubmit={formik.handleSubmit} >
    <div className="mb-3">
      <label htmlFor='title' className="form-label">
        Title
      </label>
      <input
        type="text"
        className="form-control"
        id="title"
        name="title"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.title}
      /> 
      {formik.touched.title && formik.errors.title ? (<div style={{color:"red"}}>{formik.errors.title}</div>):(null)} 
    </div>
    <div className="mb-3">
    <label htmlFor='author' className="form-label">
        Author
      </label>
      <input
        type="text"
        className="form-control"
        id="author"
        name="author"
        onBlur={formik.onBlur}
        onChange={formik.handleChange}
        value={formik.values.author}
         /> 
         {formik.touched.author && formik.errors.author ? (<div style={{color:"red"}}>{formik.errors.author}</div>):(null)} 
    </div>
    <div className="mb-3">
    <label htmlFor='ISBN_number' className="form-label">
        ISBN NUMBER
      </label>
      <input
        type="text"
        className="form-control"
        id="ISBN_number"
        name="ISBN_number"
        onBlur={formik.ISBN_number}
        onChange={formik.handleChange}
        value={formik.values.ISBN_number}
         /> 
         {formik.touched.ISBN_number && formik.errors.ISBN_number ? (<div style={{color:"red"}}>{formik.errors.ISBN_number}</div>):(null)} 
    </div>
    <div className="mb-3">
    <label htmlFor='Publication_date' className="form-label">
        Publication Date
      </label>
      <input
        type="date"
        className="form-control"
        id="Publication_date"
        name="Publication_date"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.Publication_date}
         /> 
         {formik.touched.Publication_date && formik.errors.Publication_date ? (<div style={{color:"red"}}>{formik.errors.Publication_date}</div>):(null)} 
    </div>
    <button type="submit" className="btn btn-primary">
      Submit
    </button>
  </form>
</div>
}

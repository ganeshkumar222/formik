import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios  from "axios";
import { Book_URL } from "../App";
import { toast } from "react-toastify";
export const AddBook = () => {
  let formik = useFormik({
    initialValues: {
      title: "",
      author: "",
      ISBN_number: "",
      Publication_date: ""
    },
    validationSchema: Yup.object({
      title:Yup.string().required("Title is required"),
      author:Yup.string().required("Author is required").max(20,'Author Name can not exceed 20 characters').min(3,'Author Name can not be shorter than 3 leters'),
      ISBN_number:Yup.string().required("ISBN is required"),
      Publication_date:Yup.date().required("publication date is required").max(new Date() , "Cannot be a future date")
    }),
    onSubmit: async (values) => {
      try {
        let res = await axios.post(Book_URL,values);
        if(res.status===201){
            toast.success("Book details posted successfully")
            navigate("/Dashboard")
        }
      } catch (error) {
        toast.error("internal server error")
      }
    }
  });
  let navigate = useNavigate();
  return (
    <div className="container mt-3 col-6">
      <h5 className="h5 text-center m-3">Kndly Fill in the Book Details</h5>
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
            onBlur={formik.handleBlur}
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
            onBlur={formik.handleBlur}
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
  );
};

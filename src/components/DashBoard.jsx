import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Author_URL, Book_URL } from '../App'
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

export const DashBoard = () => {
  let [book,setBook] = useState([])
  let [author,setAuthor] = useState([])
  let navigate = useNavigate()
let handleDelete = async (id) => {
     try {
       let res = await axios.delete(`${Book_URL}/${id}`)
       if(res.status===200){
        toast.success("Book details deleted successfully")
        getBookData()
       }
     } catch (error) {
           toast.error("internal server error")
     }
}
let handleAuthorDelete = async (id) =>{
  try {
    let res = await axios.delete(`${Author_URL}/${id}`)
    if(res.status===200){
      toast.success("Author details deleted successfully")
      getAuthorData()
    }
  } catch (error) {
    toast.error("internal server error")
  }
}
  let getBookData = async () =>{
    try {
      let res = await axios.get(Book_URL)
      if(res.status===200){
        setBook(res.data)  
      }
    } catch (error) {
      toast.error("internal server error")
    }
  }
  let getAuthorData = async () =>{
    try {
      let res = await axios.get(Author_URL)
      if(res.status===200){
        setAuthor(res.data)
      }
    } catch (error) {
      toast.error("internal server error")
    }
  }
  useEffect(()=>{
    getBookData()
    getAuthorData()
  },[])
  return <div className='container-fluid mt-3'>
    <div className='row'>
    <div className='col'>
      <h3 className='text-center h3'>Book Details</h3>
    <table className="table table-bordered table-dark">
  <thead>
    <tr>
      <th scope="col">Title</th>
      <th scope="col">Author</th>
      <th scope="col">ISBN number</th>
      <th scope="col">Publication date</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
   {book.map((e)=>{
    return <tr key={e.id}>
      <td>{e.title}</td>
      <td>{e.author}</td>
      <td>{e.ISBN_number}</td>
      <td>{e.Publication_date}</td>
      <td>
        <button className='btn m-1 btn-primary' onClick={()=>{console.log("inside")
          navigate(`/EditBook/${e.id}`)}}>Edit</button>
        <button className='btn m-1 btn-danger' onClick={()=>{handleDelete(e.id)}}>Delete</button>
      </td>
    </tr>
   })}
    
    
  </tbody>
</table>
    </div>
    <div className='col'>
    <h3 className='text-center h3'>Author Details</h3>
    <table className="table table-bordered table-dark">
  <thead>
    <tr>
      <th scope="col">Author's Name</th>
      <th scope="col">Birth Date</th>
      <th scope="col">Biography</th>
      <th scope="col">Actions</th>  
    </tr>
  </thead>
  <tbody>
  {author.map((e)=>{
    return <tr key={e.id}>
      <td>{e.name}</td>
      <td>{e.birth_date}</td>
      <td>{e.biography}</td>
      <td>
        <button className='btn m-1 btn-primary' onClick={()=>{console.log("inside")
          navigate(`/EditAuthor/${e.id}`)}}>Edit</button>
        <button className='btn m-1 btn-danger' onClick={()=>{handleAuthorDelete(e.id)}}>Delete</button>
      </td>
    </tr>
   })}
    
    
  </tbody>
</table>
    </div>
    </div>
    
  </div>
}

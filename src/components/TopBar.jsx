import React from 'react'
import { useNavigate } from 'react-router-dom'

export const TopBar = () => {
    let navigate = useNavigate()
  return <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="#" onClick={()=>{navigate("/Dashboard")}}>Library</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#" onClick={()=>{navigate("/AddAuthor")}}>Add Author</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" href="#" onClick={()=>{navigate("/AddBook")}}>Add Book</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
    
}

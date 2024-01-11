import React from 'react'
import { BrowserRouter,Routes,Route, Navigate } from 'react-router-dom'
import { TopBar } from './components/TopBar'
import { AddAuthor } from './components/AddAuthor'
import { AddBook } from './components/AddBook'
import { DashBoard } from './components/DashBoard'
import { EditBook } from './components/EditBook'
import { EditAuthor } from './components/EditAuthor'
export const Book_URL = 'https://659e727847ae28b0bd35dbad.mockapi.io/Book_details'
export const Author_URL = 'https://659e727847ae28b0bd35dbad.mockapi.io/Author_details'
export const App = () => {
  return<>
  <BrowserRouter>
  <TopBar></TopBar>
  <Routes>
    <Route path="/Dashboard"  element={<DashBoard></DashBoard>}></Route>
    <Route path="/AddBook" element={<AddBook></AddBook>}></Route>
    <Route path="/AddAuthor" element={<AddAuthor></AddAuthor>}></Route>
    <Route path="/EditBook/:id" element={<EditBook></EditBook>}></Route>
    <Route path="/EditAuthor/:id" element={<EditAuthor></EditAuthor>}></Route>
    <Route path="*" element={<Navigate to={"/Dashboard"}></Navigate>}></Route>
    
  </Routes>
  </BrowserRouter>
  </>
}

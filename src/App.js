import React from 'react'
import Navbar from './components/Navbar'
import {  BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'

import Footer from "./components/Footer";
import FetchData from "./components/FetchData";


const App = () => {
  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
        <Route exact path="/home" element={<Home/>}/>
        <Route path="/general" element={<FetchData cat="general"/>}/>
        <Route path="/business" element={<FetchData cat="business"/>}/>
        <Route path="/entertainment" element={<FetchData cat="entertainment"/>}/>
        <Route path="/health" element={<FetchData cat="health"/>}/>
        <Route path="/science" element={<FetchData cat="science"/>}/>
        <Route path="/technology" element={<FetchData cat="technology"/>}/>
      </Routes>
      <Footer/>
    </Router>
      
    </>
  )

}

export default App;
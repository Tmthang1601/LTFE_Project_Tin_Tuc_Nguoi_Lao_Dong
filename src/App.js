import React from 'react'
import Navbar from './components/Navbar'
import {  BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Hero from "./components/Hero";
import FetchData from "./components/FetchData";
import Categories from "./Pages/Categories";


const App = () => {
  return (
    <>
    <Router>
      <Navbar/>
      <Hero/>
      <FetchData/>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/general" element={<Categories cat="general"/>}/>
        <Route path="/business" element={<Categories cat="business"/>}/>
        <Route path="/entertainment" element={<Categories cat="entertainment"/>}/>
        <Route path="/health" element={<Categories cat="health"/>}/>
        <Route path="/science" element={<Categories cat="science"/>}/>
        <Route path="/technology" element={<Categories cat="technology"/>}/>


      </Routes>
    </Router>
      
    </>
  )
}

export default App
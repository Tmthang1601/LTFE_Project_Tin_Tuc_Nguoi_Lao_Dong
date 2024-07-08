import React from 'react'
import Navbar from './components/Navbar'
import {  BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'

import Categories from "./Pages/Categories";
import Footer from "./components/Footer";


const App = () => {
  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
        <Route exact path="/home" element={<Home/>}/>
        <Route path="/general" element={<Categories cat="general"/>}/>
        <Route path="/business" element={<Categories cat="business"/>}/>
        <Route path="/entertainment" element={<Categories cat="entertainment"/>}/>
        <Route path="/healthy" element={<Categories cat="healthy"/>}/>
        <Route path="/science" element={<Categories cat="science"/>}/>
        <Route path="/techonology" element={<Categories cat="techonology"/>}/>
      </Routes>
      <Footer/>
    </Router>
      
    </>
  )

}

export default App;

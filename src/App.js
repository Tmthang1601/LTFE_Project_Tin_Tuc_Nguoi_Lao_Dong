import React from 'react'
import Navbar from './components/Navbar'
import {  BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
const App = () => {
  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
      </Routes>
    </Router>
      
    </>
  )
}

export default App
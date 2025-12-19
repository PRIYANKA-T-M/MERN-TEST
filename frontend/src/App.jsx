import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Header from './components/Header.jsx'
import Home from './pages/Home.jsx'
import Products from './pages/Products.jsx'
import ProductSearch from './pages/ProductSearch.jsx'
import Signup from './pages/Signup.jsx'
import Signin from './pages/Signin.jsx'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/search' element={<ProductSearch />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

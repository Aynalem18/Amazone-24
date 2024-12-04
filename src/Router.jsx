import React from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Landing from './Pages/Landing/Landing'
import Auth from './Pages/Auth/Auth'
import Payment from './Pages/Payment/Payment'
import Orders from './Pages/Orders/Orders'
import Cart from './Pages/Cart/Cart'
import Results from './Pages/Results/Results'
import ProductDetail from './Pages/ProductDetail/ProductDetail'
import{Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'

function Routing() {
 const stripePromise = loadStripe ("pk_test_51QQXuiDVHOdWvxViZhqHWV1pVs2fh5M8ysd60XfwYCF5pnjdtccFfCTKhPWMopyI2y5faucSHs0cCOhw7NBi0T5u00UBoa6zy8");
 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth/>} />
        <Route path="/payments" element={
          <ProtectedRoute msg = {"You Must Log In To Pay"} redirect={"/payments"}>
            <Elements stripe={stripePromise}>
            <Payment />
          </Elements>
          </ProtectedRoute>
          
        } />
        <Route path="/orders" element={
          <ProtectedRoute
           msg = {"You Must Log In To Access Your Orders"} 
          redirect={"/orders"}>
            <Orders />
          </ProtectedRoute>
          
          
          } />
        <Route path="/category/:categoryName" element={<Results />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        
        
      </Routes>
    </Router>
  )
}

export default Routing
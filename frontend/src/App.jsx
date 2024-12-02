import React, { useEffect } from 'react'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import About from './pages/About'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import AllBooks from './pages/AllBooks'
import Login from './pages/Login'
import SignUp from './pages/SignUp'

import ViewBookDetail from './components/ViewBookDetail'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from './store/auth'
import Profile from './pages/Profile'
import Favourites from './components/Favourites'
import UserOrderHistory from './components/UserOrderHistory'
import Setting from './components/Setting'
import AllOrders from './components/AllOrders'
import AddBook from './pages/AddBook'
import UpdateBook from './pages/UpdateBook'


const App = () => {

  const dispatch =useDispatch();
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    if (
      localStorage.getItem("id")&&
      localStorage.getItem("token")&&
      localStorage.getItem("role")
    ) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  }, [])
  return (
    <div>
      
        <Navbar />
        <Routes>
         <Route path='/' element={<Home />} />
         <Route path='/about' element={<About />} />
         <Route path='/allbooks' element={<AllBooks />} />
         <Route path='/profile' element={<Profile />}>
         {
          role === "user" ? (
            <Route index element={<Favourites />} />
          ): (
            <Route index element={<AllOrders />} />
          )
         }
         {
          role === "admin" && <Route path='/profile/book' element={<AddBook/>} />
         }
         <Route path='/profile/oderHistory' element={<UserOrderHistory />} />
         <Route path='/profile/setting' element={<Setting />} />
         </Route>
         <Route path='/login' element={<Login />}/>
         <Route path='/updateBook/:id' element={<UpdateBook />} />
         <Route path='/signup' element={<SignUp />} />
         <Route path='/viewbook/:id' element={<ViewBookDetail />} />
        </Routes>
        <Footer />
     
    </div>
  )
}

export default App

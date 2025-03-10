import React, { Profiler } from 'react'
import Home from '../pages/Home/Home'
import Favorites from '../pages/Favorites/Favorites'
import SignIn from '../pages/Login/SignIn'
import AddMovies from '../pages/Admin/AddMovies'
import Users from '../pages/Admin/Users'
import UserDetails from '../components/UserDetails/UserDetails'
import Profile from '../pages/Login/Profile'
import NavBar from '../components/nav/NavBar'
import { Route, Routes } from 'react-router-dom'
import SignUp from '../pages/Login/SignUp'

export default function NavLink() {

    const { isAuth, role } = UserDetails();


    return (
        <div>
            <NavBar />
            <Routes>
                <Route path='/' element={role === 'Admin' ? <AddMovies /> : <Home />} />
                <Route path="/user/favorite" element={(role === 'user'&&isAuth) ? <Favorites /> : <Home />} />
                <Route path='/Profile' element={isAuth ? <Profile/>:<SignIn/>} />
                <Route path='/SignUp' element={<SignUp/>} />

                <Route path="/admin/users" element={role === 'Admin' ? <Users /> : <Home />} />

            </Routes>
        </div>
    )
}

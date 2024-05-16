import React from 'react'
import Navbar from '../navbar/Navbar'
import Header from '../header/header'
import Test from '../testcomponent/Test'
import { Outlet } from 'react-router-dom'

function RootLayout() {
  return (
    <div>
        <Navbar/>
        <Outlet/>


    </div>
  )
}

export default RootLayout
import React from 'react'
import { Outlet } from 'react-router-dom'
function UserProfile() {
  return (
    <div>
        <h1 className="text-center text-primary mb-5">User Profile</h1>
        <Outlet/>
    </div>
  )
}

export default UserProfile

import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import {useSelector } from 'react-redux'

function AuthorProfile() {

  const {currentUser} = useSelector(state=>state.userLogin)
  
  return (
    <div>
      <h1 className='text-center text-primary'>Author Profile</h1>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <NavLink
            to={`articles-by-author/${currentUser.username}`} //articles-by-author/:author
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Articles by Author
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="new-article"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            New Article
          </NavLink>
        </li>
      </ul>
      <Outlet/>
    </div>
  )
}

export default AuthorProfile
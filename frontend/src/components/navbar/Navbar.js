import React from 'react'
import {NavLink,Link} from 'react-router-dom'
import "./Navbar.css"
import { useSelector,useDispatch } from 'react-redux'
import { resetState } from '../../redux/slices/userLoginSlice'
function Navbar() {

  const {isPending,currentUser,errorStatus,errorMessage,loginStatus} = useSelector(state=>state.userLogin)
  const dispatch = useDispatch()
  function logOut(){
    //remove token from session storage
    sessionStorage.removeItem('token')
    //reset the state
    let resetActionObj = resetState()
    //dispatch the resetActionObj to redux store to reset the userLogin State
    dispatch(resetActionObj)
  }


  return (
    <nav class="navbar mynav">
    <Link className="navbar-brand mx-2" id='bloggify-branding' to="/">Bloggify</Link>
  
    <ul class="nav">
    {loginStatus === false? <>
      <li class="nav-item ">
        <NavLink className="nav-link text-secondary" to="/">Home</NavLink>
      </li>
      <li class="nav-item">
        <NavLink className="nav-link text-secondary" to="/signup">SignUp</NavLink> </li>
      <li class="nav-item">
        <NavLink className="nav-link text-secondary" to="/login">Login</NavLink> </li>
      </>:<>
       {/*if logged in display only this*/}

       <span className='lead fs-3 text-primary me-3 mb-1 btn-outline-info'> <span className='text-secondary fs-4 me-1'>Welcome,</span> {currentUser.username}</span>

       <li className='nav-item'>
       <NavLink className="nav-link text-secondary" to='/login' onClick={logOut}>SignOut</NavLink> </li>
 
      </>}
    </ul>

  </nav>
  
  )
}

export default Navbar
import "./Register.css"
import {useForm} from "react-hook-form"
import { Link } from "react-router-dom"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export default function Register() {

let {register,handleSubmit,formState:{errors}} = useForm()
let [err,setErr] = useState('')
let navigate = useNavigate()

async function handleFormSubmit(data){
    // console.log(data) comment out to debug if needed
    //http post request to user-api
    if(data.userType === 'user'){
        // if user is registering
        let res = await axios.post('http://localhost:4000/user-api/user',data)
        console.log(res)
        if(res.data.message === 'New User Created'){
            navigate('/login')
        }
        else if(res.data.message === 'User already exists'){
            setErr(res.data.message)
        }

    }else{
        //if author is registering
        let res = await axios.post('http://localhost:4000/author-api/user',data)
        console.log(res)
        if(res.data.message === 'New Author Created'){
            navigate('/login')
        }
        else if(res.data.message === 'User(Author) already exists'){
            setErr(res.data.message)
        }
    }
        
 }

 
    return (
    <div className="register">
    <div className="form-container container  mt-2 mb-3">
    
    <form action="" className="form p-5 mt-5" onSubmit={handleSubmit(handleFormSubmit)}>
    <h1 className="registerTitle text-center mt-3">Register</h1>
        {/* Conditionnaly render error mesage if user already exists */}
        {err.length !== 0 && <p className="text-center text-danger lead mt-2 mb-2 p-3">{err}</p>}
        <div className="mb-4">
                <label htmlFor="user" className="form-check-label me-3">
                    Register as
                </label>

                <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="userType" id="user" value="user" {...register("userType",{required:true})}/>
                        <label htmlFor="user" className="form-check-label">User</label>
                </div>


                <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="userType" id="author" value="author" {...register("userType",{required:true})}/>
                        <label htmlFor="author" className="form-check-label">Author</label>
                </div>
            {errors.userType?.type==='required'&&<p className="form-text text-danger">UserType is required </p>}
            </div>

            <div className="mb-4">
                <label className="form-label">Username</label>
                <input className="registerInput form-control" type="text" placeholder="Enter your username..." {...register("username",{required:true,minLength:5})} />
                {errors.username?.type==='required'&&<p className="form-text text-danger">Username is required </p>}
                {errors.username?.type==='minLength'&&<p className="form-text text-danger">Username should have minimum 5 characters</p>}

            </div>


            <div className="mb-4">
                <label className="form-label">Password</label>
                <input className="registerInput form-control" type="password" placeholder="Enter your password..." {...register("password",{required:true,minLength:4})} />
                {errors.password?.type==='required'&&<p className="form-text text-danger">password is required </p>}
                {errors.password?.type==='minLength'&&<p className="form-text text-danger">password should have minimum 4 characters</p>}
            </div>

            <div className="mb-4">
                <label className="form-label">Email</label>
                <input className="form-control" type="email" placeholder="Enter your email..." {...register("email",{required:true})} />
                {errors.email?.type==='required'&&<p className="form-text text-danger">email is required </p>}
            </div> 
                
                

            <button type="submit" className="registerButton" >Register</button>
        </form>

       

       </div>

    <Link to="/login">
        <button className="registerLoginButton">Login</button>
    </Link>
    </div>
    )
}


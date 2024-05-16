import "./Login.css"
import {useForm} from "react-hook-form"
import { Link } from "react-router-dom"
import { userLoginThunk } from "../../redux/slices/userLoginSlice"
import {useDispatch,useSelector} from 'react-redux'
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"



export default function Register() {

let dispatch = useDispatch()
let {register,handleSubmit,formState:{errors}} = useForm()
let navigate = useNavigate()

function handleFormSubmit(userCred){
    //to call the login api through redux 
    let actionObj = userLoginThunk(userCred)
    //dispatch the action object
    dispatch(actionObj)
    
}

const {isPending,currentUser,errorStatus,errorMessage,loginStatus} = useSelector(state=>state.userLogin)


useEffect(()=>{
    if(currentUser.userType === 'user'){
        navigate('/user-profile')
    }else if(currentUser.userType === 'author'){
        navigate('/author-profile')
    }
},[loginStatus])

    return (
    <div className="register">
        <h1 className="registerTitle text-center mt-5">Login</h1>
        <div className="form-container container w-50 mt-2 mb-5">

        <form action="" className="form p-4" onSubmit={handleSubmit(handleFormSubmit)}>

        <div className="mb-4">
            {errorStatus===true&&<p className="text-center text-danger">{errorMessage}</p>}
                <label htmlFor="user" className="form-check-label me-3">
                    Register as
                </label>

                <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="userType" id="user" value="user" {...register("userType",{required:true})}/>
                        <label htmlFor="user" className="form-check-label">User</label>
                </div>


                <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="userT" id="author" value="author" {...register("userType",{required:true})}/>
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

                
            <button type="submit" className="registerButton" >Login</button>
        </form>

       

       </div>

    <Link to="/signup">
        <button className="registerLoginButton">Login</button>
    </Link>
    </div>
    )
}

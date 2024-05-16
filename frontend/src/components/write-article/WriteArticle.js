import "./WriteArticle.css";
import { useForm } from "react-hook-form";
import {useSelector } from "react-redux";
import { axiosWithToken } from "../../axiosWithToken";
import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import axios from "axios";


import React from 'react'

function WriteArticle() {
  let {register,handleSubmit,formState:{errors}} = useForm()
  let { currentUser } = useSelector((state) => state.userLogin);
  let [err, setErr] = useState("");
  let navigate = useNavigate();

  let token = sessionStorage.getItem("token");// this line is used in axiosWithToken function. that functio is also given just below
  const axiosWithToken = axios.create({
    headers: { Authorization: `Bearer ${token}` },
  });


  async function handleArticleSubmit(newArticleObj){
    newArticleObj.articleId = Date.now();
    newArticleObj.dateOfCreation = new Date();
    newArticleObj.dateOfModification = new Date();
    newArticleObj.username = currentUser.username;
    newArticleObj.comments = [];
    newArticleObj.status = true;
    console.log(newArticleObj)

    console.log("newArticleObj: ",newArticleObj)  // comment it out to test or debug
    //make HTTP POST req to author api
    let res = await axiosWithToken.post("http://localhost:4000/author-api/new-article",newArticleObj );

    console.log("res", res); // comment out to test or debug
    if (res.data.message === "New Article Created") {
      //navigate for articlesBy author component
      navigate(`/author-profile/articles-by-author/${currentUser.username}`);
    } else {
      setErr(res.data.message);
    }


  }


  return (
    <div>
      <div className="write m-4">
        <img
          className="writeImg "
          src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt="A random img to fill"
        />
        {errors.title?.type==='required' && <p className="text-center text-danger fs-6 lead">Title is required</p>}
        <form className="writeForm mt-2" onSubmit={handleSubmit(handleArticleSubmit)}>
  
          <div className="writeFormGroup">
            <input className="writeInput" placeholder="Title" type="text" autoFocus={true} {...register('title',{required:true})} />
          </div>
  
          <div className="writeFormGroup">
          <input className="writeInput" placeholder="Category" type="text" {...register('category', {required:true})} />
          </div>
  
          <div className="writeFormGroup">
            <textarea className="writeInput writeText" placeholder="Tell your story..." type="text" autoFocus={true} {...register('content',{required:true})} />
          </div>
          <button className="  writeSubmit text-center" type="submit">
            <span>Publish</span>
          </button>
        </form>
      </div>
    );
    </div>
  )
}

export default WriteArticle
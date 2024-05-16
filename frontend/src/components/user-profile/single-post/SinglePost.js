import "./SinglePost.css";
import FillerImg from '../../../images/fillerImg.jpeg'
import { useNavigate,useLocation } from "react-router-dom";
import { useState} from "react";

import axios from 'axios'
import {useSelector} from 'react-redux'
import {useForm} from 'react-hook-form'

import { BiCommentAdd } from "react-icons/bi";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { FcComments } from "react-icons/fc";
import { FcPortraitMode } from "react-icons/fc";
import { MdRestore } from "react-icons/md";



export default function SinglePost() {
  // let [article,setArticle] = useState([])
  // const [err,setErr] = useState('');
  const [commentStatus,setCommentStatus] = useState('')
  const [editArticleStatus, setEditArticleStatus] =  useState(false)
  
  
  let navigate = useNavigate()
  const {state} = useLocation() // basically now 'state' is the articleObj
  const [editedArticle,setEditedArticle]=useState(state)
  const [articleViewStatus, setArticleViewStatus] = useState(state.status)
  
  const {currentUser} = useSelector(state=>state.userLogin)
  
  let {register,handleSubmit,formState:{errors} } = useForm()

  let token = sessionStorage.getItem("token");// this line is used in axiosWithToken function. that functio is also given just below
  const axiosWithToken = axios.create({
    headers: { Authorization: `Bearer ${token}` },

  });


  function editArticle(){
    setEditArticleStatus(true)
  }

  async function saveEditedArticle(editedArticleObj){
      const modifiedArticle = {...state,...editedArticleObj}
      delete modifiedArticle._id;
      modifiedArticle.dateOfModification=new Date();
      console.log(modifiedArticle)
      //make HTTP PUT
      let res=await axiosWithToken.put('http://localhost:4000/author-api/article',modifiedArticle)
      if(res.data.message==='Article modified'){
        setEditArticleStatus(false)
        setEditedArticle(res.data.payload)
        navigate(`/author-profile/article/${state.articleId}`,{state:res.data.payload})
    }
  }
  

  async function postComment (commentObj){
    commentObj.username = currentUser.username
    console.log(commentObj,state.articleId) //comment out to debug
    let res = await axiosWithToken.post(`http://localhost:4000/user-api/comment/${state.articleId}`,commentObj)
    console.log(res.data)
    if(res.data.message==='Comment Added'){
        setCommentStatus(res.data.message)
    }
  }


   //convert ISO date to UTC data
   function ISOtoUTC(iso) {
    let date = new Date(iso).getUTCDate();
    let day = new Date(iso).getUTCDay();
    let year = new Date(iso).getUTCFullYear();
    return `${date}/${day}/${year}`;
  }



  return (
    
    <div>
    {
      editArticleStatus===false?
      <>
        <div className="singlePost">
          <div className="singlePostWrapper">
                  <img
                    className="singlePostImg"
                    src={FillerImg}
                    alt="Some filler"
                  />
                  <div>
                  <h1 className="singlePostTitle text-center mt-2 Articletitle">
                    {editedArticle.title} 
                    </h1>
                  {/*Conditionally render edit and delete buttons only if userType === user*/}
                    {
                      currentUser.userType==='author' && <div className="singlePostEdit">
                    <button className="me-2 mt-3 btn btn-warning  editButton" onClick={editArticle}>
                      <CiEdit className="fs-2" />
                    </button>
                    {articleViewStatus===true?
                      <button className="me-2 mt-3 btn btn-danger deleteButton">
                        <MdDelete className="fs-2" />
                      </button>: 
                      <button className="me-2 mt-3 btn btn-secondary restoreButton">
                        <MdRestore className="fs-2" />
                      </button>  }
                       
              
                      </div>
                    }

                  </div>
                  <div className="singlePostInfo mt-3">
                    <span>
                      Author:
                      <b className="singlePostAuthor">
                          {editedArticle.username}
                      </b>
                    </span>
                    <span className="date-of-modification">Date of modification: {editedArticle.dateOfModification}</span>
                  </div>
                  <p className="singlePostDesc" style={{whiteSpace: 'pre-line'}}>
                    {editedArticle.content}
                  </p>

              <div >
                  {currentUser.userType==='user'&&
                    <form onSubmit={handleSubmit(postComment)}>
                    {errors.comment?.type==='required'&&<p className="fs-6 lead text-warning">Comment cannot be empty!</p>}
                    <p className="text-success text-center m-2 p-1 lead display-6">{commentStatus}</p>
                    <input
                      type="text"
                      {...register("comment",{required:true})}
                      className="form-control mb-4 commentForm w-75 "
                      placeholder="Write comment here...."
                    />
                    <button type="submit" className="btn btn-success">
                      Add a Comment <BiCommentAdd className="fs-3" />
                    </button>
                  </form>
                }
              </div>

              {/* display Comments section*/}
              <div className="comments my-4">
              {state.comments.length === 0 ? (
                <p className="display-3">No comments yet...</p>
              ) : (
                state.comments.map((commentObj, ind) => {
                  return (
                    <div key={ind} className="bg-light  p-3">
                      <p
                        className="fs-4"
                        style={{
                          color: "dodgerblue",
                          textTransform: "capitalize",
                        }}
                      >
                        <FcPortraitMode className="fs-2 me-2" />
                        {commentObj.username}
                      </p>

                      <p
                        style={{
                          fontFamily: "poppins",
                          color: "lightseagreen",
                        }}
                        className="ps-4"
                      >
                        <FcComments className="me-2" />
                        {commentObj.comment}
                      </p>
                    </div>
                  );
                })
              )}
            </div>


          </div>
        </div>
      </> : <div> {/*Form starts here*/ }
      <div className="write m-4">
        <img
          className="writeImg "
          src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt="A random img to fill"
        />
        {errors.title?.type==='required' && <p className="text-center text-danger fs-6 lead">Title is required</p>}
        <form className="writeForm mt-2" onSubmit={handleSubmit(saveEditedArticle)}>
  
          <div className="writeFormGroup">
            <input className="writeInput" placeholder="Title" type="text" autoFocus={true} {...register('title',{required:true})} defaultValue={state.title} />
          </div>
  
          <div className="writeFormGroup">
          <input className="writeInput" placeholder="Category" type="text" {...register('category', {required:true})} defaultValue={state.category} />
          </div>
  
          <div className="writeFormGroup">
            <textarea className="writeInput writeText" placeholder="Tell your story..." type="text" autoFocus={true} {...register('content',{required:true})} defaultValue={state.content} />
          </div>
          <button className="  writeSubmit text-center" type="submit">
            <span>Save</span>
          </button>
        </form>
      </div>
    
    </div>}
    </div>
) }

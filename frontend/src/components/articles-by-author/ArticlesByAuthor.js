import React from 'react'
import { useState,useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import ComponentCard from '../componentCard/ComponentCard'
import {useSelector} from 'react-redux'
import axios from 'axios'


function ArticlesByAuthor() {

  let [articlesList, setArticlesList] = useState([])
  let [err,setErr] = useState('')
  let navigate = useNavigate()
  let {currentUser} = useSelector(state=>state.userLogin)

  let token = sessionStorage.getItem("token");// this line is used in axiosWithToken function. that functio is also given just below
  const axiosWithToken = axios.create({
    headers: { Authorization: `Bearer ${token}` },
  });

  const getArticlesOfCurrentAuthor = async ()=>{
    let res = await axiosWithToken.get(`http://localhost:4000/author-api/articles/${currentUser.username}`)
    if(res.data.message === 'Articles List'){
      setArticlesList(res.data.payload)
      // console.log(articlesList)
    }
  }

  useEffect(()=>{
    getArticlesOfCurrentAuthor()
  },[articlesList])

  return (
    <div>
        {
          articlesList.length===0?<p className='lead text-center fs-1 text-danger'>No Articles Found</p>
          :<div className='gridOfCards'>
              <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mt-5 me-1'>
                {
                  articlesList.map((articleObj)=>(
                    <div className='col' key={articleObj.articleId}>
                      <ComponentCard articleObj={articleObj}/>
                    </div>
                  ))      
                }
              </div>
           </div>
        }
    </div>
  )
}

export default ArticlesByAuthor
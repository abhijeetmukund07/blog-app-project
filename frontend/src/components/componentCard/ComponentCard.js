
import React from 'react'
import CardComponent from '../../images/CardComponent.png'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import "./ComponentCard.css"


function ComponentCard(props) {
  const navigate = useNavigate()
  const articleObj = props.articleObj;
  let {currentUser} = useSelector(state=>state.userLogin)

 

  function openArticleOnClick(articleObj){
  if(currentUser.userType==='user'){
    navigate(`/user-profile/articles/${articleObj.articleId}`,{state:articleObj})
  }else{
    navigate(`/author-profile/article/${articleObj.articleId}`,{state:articleObj})
}
    
  }



  return (
    <div className='card-container'>
      <div className='card h-75 rounded-4 shadow-sm' style={{ width: '18rem' }}>
        <img
          src={CardComponent}
          className='card-img-top card-image custom-card-img h-75'
          alt={articleObj.title}
        />
        <div className='card-body'>
          <h5 className='card-title'>{articleObj.title}</h5>
          <p className='card-text'>{articleObj.content.substring(0, 120)}...</p>
          <button className='button-83' onClick={()=>openArticleOnClick(articleObj)}>Read More...</button>
        </div>
        <div className='card-footer'>
          <small className='text-body-secondary'>
            Last updated on {articleObj.dateOfModification}
          </small>
        </div>
      </div>
    </div>
  )
}

export default ComponentCard
const exp = require('express')
const {createUserOrAuthor,userOrAuthorLogin} = require('./Util')
const expressAsyncHandler = require('express-async-handler')
const authorApp = exp.Router()
const VerifyToken = require('../Middlewares/VerifyToken')

let authorsCollection
let articlesCollection
authorApp.use((req,res,next)=>{
    authorsCollection = req.app.get('authorsCollection')
    articlesCollection = req.app.get('articlesCollection')
    next()
}) 

//Author registration route
authorApp.post('/user',expressAsyncHandler(createUserOrAuthor) )


//Author Login Route
authorApp.post('/login',expressAsyncHandler(userOrAuthorLogin))

//to add new article
authorApp.post('/new-article',VerifyToken,expressAsyncHandler(async(req,res)=>{
 
    //get new article
    let newArticle = req.body
    //save article to articles collection
    articlesCollection.insertOne(newArticle)
    //send response
    res.send({message:"New Article Created"})
}))

//to read an article by article id
authorApp.get('/article/:articleId',VerifyToken,expressAsyncHandler(async (req,res)=>{
    const articleIdFromUrl = Number(req.params.articleId)
    console.log(articleIdFromUrl)
    //get username of author
    //get that particular article
    const article = await articlesCollection.find({articleId:articleIdFromUrl}).toArray()
    console.log(article)
    if(article.length===0){
        res.send({message:'No Such Article Found'})
    }else{
        res.send({message:'Article Found',payload:article})
    }
}))

// read articles by author username. Author should read only his articles
authorApp.get('/articles/:username',VerifyToken,expressAsyncHandler( async(req,res)=>{
    const usernameOfAuthor = req.params.username
    //get articles of current author
    const articlesList = await articlesCollection.find({username:usernameOfAuthor,status:true}).toArray()
    //send response
    if(articlesList.length !==0)
        res.send({message:"Articles List",payload:articlesList})
    else
        res.send({message:'No Articles Found'})
}) )


//edit a article
authorApp.put('/article',VerifyToken,expressAsyncHandler(async (req,res)=>{
    //get modified article
    let modifiedArticle = req.body
    //update the article
    let editedArticle = await articlesCollection.findOneAndUpdate({articleId:(+modifiedArticle.articleId)},{$set:{...modifiedArticle}},{returnDocument:'after'})
    //send response
    console.log(editedArticle)
    // if(editedArticle.acknowledged === false){
    //     return res.send({message:"Some Error Occured while modifying the article"})
    // }
    res.send({message:'Article modified',payload:editedArticle})
    // if(editedArticle.matchedCount === 0){
    //     res.send({message:'No Matching Article Found'})
    // }else if(editedArticle.matchedCount > 0 & editedArticle.modifiedCount > 0){
    //     res.send({message: "Article Modified"})
    // }
}))


// Soft delete the article (which is to update the status to false)
authorApp.put('/article/:articleId',VerifyToken,expressAsyncHandler( async(req,res)=>{
     //get modified article
     let toBeDeletedArticle = req.body
     //update the article
     let response = await articlesCollection.updateOne({articleId:toBeDeletedArticle.articleId},{$set:{...toBeDeletedArticle}})
     //send response
     if(response.acknowledged === false){
        return res.send({message:"OOPS! Some Error Occured at our side while deleting the article"})
    }

    if(response.matchedCount === 0){
        res.send({message:'No Matching Article found to delete'})
    }else if(response.matchedCount > 0 & response.modifiedCount > 0){
        res.send({message: "Article Deleted"})
    }
}))

module.exports = authorApp
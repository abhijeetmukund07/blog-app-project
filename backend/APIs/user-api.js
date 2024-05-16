const exp = require('express')
const {createUserOrAuthor,userOrAuthorLogin} = require('./Util')
const expressAsyncHandler = require('express-async-handler')
const userApp = exp.Router()
const VerifyToken = require('../Middlewares/VerifyToken')

//get usersCollection and articlesCollection into the API via a middleware
let usersCollection
let articlesCollection
userApp.use((req,res,next)=>{
    usersCollection = req.app.get('usersCollection')
    articlesCollection = req.app.get('articlesCollection')
    next()
}) 


//get 

//user registration route
userApp.post('/user',expressAsyncHandler(createUserOrAuthor))


//user login route
userApp.post('/login',expressAsyncHandler(userOrAuthorLogin))


//view all articles
userApp.get('/articles',VerifyToken,expressAsyncHandler( async(req,res)=>{
    
    //get all articles from articlesCollection
    let articlesList = await articlesCollection.find({status:true}).toArray()
    //send response
    res.send({message:"All Articles",payload:articlesList})
}))

// add comment by user
userApp.post('/comment/:articleId',VerifyToken,expressAsyncHandler( async(req,res)=>{
    //get article id
    let articleIdFromURL =Number(req.params.articleId)
    //get commentBody
    let commentBody = req.body
    console.log(commentBody)
    //update to database
    let response = await articlesCollection.updateOne({articleId:articleIdFromURL},{$addToSet:{comments:commentBody}})
    console.log(response) //comment it out to debug

    res.send({message:"Comment Added"})

}))

module.exports = userApp
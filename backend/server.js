//import react module
const exp = require('express')
const path = require('path')
//we maintain a file called .env for all the environment variables
require('dotenv').config()//it adds the .env file to process object. To access env variables, process.env.key
// The process object in Node. js is a global object that can be accessed inside any module without requiring it. 
const app = exp()

app.use(exp.static(path.join(__dirname,'../frontend/build')))


//body parser middleware
app.use(exp.json())


//import api's
const userApp = require('./APIs/user-api')
const authorApp = require('./APIs/author-api')
const adminApp = require('./APIs/admin-api')
const mongoClient = require('mongodb').MongoClient

//connect to mongodb

mongoClient.connect(process.env.DB_URL)
.then(client =>{
    const blogDBobj = client.db('blogdb') 

    //create collection objects
    const usersCollection = blogDBobj.collection('users')
    const authorsCollection = blogDBobj.collection('authors')
    const articlesCollection = blogDBobj.collection('articles')

    //share collection objects with api's
    app.set('usersCollection',usersCollection)
    app.set('authorsCollection',authorsCollection)
    app.set('articlesCollection',articlesCollection)

    //confirmation
    console.log("Database connection established");
})
.catch((err) => console.log("Error connecting to Database"));






//direct path's to apis using path level middleware
app.use('/user-api',userApp)
app.use('/admin-api',adminApp)
app.use('/author-api',authorApp)



//error handling middleware
//check this. NOT WORKING ig
app.use((err,req,res,next)=>{
    res.send({status:"Error", message:err.message})
})



const port = process.env.PORT || 4002 //(use port as in process.env.PORT. if not available use port 4000 )
app.listen(port,()=>{console.log(`http server running on port: ${port}`)})






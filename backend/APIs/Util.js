//import bcrypt js for hashing password
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
//request handler for user registration(user or author)
const createUserOrAuthor = async (req,res)=>{

    //get users and authors collection Object
    const usersCollectionObj = req.app.get('usersCollection')
    const authorsCollectionObj = req.app.get('authorsCollection')

    //get user or author
    const user = req.body;
    console.log(user.username)


    //check duplicate user
    if(user.userType === 'user'){
        //find user by username
        let dbUser = await usersCollectionObj.findOne({username: user.username});
        //if user already exists
        if(dbUser != null){
            return res.send({message : "User already exists"})
        }
    }

    //check duplicate author
    if(user.userType === 'author'){
        //find user by username
        let dbUser = await authorsCollectionObj.findOne({username: user.username});
        //if user already exists
        if(dbUser != null){
            return res.send({message : "User(Author) already exists"})
        }
    }

    //if control comes to this line., it means that there is no duplicate user
    //now,
    //since the following steps 1 and 2 are common to both users and authors, we are placing it outside any if block which checks the type of user

    //1.hash password
    const hashedPassword = await bcryptjs.hash(user.password,4)
    //2. replace plain password with hashed password
    user.password = hashedPassword

    //3. insert user/author into respective collection
    if(user.userType === 'user'){
        //insert into users collection
        let responseFromDB = await usersCollectionObj.insertOne(user)
        // console.log(responseFromDB)  ******uncomment to test/debug*****
        res.send({message:"New User Created"})
    }
    else if(user.userType === 'author'){
         //insert into users collection
         let responseFromDB = await authorsCollectionObj.insertOne(user)
        //  console.log(responseFromDB)  *****uncomment to test/debug*****
         res.send({message:"New Author Created"})
    }


}

//request handler for user Login (user/author)
const userOrAuthorLogin = async (req,res)=>{
     //get users and authors collection Object
     const usersCollectionObj = req.app.get('usersCollection')
     const authorsCollectionObj = req.app.get('authorsCollection')
 
     //get user or author
     const userCred = req.body; //user credential details
    //  console.log(userCred) //******Comment it out to test or debug******

    //verify if the username exists or not

    // if userType === user
    if(userCred.userType === 'user'){
        //find in usersCollectionObj
        let dbUser = await usersCollectionObj.findOne({username:userCred.username})
        // console.log("dbUser:",dbUser) //******Comment it out to test or debug******
        if(dbUser == null){
            return res.send({message:"Invalid Username "})
        }else{// validate password
            let status = await bcryptjs.compare(userCred.password,dbUser.password)
            if(status === false){
               return res.send({message:"Invalid Password"})
            }else{
                //generate the token
                const signedToken = jwt.sign({username: dbUser.username},process.env.SECRET_KEY,{expiresIn:'1d'})
                delete dbUser.password
                res.send({message:"Login Success",token:signedToken,user:dbUser})
            }
        }
    }
    //if userType === author
    if(userCred.userType === 'author'){
        //find in usersCollectionObj
        let dbUser = await authorsCollectionObj.findOne({username:userCred.username})
        if(dbUser == null){
            return res.send({message:"Invalid Username "})
        }else{
            let status = await bcryptjs.compare(userCred.password,dbUser.password)
            if(status === false){
               return res.send({message:"Invalid Password"})
            }else{
                //generate the token
                const signedToken = jwt.sign({username: dbUser.username},process.env.SECRET_KEY,{expiresIn:'1d'})
                delete dbUser.password
                res.send({message:"Login Success",token:signedToken,user:dbUser})
            }
        }
    }

    //if userName and password are valid...
        

}

module.exports = {createUserOrAuthor,userOrAuthorLogin}
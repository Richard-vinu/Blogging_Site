const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const blogModel = require('../models/blogModel')
const isValidObjectId = (ObjectId)=>{
  return mongoose.Types.ObjectId.isValid(ObjectId)
}

//------------------⭐Authentication⭐--------------//

let authn = async (req,res,next)=>{
try{
let  token =  req.headers['x-api-key']


  if(!token) 
    return res.send({staus:false,msg:"token is required "})

    let decodedtoken =  jwt.verify(token,"Blogging site Mini Project")
    req.decoded = decodedtoken

    if(!decodedtoken) 
    return res.status(401).send({status:false,msg:"you are Unauthorized"})

    next()
}catch(err){
    res.status(500).send({msg:err.message})
} 
}

//--------------------⭐Authorization⭐--------------------//

let authz = async (req,res,next)=>{
  
  //  let authorId = req.body.authorId

  //  let blogId = req.parmam.blogId

  //  if(!isValidObjectId(authorId))
  
  //  return res.status(400).send({status:false,msg:"enter the valid authorId"})

   let blogData = await blogModel.findById(req.params.blogId); 
   if(!blogData) return res.status(404).send({ status: false, msg: "Error, Please check Id and try again" });




if(req.decoded.authorId != blogData.authorId)
return res.status(403).send({staus:false,msg:"you are not authorized"})

next()
}


module.exports = {authn,authz}
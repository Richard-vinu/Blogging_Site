const jwt = require('jsonwebtoken')

//------------------⭐Authentication⭐--------------//

let authn = async (req,res,next)=>{
try{
let  token =  req.headers['x-api-key']


  if(!token) 
    return res.send({staus:false,msg:"token is required "})

    let decodedtoken =  jwt.verify(token,"Blogging site Mini Project")
    req.decoded = decodedtoken

    if(!decodedtoken) 
    return res.status(401).send({status:false,msg:"invalid-token"})

    next()
}catch(err){
    res.status(500).send({msg:err.message})
} 
}

//--------------------⭐Authorization⭐--------------------//

let authz = async (req,res,next)=>{

   let authorId = req.body.authorId


if(req.decoded.authorId != authorId)
return res.status(403).send({staus:false,msg:"you are not authorized"})

next()
}


module.exports = {authn,authz}
const authorModel = require('../models/authorModel')
const jwt =require("jsonwebtoken")

const createAuthor = async (req,res)=>{

    try{

        let result = req.body
        let {fname,lname,title,email,password}=result
        if(!fname){res.status(400).send({msg:"fname is mandatory"})}
         if(!lname){res.status(400).send({msg:"lname is mandatory"})}
         if(!title){res.status(400).send({msg:"title is mandatory"})}
         if(!email){res.status(400).send({msg:"email is mandatory"})}
         if(!password){res.status(400).send({msg:"password is mandatory"})}
   const data = await authorModel.create(result)

   res.status(201).send({data:data})

    }catch(err){
        res.status(500).send({status:false,error:err.message})
    } 
}
const loginAuthor = async (req,res)=>
{
    try{
        // let {email} =req.body
        // let {password}=req.body
     let data = req.body 
     let {email,password } = data
        if(!email){res.status(400).send({msg:"email id is mandatory"})   }
        if(!password){res.status(400).send({msg:"password is mandatory"})}
        let authorCheck = await authorModel.findOne({ email: email, password: password})
        if (!authorCheck) { return res.status(401).send("Incorrect email or password.") } 



         let token = jwt.sign(
        {
            authorId: authorCheck._id.toString(), 
            platform: "education"
        },
        "Blogging site Mini Project"
    )
    res.status(200).send({ status: true, token: token })
    

    }
    catch(err){
        res.status(500).send({msg:err.message})

    }
}


module.exports={createAuthor}
module.exports.loginAuthor=loginAuthor
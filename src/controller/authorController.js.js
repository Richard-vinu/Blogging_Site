const author = require('../models/authorModel')

const createAuthor = async (req,res)=>{

    try{

        let result = req.body

   const data = await authorModel.create(result)

   res.status(201).send({data:data})

    }catch(err){
        res.status(500).send({status:false,error:err.message})
    }
}


module.exports={createAuthor}
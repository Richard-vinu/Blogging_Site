let blogModel = require('../models/blogModel')
 

let createblog = async function(req,res){
    let data = req.body
    let savedata = await blogModel.create(data)
    res.send({data:savedata})
}
module.exports.createblog=createblog
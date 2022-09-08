let blogModel = require("../models/blogModel");
let authorModel = require('../models/authorModel');
const { default: mongoose } = require("mongoose");
const isValidObjectId = (ObjectId)=>{
  return mongoose.Types.ObjectId.isValid(ObjectId)
}

//----------------------⭐Create_Blog⭐------------------------//

let createblog = async function (req, res) {
  try {
    let data = req.body;
    let { title, body, authorId, category, isPublished,isDeleted }=data
      
    if (!title) 
     return res.status(400).send({ msg: "title is mandatory" });
    
    if (!body) 
     return res.status(400).send({ msg: "body is mandatory" });
    
    if (!authorId) 
    return res.status(400).send({ msg: "authorId is mandatory" });
    
    if (!category) 
   return res.status(400).send({ msg: "category is mandatory" });
    

    if (isPublished) {
      let timeStamps = new Date();
      data.publishedAt = timeStamps;
    }

    if(isDeleted){
      let timeStamps = new Date();
    data.deletedAt = timeStamps;
    }

    if(!isValidObjectId(authorId))
    return res.status(400).send({status:false,msg:"enter the valid AuthorId"})

    
    let validAuthorId = await authorModel.findById(authorId) 
    if(!validAuthorId)
    return res.status(404).send({status:false,msg:"no author found with  this AuthorId"})
    let blogCreated = await blogModel.create(data);
    res.status(201).send({ status: true, data: blogCreated });
  } catch (err) {
    res
      .status(500)
      .send({ status: false, msg: "server Error", err: err.message });
  }
};

//---------------------⭐Get-Blogs-By_Query⭐------------------//

const getBlogByQuery = async function (req, res) {
  try {

    
    let data = req.query
    let {authorId,category,subcategory,tags} = data


    if(Object.keys(data).length == 0)
  return res.status(400).send({status:false,msg:"Enter the key and value to filter" })
  

    let value = await blogModel
      .find({
        isDeleted: false,
        isPublished: true,
        $or: [
          { authorId: authorId },
          { category: category },
          { subcategory: subcategory },
          { tags: tags },
        
        ],
      })
      .populate("authorId");

      if(value.length == 0)
      return res.status(404).send({status:false,msg:"no such blog exist in db"})

     
    res.status(200).send({ status: true, msg: value });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, msg: "server Error", err: err.message });
  }
};


//------------------------⭐UpdateBlog-By-Id⭐----------------//

const updateBlogById = async (req, res) => {
  try {
    let data = req.body;

    let blogId = req.params.blogId;

    if (!blogId)
      return res.status(404).send({ status: false, msg: "No Blog Found" });

    let findBlogId = await blogModel.findById(blogId);//finding the blogId in the database to check whether it is valid or not
    if (!findBlogId) return res.status(404).send({ status: false, msg: "No such blog exist" });

    //Verify that the document is deleted or not
    if (findBlogId.isDeleted)
      return res.status(404).send({ status: false, msg: "No such blog found or has already been deleted" });

    let { title, body, tags, subcategory } = data;

    let result = await blogModel.findOneAndUpdate(
      { _id: blogId },
      {
        title: title,
        body: body,
        $push: { subcategory: subcategory, tags: tags },
        isPublished: true,
        publishedAt: new Date(),
      },
      { new: true }
    );

    res.send({ data: result });
  } catch (err) {
    res
      .status(500)
      .send({ status: false, msg: "server Error", err: err.message });
  }
};


//------------------------⭐DeleteBlog-ById⭐------------------//

const deleteById = async function (req, res) {
  try {
    let blogId = req.params.blogId;
    let blog = await blogModel.find({ _id: blogId, isDeleted: false })
    if (!blog) {
      return res.status(404).send({ status: false, msg: "No blogs found to delete" })
    }
    await blogModel.findOneAndUpdate({ _id: blogId }, { $set: { isDeleted: true, deletedAt: new Date() } })
    return res.status(200).send({ status: true, msg: "deleted successfully" }) // here  status true and data comes
  } catch (error) {
  
    res.status(500).send({ msg: error.message })
  }
}
//-----------------------⭐Delete-blogsBy-queryParams⭐-----------//

let deleteByQuery = async function (req, res) {
  try {
    let filters = req.query
    let isPublished = req.query.isPublished


    if (Object.keys(filters) == 0) { res.status(400).send({ msg: "no query to filter to delete" }) }
    else {
      if (isPublished == "true") { res.status(400).send({ msg: " can not delete as it is   already published" }) }
      else if (isPublished == "false" || isPublished == undefined) {

        let queryCheck = await blogModel.find(filters)
       
        if (queryCheck == 0) { res.status(404).send({ msg: "can not find the enteries" }) }

        
        else {
            for(i=0;i<queryCheck.length;i++){
            if(queryCheck[i].isDeleted==true)
                   {res.send({msg:"already deleted"})}
         
         else{

        if(queryCheck.isDeleted == "true"){res.status(404).send({msg:"blog is deleted can not found"})}
        else {

          let updatedData = await blogModel.updateMany({ filters }, { isDeleted: true })
          let sendRes = await blogModel.find(filters)//.count()
          res.status(200).send({ msg: sendRes })
         }
        }
         }
      }
    }
  }
}catch (err) {
    res.status(500).send({ status: false, msg: "server Error", err: err.message });
  }
}
module.exports = { createblog, getBlogByQuery, updateBlogById,deleteByQuery, deleteById };


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

    if(!blogId)
  return res.send({msg:"enter the blogId"})
    
      

  if(!isValidObjectId(blogId))
    return res.status(400).send({status:false,msg:"enter the valid blogId"})

  

    if (!blogId)
      return res.status(404).send({ status: false, msg: "No Blog Found" });

    let findBlogId = await blogModel.findById(blogId);

    //finding the blogId in the database to check whether it is valid or not
    if (!findBlogId) return res.status(404).send({ status: false, msg: "update failed becoz No such blogId exist" });

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
        isPublished:true,
       
      },
      { new: true }
    );


    if(result.length == 0)
    return res.status(404).send({status:false,msg:"no such blogId doc exist in db"})

    return res.send({ data: result });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, msg: "server Error", err: err.message });
  }
};


//------------------------⭐DeleteBlog-ById⭐------------------//

const deleteById = async function (req, res) {
  try {
    let blogId = req.params.blogId;

    if(!isValidObjectId(blogId))
    return res.status(400).send({status:false,msg:"enter the valid blogId "})

    let blog= await blogModel.findById(blogId)
    if (!blog) {
      return res.status(404).send({ status: false, msg: "No blogs found / this blog doesn't exist " })
    }
if(blog.isDeleted)
return res.status(404).send({staus:false,msg:"this has been deleted Already"})


    await blogModel.findOneAndUpdate({ _id: blogId }, { $set: { isDeleted: true, deletedAt: new Date() } })
    return res.status(200).send({ status: true, msg: "Blog deleted successfully" }) 
  } catch (error) {
  
    return res.status(500).send({ msg: error.message })
  }
}
//-----------------------⭐Delete-blogsBy-queryParams⭐-----------//

let deleteByQuery = async function (req, res) {
  try {

    let {...data} = req.query

    
if(Object.keys(data).length == 0)
return res.status(400).send({status:false,msg:"Enter the key and value in query" })

 let getBlogData = await blogModel.find(data);
  if (getBlogData.length == 0) {
  return res.status(404).send({ status: false, msg: "No blog found" });
}

let blog= await blogModel.find(data)
if(blog.isDeleted)
return res.status(404).send({staus:false,msg:"this has been deleted Already"})

    let deletedBlogs = await blogModel.updateMany(
      data, 
      {isDeleted: true, isPublished: false, deletedAt: new Date(),publishedAt:null},
    );

return res.status(404).send({status:true,msg:"blog deleted Sucessfuly"})


}catch (error) {
  return res.status(500).send({ msg: error.message })
}}
module.exports = { createblog, getBlogByQuery, updateBlogById,deleteByQuery, deleteById };

 

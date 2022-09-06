let blogModel = require('../models/blogModel')
 

let createblog = async function(req,res){
    let data = req.body
    let{title,body,authorId,tags,category,subcategory,isDeleted,isPublished}=data
    if(!title){ res.status(400).send({ msg: "title is mandatory" }) }
    if(!body){ res.status(400).send({ msg: "body is mandatory" }) }

    if(!authorId){ res.status(400).send({ msg: "authorId is mandatory" }) }
    if(!tags){ res.status(400).send({ msg: "tags is mandatory" }) }
    if(!category){ res.status(400).send({ msg: "category is mandatory" }) }
    if(!subcategory){ res.status(400).send({ msg: "subcategory is mandatory" }) }
    if(!isDeleted){ res.status(400).send({ msg: "isDeleted is mandatory" }) }
    if(!isPublished){ res.status(400).send({ msg: "isPublished is mandatory" }) }

    let savedata = await blogModel.create(data)
    res.send({data:savedata})
}
  


 

  
const getBlogByQuery = async function (req, res) {
    try {
      let authId = req.query.authorId;
      let cat = req.query.category;
      let subcat = req.query.subcategory;
      let tag = req.query.tags;
  
      let allData = await blogModel
        .find({
          isDeleted: false,
          isPublished: true,
          $or: [
            { authorId: authId },
            { category: cat },
            { subcategory: subcat },
            { tags: tag },
          ],
        })
        .populate("authorId");
  
      //*Validation
  
      if (allData.length == 0)
        return res.status(404).send({ msg: "Enter valid Details" });
      res.status(200).send({ status: true, msg: allData });
    } catch (err) {
      res
        .status(500)
        .send({ status: false, msg: "server Error", err: err.message });
    }
  };

  
  //PUT /blogs/:blogId

const updateBlogById = async (req,res)=>{
try{
  let data = req.query

  let result = await blogModel.findOneAndDelete()

  res.send({data:result})
}


  catch (err) {
    res
      .status(500)
      .send({ status: false, msg: "server Error", err: err.message });
  }
};

const deleteUser = async function (req, res) {
  try {
    let blogId = req.params.blogId;
    let blog = await blogModel.findOne({ _id: blogId, isDeleted: false })

    if (!blog) {
      return res.status(404).send({ status: false, msg: "No blogs found to delete" })
    }
    await blogModel.findOneAndUpdate({ _id: blogId }, { $set: { isDeleted: true, deletedAt: new Date() } })
    return res.status(200).send({ status: true, msg: "deleted successfully" }) // here  status true and data comes

  } catch (error) {
  
    res.status(500).send({ msg: error.message })
  }
}


module.exports = {createblog,getBlogByQuery,updateBlogById,deleteUser}
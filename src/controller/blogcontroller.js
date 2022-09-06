let blogModel = require('../models/blogModel')
 

let createblog = async function(req,res){
    let data = req.body
    
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




module.exports = {createblog,getBlogByQuery,updateBlogById}
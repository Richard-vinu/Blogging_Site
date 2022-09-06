let blogModel = require('../models/blogModel')
 

let createblog = async function(req,res){

  try{

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

    let blogCreated = await blogModel.create(data);

    if (data.isPublished === true) {
      let Update = await blogModel.findOneAndUpdate(
        { authorId: data.authorId },
        { $set: { publishedAt: new Date() } },
        { new: true }
      );
    }
    if (body.isDeleted === true) {
      let CreateDeleteTime = await blogModel.findOneAndUpdate(
        { authorId: data.authorId },
        { $set: { deletedAt: new Date() } },
        { new: true }
      );
    }
    let Finaldata = await blogModel.find(data);

    res.status(201).send({ status: true, data: Finaldata });
  
  } catch (err) {
    res
      .status(500)
      .send({ status: false, msg: "server Error", err: err.message });
  }
};
   


 

  
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
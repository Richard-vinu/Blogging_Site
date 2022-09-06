let blogModel = require('../models/blogModel')
 

let createblog = async function(req,res){

  try{

    let data = req.body
    let{title,body,authorId,tags,category,subcategory,isPublished}=data
    if(!title){ res.status(400).send({ msg: "title is mandatory" }) }
    if(!body){ res.status(400).send({ msg: "body is mandatory" }) }

    if(!authorId){ res.status(400).send({ msg: "authorId is mandatory" }) }
    if(!tags){ res.status(400).send({ msg: "tags is mandatory" }) }
    if(!category){ res.status(400).send({ msg: "category is mandatory" }) }
    if(!subcategory){ res.status(400).send({ msg: "subcategory is mandatory" }) }
  

   

    if(isPublished){
      let timeStamps = new Date();
      data.publishedAt = timeStamps;
    }
    
    let blogCreated = await blogModel.create(data);
    res.status(201).send({ status: true, data: blogCreated });
  
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

//-------------------------------updateBlogById-----------------------
//By Richard
  

const updateBlogById = async (req,res)=>{
try{
  let data = req.body

  let blogId = req.params.blogId
  

  let{title, body,tags,subcategory} = data

  let result = await blogModel.findOneAndUpdate({_id:blogId},{title:title,body:body,tags:tags,subcategory,subcategory},{new:true})

  res.send({data:result})
}


  catch (err) {
    res
      .status(500)
      .send({ status: false, msg: "server Error", err: err.message });
  }
};




module.exports = {createblog,getBlogByQuery,updateBlogById}
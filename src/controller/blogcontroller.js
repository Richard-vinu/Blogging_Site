let blogModel = require("../models/blogModel");




//-------------------------------⭐Create_Blog⭐--------------------------------------------------------------------------

let createblog = async function (req, res) {
  try {
    let data = req.body;
    let { title, body, authorId, tags, category, subcategory, isPublished } = data;

    //*Validation
    if (!title) {
      res.status(400).send({ msg: "title is mandatory" });
    }
    if (!body) {
      res.status(400).send({ msg: "body is mandatory" });
    }

    if (!authorId) {
      res.status(400).send({ msg: "authorId is mandatory" });
    }
    if (!tags) {
      res.status(400).send({ msg: "tags is mandatory" });
    }
    if (!category) {
      res.status(400).send({ msg: "category is mandatory" });
    }
    if (!subcategory) {
      res.status(400).send({ msg: "subcategory is mandatory" });
    }

    if (isPublished) {
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

//-----------------------------------⭐Get-Blogs-By_Query⭐---------------------------------------------------------------------

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


//------------------------------------⭐UpdateBlog-By-Id⭐-------------------------------------------------------------------

const updateBlogById = async (req, res) => {
  try {
    let data = req.body;

    let blogId = req.params.blogId;

    //*Validation

    if (!blogId)
      return res.status(404).send({ status: false, msg: "No Blog Found" });

      let findBlogId = await blogModel.findById(blogId);
     
      if(!findBlogId) return res.status(404).send({ status: false, msg: "No such blog exist" });
  
      if(findBlogId.isDeleted) 
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


//--------------------------------------⭐DeleteBlog-ById⭐--------------------------------------------------------------------

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
//--------------------------------------⭐Delete-blogsBy-queryParams⭐-----------------------------------------------------------------------------------

let deleteByQuery = async function (req, res) {
      let category = req.query.category
      let authorId = req.query.authorId
      let tags = req.query.tags
      let subcategory = req.query.subcategory
      let isPublished = req.query.isPublished
      let conditions = {
        $or: [
          { category: category },
          { authorId: authorId },
          { tags: tags },
          { subcategory: subcategory },
        ]
      }
      if (isPublished === "false") { res.send({ msg: "it is unpublished" }) }

      else if (!conditions) { res.send({ msg: "not found" }) }
      else {
        let DeleteWithFilters = await blogModel.find(conditions).updateMany({ conditions }, { isDeleted: true })
        let updatedData = await blogModel.find(DeleteWithFilters)
        res.send(updatedData)
      }

    }
    
module.exports = { createblog, getBlogByQuery, updateBlogById,deleteByQuery,deleteUser };


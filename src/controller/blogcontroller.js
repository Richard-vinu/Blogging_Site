let blogModel = require("../models/blogModel");

<<<<<<< HEAD



//-------------------------------⭐Create_Blog⭐--------------------------------------------------------------------------

=======
>>>>>>> d323e468c2e954448f74f2ea3245d6ff3165b253
let createblog = async function (req, res) {
  try {
    let data = req.body;
    let { title, body, authorId, tags, category, subcategory, isPublished } =
      data;
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

<<<<<<< HEAD
//-----------------------------------⭐Get-Blogs-By_Query⭐---------------------------------------------------------------------
=======
//-------------------------------------------
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

>>>>>>> d323e468c2e954448f74f2ea3245d6ff3165b253

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

    // module.exports = {createblog,getBlogByQuery,updateBlogById,deleteUser}

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

//-------------------------------updateBlogById----------------------------------------
//By Richard

<<<<<<< HEAD
//------------------------------------⭐UpdateBlog-By-Id⭐-------------------------------------------------------------------

=======
>>>>>>> d323e468c2e954448f74f2ea3245d6ff3165b253
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
//-------------------delete by query-----------------------------------------


<<<<<<< HEAD
//--------------------------------------⭐DeleteBlog-ById⭐--------------------------------------------------------------------

const deleteUser = async function (req, res) {
=======

let DeleteWithQuery = async function (req, res) {
>>>>>>> d323e468c2e954448f74f2ea3245d6ff3165b253
  try {
    let filters = req.query
    let isPublished = req.query.isPublished


<<<<<<< HEAD
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
=======
    if (Object.keys(filters) == 0) { res.status(400).send({ msg: "no query to filter to delete" }) }
    else {
      if (isPublished == "true") { res.status(400).send({ msg: " can not delete as it is   already published" }) }
      else if (isPublished == "false" || isPublished == undefined) {

        let queryCheck = await blogModel.find(filters)
        if (queryCheck == 0) { res.status(404).send({ msg: "can not find the enteries" }) }
        else {
          let updatedData = await blogModel.find(filters).updateMany({ filters }, { isDeleted: true })
          let sendRes = await blogModel.find(filters)//.count()
          res.status(200).send({ msg: sendRes })
>>>>>>> d323e468c2e954448f74f2ea3245d6ff3165b253

        }
      }
    }
<<<<<<< HEAD
    
module.exports = { createblog, getBlogByQuery, updateBlogById,deleteByQuery,deleteUser };
=======
  } catch (error) {
    res.status(500).send({ status: false, msg: "server Error", err: err.message });
  }
}
module.exports = { createblog, getBlogByQuery, updateBlogById, DeleteWithQuery, deleteUser };
>>>>>>> d323e468c2e954448f74f2ea3245d6ff3165b253



const express = require('express')

const router = express.Router()
const {createAuthor,loginAuthor}= require('../controller/authorController.js')
const {createblog,getBlogByQuery,updateBlogById,deleteUser,DeleteWithQuery}= require("../controller/blogcontroller")



//------⭐Author_routes⭐---------//

router.post('/authors',createAuthor)
router.post("/login",loginAuthor)


//------⭐Blog_routes⭐---------//
router.post('/blogs',createblog)

router.get('/blogs',getBlogByQuery)

router.put('/blogs/:blogId',updateBlogById)

router.delete("/blogs/:blogId",deleteUser)

router.delete("/blogs",DeleteWithQuery)

module.exports = router

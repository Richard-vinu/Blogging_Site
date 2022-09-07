
const express = require('express')

const router = express.Router()
const {createAuthor,loginAuthor}= require('../controller/authorController.js')
const {createblog,getBlogByQuery,updateBlogById,deleteById,deleteByQuery}= require("../controller/blogcontroller")
const{authn,authz} = require('../middleWare/auth')

//------⭐Author_routes⭐---------//

router.post('/authors',createAuthor)
router.post("/login",loginAuthor)


//------⭐Blog_routes⭐---------//
router.post('/blogs',authn,createblog)

router.get('/blogs',authn,getBlogByQuery)

router.put('/blogs/:blogId/:auhtorId',authn,authz,updateBlogById)

router.delete("/blogs/:blogId/:auhtorId",authn,authz,deleteById)

router.delete("/blogs/:authorId",authn,authz,deleteByQuery)

module.exports = router

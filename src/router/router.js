const express = require('express')

const router = express.Router()
const {createAuthor,loginAuthor}= require('../controller/authorController.js')
const {createblog}= require("../controller/blogcontroller")


router.post('/authors',createAuthor)
router.post("/login",loginAuthor)
router.post('/createblog',createblog)
module.exports = router
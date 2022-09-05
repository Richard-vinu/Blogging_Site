const express = require('express')

const router = express.Router()
const {createAuthor,loginAuthor}= require('../controller/authorController.js')



router.post('/authors',createAuthor)
router.post("/login",loginAuthor)

module.exports = router
const express = require('express')

const router = express.Router()
const {createAuthor}= require('../controller/authorController.js')


router.post('/authors',createAuthor)

module.exports = router
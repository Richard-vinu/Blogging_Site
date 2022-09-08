const authorModel = require('../models/authorModel')
const jwt = require("jsonwebtoken")


//-----------------------------------------⭐Create-Author⭐-------------------------------------------------------------------------------

const createAuthor = async (req, res) => {

    try {

        let result = req.body
        let { fname, lname, title, email, password } = result
        if (!fname) { res.status(400).send({ msg: "fname is mandatory" }) }
        if (!lname) { res.status(400).send({ msg: "lname is mandatory" }) }
        if (!title) { res.status(400).send({ msg: "title is mandatory" }) }
        if (!email) { res.status(400).send({ msg: "email is mandatory" }) }
        if (!password) { res.status(400).send({ msg: "password is mandatory" }) }

        //*To check Email Exist or not

        let emailID = await authorModel.findOne({ email })
        if (emailID) return res.status(400).send({ msg: "Account already Present with this EmailID" })


        //*Email format Validation

        const validate = function (v) { return /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(v) }
        if (!validate(email)) return res.status(400).send({ status: false, msg: "email is not valid" })

        const data = await authorModel.create(result)

        res.status(201).send({ data: data })

    } catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }
} 


//--------------------------------------⭐Login-Author⭐-------------------------------------------------------------------

const loginAuthor = async (req, res) => {
    
    try { 
        
        let data = req.body
        let { email, password } = data
        if (!email) { res.status(400).send({ msg: "email id is mandatory" }) }
        if (!password) { res.status(400).send({ msg: "password is mandatory" }) }
        let authorCheck = await authorModel.findOne({ email: email, password: password })
        if (!authorCheck) { return res.status(401).send("Incorrect email or password.") }


        let payload = {
            authorId: authorCheck._id.toString(),
            platform: "education"
        }

        let token = jwt.sign(payload,"Blogging site Mini Project")
        res.status(200).send({ status: true, data:{"token":token}})
    }
    catch (err) {
        res.status(500).send({ msg: err.message })

    }
}


module.exports = { createAuthor,loginAuthor }

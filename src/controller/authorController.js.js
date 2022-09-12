const authorModel = require('../models/authorModel')
const jwt = require("jsonwebtoken")
const validEmail = require('email-validator')


//-------------------------------⭐Create-Author⭐-------------------------------------------------------------------------------

const createAuthor = async (req, res) => {

    try {

        let result = req.body
        let { fname, lname, title, email, password } = result
        
        if(Object.keys(result).length == 0) return res.status(400).send({ status: false, msg: "data is required in the body" });
        if(!fname) 
        return res.status(400).send({ msg: "fname is mandatory" })
        if(!lname)  
        return res.status(400).send({ msg: "lname is mandatory" }) 
        if(!title) 
        return res.status(400).send({ msg: "title is mandatory" }) 
        if(!email) 
        return res.status(400).send({ msg: "email is mandatory" }) 
        if (!password)
        return res.status(400).send({ msg: "password is mandatory" })


      //emumTitle
        let emumTitle = ['Mr', 'Mrs', 'Miss'];
        if(!emumTitle.includes(title)) return res.status(400).send({ status: false, msg: "Title should be of Mr,or Mrs, or Miss" });

        //valid-Email
        if(!validEmail.validate(email)) return res.status(400).send({ status: false, msg: "Enter a valid email" })

        let uniquePassword =/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/

        if ( uniquePassword.test(password)) {
            return  res.status(400).send({ status: false, message: `password should contain atleastone number or one alphabet and should be 9 character long` });
          }
  
        //unique-Email
        let emailId = await authorModel.findOne({ email:email })
        if (emailId) return res.status(400).send({ msg: "This emailId is already registered please SignIn" })
        const data = await authorModel.create(result)

        return res.status(201).send({ status:true,data: data })

    } catch (err) {
        return res.status(500).send({ status: false, error: err.message })
    }
} 


//--------------------------------------⭐Login-Author⭐-------------------------------------------------------------------

const loginAuthor = async (req, res) => {
    
    try { 
        
    let data = req.body
    let { email, password } = data

    if(!email) 
    return res.status(400).send({ msg: "email id is mandatory" })

    if(!password)
    return res.status(400).send({ msg: "password is mandatory" }) 

    let authorCheck = await authorModel.findOne({ email: email, password: password })
    if(!authorCheck)
    return res.status(401).send("Incorrect email or password.") 


        let payload = {
            authorId: authorCheck._id.toString(),
            platform: "education"
        }

        let token = jwt.sign(payload,"Blogging site Mini Project")
       return res.status(200).send({ status: true, data:{"token":token}})
    }
    catch (err) {
        return res.status(500).send({ msg: err.message })

    }
}


module.exports = { createAuthor,loginAuthor }

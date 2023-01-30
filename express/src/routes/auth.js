const express = require('express')
const router = express.Router()
require('../db')
const Users = require("../models/User")
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const fetchUser = require('../middleware/FetchUser')
const jwtkey = "Gaggiiswebdeveloper";

//Creating a new User
router.post('/createuser', [
    body('email', 'Please Enter a valid Email').isEmail(),
    body('password', 'Password must Contain uppercase ,lowercase ,number and a symbol').isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    }),
    body('name', "Please enter Name").isLength({ min: 1 })
], async (req, res) => {
    try {
        let success = false
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //To check if email already exists
        let verifyEmail = await Users.findOne({ email: req.body.email });
        if (verifyEmail) {
            return res.status(400).send("Email already exists")
        }
        //To hash password
        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(req.body.password, salt)
        //Requesting Body
        let user = await new Users({
            name: req.body.name,
            password: secPass,
            email: req.body.email
        })
        //Getting id of the user
        let data = {
            user: {
                id: user.id
            }
        }
        // creating the jwt token with the above id
        await user.save()
        const token = jwt.sign(data, jwtkey)
        success = true
        res.json({user , success})
        console.log(token)
    }
    catch (error) {
        res.send({ error: req.body.email + ' already exists' })
    }
})

//Logging in User

router.post('/userlogin', [
    body('email', "email cannot be empty").isLength({ min: 1 }),
    body('password', "password cannot be empty").isLength({ min: 1 })
], async (req, res) => {
    let success = false ;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const loginUser = await new Users({
            email: req.body.email,
            password: req.body.password,
        })
        console.log(req.body.email)
        let existUser = await Users.findOne({ email: req.body.email })
        if (!existUser) {
            return res.status(400).json({ errors: "incorrect login details" })
        }
        const verifyPass = await bcrypt.compare(req.body.password, existUser.password)
        if (!verifyPass) {
            return res.status(400).json({ errors: "incorrect login details" })
        } else {
            console.log("password verified")
        }
        const data = {
            existUser: {
                id: existUser.id
            }
        }
        const authToken = jwt.sign(data, jwtkey)
        success = true;
        await res.json({ authToken, success })

    }
    catch (error) {
        res.send(error)
    }

})
//Logging in User with verification using jwt middleware
router.post('/getuser' , fetchUser , async (req , res)=> {
    try{
        const userId = req.existUser.id
        const user = await Users.findById(userId).select("-password") 
        res.json(user)
    }
    catch(error){
        res.send(error)
        console.log(error)
    }
})
      


module.exports = router
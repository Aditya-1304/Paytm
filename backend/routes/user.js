const express = require('express');
const zod = require('zod');
const jwt = require('jwt');
const { User } = require('../db');
const JWT_SECRET = require('../config');
const router = express.Router();

const signupSchema = zod.object({
    username : zod.string().email(),
    password : zod.string().min(8).max(20),
    firstName : zod.string(),
    lastName : zod.string(),

})

router.post("/signup", async (req,res)=> {
    const body = req.body;
    const {success} = signupSchema.safeParse(req.body);
    if(!success) {
        return res.json({
            message :  "Email already taken / Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        username : body.username
    })

    if(existingUser) {
        return res.json({
            message :  "Email already taken / Incorrect inputs"
        })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })

    const userId = user._id;

    const token = jwt.sign({
        userId
    },JWT_SECRET);

    res.json({
        message : "User created successfully",
        token : token,
    })
})


const 

module.exports = router;
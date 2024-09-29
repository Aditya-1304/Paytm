const express = require('express');
const zod = require('zod');
const jwt = require('jsonwebtoken');
const { User,Account } = require('../db');
const JWT_SECRET = require('../config');
const router = express.Router();

const signupSchema = zod.object({
    username : zod.string(),
    password : zod.string(),
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

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })

    const token = jwt.sign({
        userId
    },JWT_SECRET);

    res.json({
        message : "User created successfully",
        token : token,
    })
})


const siginSchema = zod.object({
    username : zod.string(),
    password : zod.string()
})

router.post("/signin", async (req,res)=> {
    const {success} = siginSchema.safeParse(req.body)
    if(!success){
        return res.json({
            message : "Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username : req.body.username,
        password : req.body.password
    })

    if(user) {
        const token = jwt.sign({
            userId : user._id,
        },JWT_SECRET)

        res.json({
            token:token
        })
        return;
    }


})

const {authMiddleware} = require("../middleware");

const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
})

router.put("/", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Error while updating information",
        });
    }

    // Use the filter for the user ID and update the fields
    await User.updateOne({ _id: req.userId }, req.body);

    res.json({
        message: "Updated successfully",
    });
});


router.get("/bulk",async (req,res)=>{
    const filter = req.query.filter || "";

    const users = await User.find({
        $or:[{
            firstName :{
                "$regex" :filter
            }
        },{
            lastName :{
                "$regex" : filter
            }
        }]
    })

    res.json({
        user : users.map(user => ({
            username : user.username,
            firstName : user.firstName,
            lastName : user.lastName,
            _id : user._id

        }))
    })
})
module.exports = router;
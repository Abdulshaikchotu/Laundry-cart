const express = require('express');
const Data = require('../Data_model/user_data');
const jwt = require('jsonwebtoken');

let reg_log_app = express.Router();
reg_log_app.post('/register', async (req, res) => {
    try {
        console.log(req.body)
        const { name, email, phone, state, district, address, pincode, password } = req.body;
        const useremail = await Data.findOne({ email });
        const user_mobile = await Data.findOne({ phone });
        if (useremail) {
            return res.status(400).json({
                status: "Failed",
                massage: "User Already exists with given email "
            })
        } else if(user_mobile){
            return res.status(400).json({
                status: "Failed",
                massage: "User Already exists with given phone number "
            })
        } 


        await Data.create(req.body, function (err, resolve) {
            if (err) { console.log(err) }
            else {
                res.status(200).json({
                    status: "Success",
                    massage: "User succesfully register"
                })
            }
        });


    }
    catch (e) {
        res.json({
            status: "Failed Catch",
            massage: e.massage
        })
    }


});
   
//login route
reg_log_app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Data.findOne({ email });

        if (!user) {
            return res.status(400).json({
                status: "Failed",
                message: "No one registered user with this email."
            });
        }

        // Check the password here
        if (user.password !== password) {
            return res.status(400).json({
                status: "Failed",
                message: "Incorrect password."
            });
        }

        // If the password is correct, generate a JWT token
        const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            data: user._id
        }, 'Abdul');

        return res.json({
            status: "success",
            message: "Login successful",
            token
        });
    } catch (e) {
        res.status(500).json({
            status: "Failed Catch",
            message: e.message
        });
    }
});


module.exports = reg_log_app;

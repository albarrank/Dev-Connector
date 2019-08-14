const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');


// @route   GET api/auth
// @desc    Retrieve User info after user has been authentiticated
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// @route   POST api/auth
// @desc    Authenticate user & get token for login
// @access  Public
router.post('/', [

    // Checks 'name' field and sends custom message 'Name is required' if empty
    check('email', "Please include a valid email")
        .isEmail(),
    check('password', "Password is required")
        .exists()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } 

        const {email, password} = req.body;
        
        try {
            let user = await User.findOne({ email: email });

            if (!user) {
                return res.status(400).json(({ erors: [ {msg: "Invalid Credentials"} ] }));
            }    

            // comparing plain text password to hashed password
            const isMatch = await bcrypt.compare(password, user.password);
            
            if (!isMatch) {
                return res.status(400).json(({ erors: [ {msg: "Invalid Credentials"} ] }));
            }

            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(
                payload,
                config.get("jwtSecret"),
                { expiresIn: 36000 },
                (err, token)=>{
                    if (err) {
                        throw err
                    };
                    res.json({ token })
                }
            );
            
        } catch(err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }

    }   
);

module.exports = router;
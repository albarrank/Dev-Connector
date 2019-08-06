const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// Used to validate values being sent from users
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');


// @route   Post api/users
// @desc    Register user
// @access  Public
router.post('/', [

    // Checks 'name' field and sends custom message 'Name is required' if empty
    check('name', "Name is required")
        .not()
        .isEmpty(),
    check('email', "Please include a valid email")
        .isEmail(),
    check('password', "Please enter a password with 7 or more characters")
        .isLength({min: 7})
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } 

        const {name, email, password} = req.body;
        
        try {
            let user = await User.findOne({ email: email });

            if (user) {
                return res.status(400).json(({ erors: [ {msg: "User already exists"} ] }));
            }    

            const avatar = gravatar.url(email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            })

            user = new User ({
                name, 
                email,
                avatar,
                password
            });

            // anything that return a promise you wanna make sure you put 'await' in front of it
            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt)

            await user.save()
            
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
                        throw err}
                    ;
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
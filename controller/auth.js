const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require("../models/user");


exports.signUp = async (req, res, next) => {

    try {
        
        let email = req.body.email;
        let password = req.body.password;
        let name = req.body.name;

        let hashedPassword = await bcrypt.hash(password, 12)

        let user = new User({
            email: email,
            name: name,
            password: hashedPassword,
        })

        let createdUser = await user.save()

        res.status(201).json({
            message: "User is created Successfully!",
            data: createdUser
        })

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error);
    }

}

exports.login = async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        let loadedUser = await User.findOne({ email: email })
        if (!loadedUser) {
            const error = new Error("USer Not Found");
            error.statusCode = 404;
            throw error
        }

        let isEqual = await bcrypt.compare(password, loadedUser.password)

        if (!isEqual) {
            const error = new Error("Wrong Password!");
            error.statusCode = 401;
            throw error
        }

        // create JWT token
        const token = jwt.sign(
            {
                email: loadedUser.email,
                name: loadedUser.name,
                userId: loadedUser._id.toString()
            },
            'superscreate123string',
            {
                expiresIn: '1h'
            }
        );

        res.status(200).json({ token: token, userId: loadedUser._id.toString() })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    }
    
}
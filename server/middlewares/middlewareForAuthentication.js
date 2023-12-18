const { mongoose } = require('../configrations/database')
const jwt = require('jsonwebtoken');
const { SchemaForUsers } = require('../models/SigninModels')

// function for check whether user with same email and username is exist or not 
const isValidUser = async (req, res, next) => {
    const db = mongoose.connection.useDb('users');
    const Model = db.model('Users', SchemaForUsers, 'users-set');

    try {
        let user = await Model.findOne({ email: req.body.email });
        if (user !== null) {
            res.status(401).json({
                status: false,
                verified: false,
                token: false,
                message: 'This Email is already in use'
            })
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({
            status: false,
            verified: false,
            token: false,
            message: error.message
        })
    }
}

const isTokenValid = (req, res, next) => {
    console.log("headers", req.cookies['access_token']);
    let token = req.cookies['access_token'];
    if (token) {
        try {
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    res.json({
                        authorization: false,
                        message: err.message
                    })
                } else {
                    req.headers['Access-id'] = decoded.uid
                    next();
                }
            });
        } catch (error) {
            res.status(404).send(error.message);
        }
    } else {
        res.json({
            authorization: false,
            message: 'You Need to Login Fisrt'
        });
    }

}

// method for authenticate session token whethere it is valid or not 
const isAutorized = (req, res, next) => {
    let token = req.cookies['access_token'];
    if (token) {
        try {
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    res.status(401).json({
                        authorized: false,
                        message: 'You Need to Login/SignIn'
                    })
                } else {
                    req.headers['Access-id'] = decoded.uid;
                    res.locals.uid =  decoded.uid
                    next();
                }
            })
        } catch (error) {
            res.status(401).json({
                authorized: false,
                message: error.message
            })
        }
    }else{
        res.status(402).json({
            authorized: false,
            message: 'You are not authorized'
        })
    }
}   


module.exports = { isValidUser, isTokenValid, isAutorized }




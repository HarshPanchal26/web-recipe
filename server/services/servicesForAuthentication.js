const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { mongoose } = require('../configrations/database');
const {SchemaForUsers } = require('../models/SigninModels');

const createUser = (objForData, objForSignIn) => {
    const responceObj = {
        status: false,
        token: null,
        message: ''
    }

    return new Promise(async (resolve, reject) => {
        const db = mongoose.connection.useDb('users');
        const Model = db.model('Users', SchemaForUsers, 'users');
        try {
            const res = await Model.create(objForSignIn);
            responceObj.status = true
            const token = await createSession({ uid: res._id})
            responceObj.token = token
            resolve(responceObj)
        } catch (error) {
            reject({
                ...responceObj,
                message: error.message
            })
        }
    })
}

const encryptedPassword = (value) => {
    const saltRounds = 10;
    return new Promise(async (resolve, reject) => {
        try {
            const salt = await bcrypt.genSalt(saltRounds);
            console.log("salt", salt)
            const hashedPassword = await bcrypt.hash(value, `$2b$10$.Ndp7FhVhm1.wo0aiRLPpO`);
            resolve(hashedPassword);
        } catch (error) {
            reject(error.message)
        }

    })
}

const createSession = (obj) => {
    return new Promise((resolve, rejects) => {
        try {
            const token = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
            resolve(token)
        } catch (error) {
            rejects(error.message)
        }
    })
}

module.exports = {createUser, createSession, encryptedPassword};



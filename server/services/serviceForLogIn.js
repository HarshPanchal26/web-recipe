const {mongoose} = require('../configrations/database');
const { SchemaForUsers } = require('../models/SigninModels');
const {encryptedPassword, createSession} = require('./servicesForAuthentication')

// Method for login .

const checkUserCredential = (Obj)=>{
    return new Promise(async(resolve , reject)=>{
        try {
            const db = mongoose.connection.useDb('users')
            const Modle = db.model('user', SchemaForUsers, 'users-set');
            const user = await Modle.findOne({email: Obj.email });
            if(user){
                 let hashedPassword = await encryptedPassword(Obj.password);
                 if(user._doc.password === hashedPassword && Obj.email === user._doc.email){
                    const session_token = await createSession({uid: user._doc._id});
                    resolve({
                       token : session_token,
                       uid: user._doc._id
                    })
                 }else{
                    reject('Your Email or Password might not correct')
                 }  
            }else{
                reject('Your Email or Password might not correct')
            }
        } catch (error) {
            console.log("Error is " , error)
            reject(error)
        }
    })
}

module.exports = {checkUserCredential}
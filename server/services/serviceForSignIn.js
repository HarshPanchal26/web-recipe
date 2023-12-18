const { mongoose } = require('../configrations/database')
const { SchemaForUsers } = require('../models/SigninModels')
const { SchemaForProfile } = require('../models/ProfileModel')   
const { createSession } = require('./servicesForAuthentication')
const { createProfileForUser } = require('./serviceForProfile')

const createUser = (object) => {
    return new Promise(async (resolve, reject) => {
        let objForSignIn = {
            firstName: object.fname,
            lastName: object.lname,
            email: object.email,
            password: object.password
        }
        try {
            const db = mongoose.connection.useDb('users')
            const Model = db.model('user', SchemaForUsers, 'users-set');
            
            const res = await Model.create(objForSignIn);
            const profile = await createProfileForUser(res._id);
            const token = await createSession({ uid: res._id });
            resolve({
                uid: res._id,
                puid : profile._id,
                token: token
            })
        } catch (error) {
            reject(error)
        }
    })
}


// const createProfileForUser = (rid)=>{
//     return new Promise(async(resolve , reject)=>{
//         try {
//             const db = mongoose.connection.useDb('profiles')
//             const Model = db.model('activities', SchemaForProfile, 'activities'); 
//             const res = await Model.create({rid : rid});
//             resolve(res);
//         } catch (error) {
//             reject(error)   
//         }
//     })
// }

module.exports = { createUser }
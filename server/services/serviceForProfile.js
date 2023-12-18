const {mongoose} = require('../configrations/database');
const { SchemaForProfile } = require('../models/ProfileModel');
const { SchemaForUsers } = require('../models/SigninModels');

const fetchCommanUserData = (rid)=>{
    return new Promise(async(resolve , reject)=>{
        try {
            const db = mongoose.connection.useDb('users')
            const Modle = db.model('user', SchemaForUsers, 'users-set');
            const user = await Modle.findOne({ _id : rid});
            resolve(user)
        } catch (error) {
            reject()            
        }
    })
}

const fetchProfile = (rid)=>{
    return new Promise(async(resolve ,reject)=>{
         try {
            const db = mongoose.connection.useDb('profiles');
            const Model = db.model('activity', SchemaForProfile,'activities');
            const res = await Model.findOne({rid : rid});
            resolve(res)
         } catch (error) {
            reject(error)
         }  
    })      
}

const createProfileForUser = (rid)=>{
    return new Promise(async(resolve , reject)=>{
        try {
            const db = mongoose.connection.useDb('profiles')
            const Model = db.model('activities', SchemaForProfile, 'activities'); 
            const res = await Model.create({rid : rid});
            resolve(res);
        } catch (error) {
            reject(error)   
        }
    })
}


module.exports = {fetchProfile , createProfileForUser ,fetchCommanUserData}
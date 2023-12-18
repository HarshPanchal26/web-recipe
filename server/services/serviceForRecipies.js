const axios = require('axios')
const { mongoose } = require('../configrations/database')
const { SchemaForProfile } = require('../models/ProfileModel')

const fetchAllRecipies = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await axios.get('https://api.spoonacular.com/recipes/complexSearch?number=50&apiKey=d33f8b134bf14555b59236e0902a4d1f')
            resolve(result.data)
        } catch (error) {
            reject(error)
        }
    })
}

const fetchQueryRecipies = (query) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=50&apiKey=d33f8b134bf14555b59236e0902a4d1f`)
            resolve(result.data)
        } catch (error) {
            reject(error)
        }
    })
}


const fetchDetailRecipies = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=d33f8b134bf14555b59236e0902a4d1f`)
            resolve(result)
        } catch (error) {
            reject(error)
        }

    })
}

const fetchDetailMultipleRecipies = (ArrayOfId) => {
    return new Promise(async (resolve, reject) => {
        let ids = ArrayOfId.join(',');
        try {
            const result = await axios.get(`https://api.spoonacular.com/recipes/informationBulk?ids=${ids}&apiKey=d33f8b134bf14555b59236e0902a4d1f`)
            resolve(result)
        } catch (error) {
            reject(error)
        }

    })
}

const saveRecipies = (recipi_id, rid) => {
    return new Promise(async (resolve, reject) => {
        try {
            const db = mongoose.connection.useDb('profiles')
            const Model = db.model('activities', SchemaForProfile, 'activities');
            const res = Model.updateOne({ rid: rid }, {
                $push: {
                    savedRecipies: recipi_id
                }
            })
            resolve(res);
        } catch (error) {
            reject(error)
        }
    })
}

const removeRecipiesFromList = (recipi_id, rid) => {
    return new Promise(async (resolve, reject) => {
        try {
            const db = mongoose.connection.useDb('profiles')
            const Model = db.model('activities', SchemaForProfile, 'activities');
            const res = Model.updateOne({ rid: rid }, {
                $pull: {
                    savedRecipies: recipi_id
                }
            })
            resolve(res);
        } catch (error) {
            reject(error)
        }
    })
}


module.exports = { saveRecipies, fetchAllRecipies, fetchDetailRecipies, fetchQueryRecipies  , removeRecipiesFromList ,fetchDetailMultipleRecipies}
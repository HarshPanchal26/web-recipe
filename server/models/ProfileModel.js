const mongoose = require('mongoose')

const SchemaForProfile = new mongoose.Schema({
    rid : {
        type: String,
        required: true,        
    },
    createdRecipies: {
        type: Array,
        required: false,
        default : []
    },
    savedRecipies: {
        type: Array,
        required: false,
        default : []
    },
    likedRecipies: {
        type: Array,
        required: false,
        default : [],
    },
    follower: {
        type: Number,
        required: false,
        default: 0
    },
    followings: {
        type: Number,
        required: false,
        default: 0
    }
})


module.exports = {
    SchemaForProfile
}
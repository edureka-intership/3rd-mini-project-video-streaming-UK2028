const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    ratings:{
        type:String,
        required:true
    },
    small_banner:{
        type:String,
        required:true
    },
    path:{
        type:String,
        required:true
    },
    synopsis:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('video',videoSchema,'videoAPI');
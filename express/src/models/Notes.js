const mongoose = require('mongoose')

const NotesSchema = new mongoose.Schema({
    // we are adding a user to associate note a user that is linking user to our notes schema
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
    },
    title: {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    date : {
        type : Date,
        default : Date.now
    }
}) 
module.exports = mongoose.model("notes" , NotesSchema)
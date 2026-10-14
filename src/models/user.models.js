const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "Account already exits"], 
        required: true,
    },

    email: {
            type: String,
         unique: [true, "Account already exits with this email "], 
         required: true,
      },

    password:{
        type: String,
        required: true
    }
    })

const userModel = mongoose.models("user", userSchema)

module.export = userModel
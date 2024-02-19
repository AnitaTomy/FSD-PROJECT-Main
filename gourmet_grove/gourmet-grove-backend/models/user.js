// Installations
const mongoose=require('mongoose');

// Schema definition
const userSchema=new mongoose.Schema({
    username:{type:String,required:true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique:true},
})

// Defining the schema, with first parameter as name of collection and then the name of schema
const User = mongoose.model('User', userSchema);

// Exporting this model
module.exports = User;
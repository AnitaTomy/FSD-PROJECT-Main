const mongoose=require('mongoose');
const recipeSchema=new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title:{type:String,required:true},
    description:{type:String,required:true},
    ingredients:{type:[String],required:true},
    steps: { type: [String], required: true },
    image: { type: String },
    category: { type: String, required: true }, // veg or non veg
    course: { type: String, required: true } // which course
});


const Recipe=mongoose.model('Recipe',recipeSchema);

module.exports=Recipe;
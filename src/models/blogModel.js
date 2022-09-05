const mongoose = require("mongoose");
 const ObjectID= mongoose.Schema.Types.ObjectID


const blogSchema = new mongoose.Schema(



{ 
    title:{
    type: String,
    required:true,

}, 
body: {
    type :String,
    required:true,

}, 
authorId: {
    type:ObjectID,
     ref:"author",
     required:true,
    }, 
    tags:{
        type:[{type:String}]
    

        
    },
    category: {
        type:String,
        required:true,
    },


 subcategory:{
    type:[{type:String}]
    
 },
 isDeleted: {
   type: boolean,
    default: false
}, 
isPublished: {
    type: boolean, 
    default: false
},
},
{timestamps:true}
);
module.export=mongoose.model("Blog",blogSchema)


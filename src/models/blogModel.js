<<<<<<< HEAD
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

=======
//{ title: {mandatory}, body: {mandatory}, authorId: {mandatory, refs to author model}, tags: {array of string}, category: {string, mandatory, examples: [technology, entertainment, life style, food, fashion]}, subcategory: {array of string, examples[technology-[web development, mobile development, AI, ML etc]] }, createdAt, updatedAt, deletedAt: {when the document is deleted}, isDeleted: {boolean, default: false}, publishedAt: {when the blog is published}, isPublished: {boolean, default: false}}
>>>>>>> 0483b4e174e26c65f4d5ed8cab0cd72bd2de9000

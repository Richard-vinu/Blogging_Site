const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId

//-----------------------------⭐Blog-Model⭐-----------------------------------------------------------------------

const blogSchema = new mongoose.Schema(

    {
        title: {
            type: String,
            required: true,
            trim: true
        }, 
        body: {
            type: String,
            required: true,
            trim: true
        }, 
        authorId: {
            type:ObjectId,
            ref:"author",
            required: true,
            trim: true
            }, 
        tags: {
            type: [{type: String}],
             trim: true
        }, 
        category: {
            type:String, 
            required: true,
            trim: true 
        }, 
        subcategory: [{
            type: String
        }], 
       
        isDeleted: {
            default:false,
            type:Boolean,
            trim: true
        },
        deletedAt: {
            type: Date,
            default: null,
        }, 
        isPublished: {
            default:false,
            type:Boolean,
            
        },
        publishedAt: {
            type: Date,
            default: null,
        },
} ,{timestamps:true})

module.exports = mongoose.model("Blog", blogSchema)


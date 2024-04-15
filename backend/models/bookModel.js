import mongoose from "mongoose"

const bookSchema=mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    author:{
        type:String,
        required:true,
    },
    publishYear:{
        type:Number,
        required:true,
    },
},
{
    timestamps:true
}
)

export const Book=mongoose.model("Cat",bookSchema) //Book is the model, Cat means the collection, instance of model is the document inside collection
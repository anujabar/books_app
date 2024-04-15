import express from "express"
import {PORT,mongoDBURL} from "./config.js"
import mongoose from "mongoose"
import {Book} from "./models/bookModel.js"
import bodyParser from "body-parser"
import bookRoute from "./routes/bookRoute.js"
import cors from "cors"

const app=express()
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
//app.use("/book",bookRoute) //tells express to use the bookRoute middleware for routes ending in /book
app.use(cors())

// app.use(cors({
//     origin:"http://localhost:4000",
//     methods:["GET","POST","PUT","DELETE"],
//     allowedHeaders:["Content-type"]
// }))

app.get("/",(req,res)=>{
    res.status(234).send("Hello")
})

//Save a book
app.post("/books",async (req,res)=>{
    try{
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send({message:"All fields must be filled"})
        }
        const newBook={
            title:req.body.title,
            author:req.body.author,
            publishYear:req.body.publishYear
        }
        const book=await Book.create(newBook)
        return res.status(201).send(book)
    }
    catch(error){
        console.log(error.message)
        res.status(500).send({message:error.message})
    }
})

//Get all books
app.get("/books",async (req,res)=>{
    try{
        const books=await Book.find({}) //Book is the model
        res.status(200).json({ // sends JSON data
            count:books.length,
            data:books
        })
    }
    catch(error){
        console.log(error.message)
        res.status(500).send({message:error.message})
    }
})
//Get book by id
app.get("/books/:id",async (req,res)=>{
    try{
        const id=req.params.id
        const book=await Book.findById(id)
        res.status(200).json(book)
    }
    catch(error){
        console.log(error.message)
        res.status(500).send({message:error.message})
    }
})

//Update a book
app.put("/books/:id",async (req,res)=>{ //:something means path parameter, we use params for path parameters
    try{
        const id=req.params.id
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send({message:"All fields are required"})
        }
        const result=await Book.findByIdAndUpdate(id,req.body)
        if(!result){
            return res.status(404).send({message:"Book not found"})
        }
        res.status(201).send({message:"Book updated successfully"})
    }
    catch(error){
        console.log(error.message)
        res.status(500).send({message:error.message})
    }
})

//Delete a book
app.delete("/:id",async (req,res)=>{
    try{
        const id=req.params.id
        const result=await Book.findByIdAndDelete(id)
        if(!result){
            return res.status(404).send({message:"Book not found"})
        }
        res.status(201).send({message:"Book deleted successfully"})
    }
    catch(error){
        console.log(error.message)
        res.status(500).send({message:error.message})
    }
})

mongoose
.connect(mongoDBURL)
.then(()=>{
    console.log("Database connected")
    app.listen(PORT,()=>{
        console.log("Server Started on Port 3000")
    })
})
.catch((error)=>{
    console.log(error)
})
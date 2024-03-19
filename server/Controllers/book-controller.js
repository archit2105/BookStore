const {Book}=require('../db')


const createBook=async(req,res)=>{
    let existingBook= await Book.findOne({isbn:req.body.isbn})

    if(existingBook!==null){
        return res.status(200).send({message: "Book already existed"})
    }
    const newBook =await Book.create(req.body);
    res.status(201).send({ message: "Book created", payload:newBook });
}

const getAllBooks=async(req,res)=>{
    let bookList=await Book.find();
    res.status(200).send({ message: "Get BookList", payload:bookList});
}

const getBookByIsbn=async(req,res)=>{
    let isbn=req.params.isbn;
    let book=await Book.findOne({isbn: isbn});
    res.status(200).send({message:"Got Isbn", payload:book})

}
const deleteBook=async(req,res)=>{
    let deletedBook=await Book.findOneAndDelete({isbn:req.params.isbn})
    if(!deletedBook){
        res.status(404).send({message:"book not found"})
    }
    res.status(200).send({message:"book deleted"})
    
}
module.exports={
    createBook,
    getAllBooks,
    getBookByIsbn,
    deleteBook
}
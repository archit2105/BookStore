const exp=require('express');
//creating bookApp router
const bookApp=exp.Router();
const verifyToken=require('../Middlewares/verifyToken')

//get express-async-handler to handel async error
const expressAsyncHandler=require('express-async-handler')

const {createBook, getAllBooks, getBookByIsbn, deleteBook}=require('../Controllers/book-controller')

//to create new books
bookApp.post('/book',verifyToken,expressAsyncHandler(createBook))
//to get all books
bookApp.get('/books',expressAsyncHandler(getAllBooks))
//to get specific book as per isbn
bookApp.get('/book/:isbn',expressAsyncHandler(getBookByIsbn))
// delete a particular book
bookApp.delete('/book/:isbn',verifyToken,expressAsyncHandler(deleteBook))


module.exports=bookApp;
import { catchAsyncErrors } from "../middlewares/CatchAsyncError.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { Book } from "../models/bookSchema.js";

export const addNewBook  = catchAsyncErrors(async (req,res,next)=>{
    const{
        title,
        author,
        isbn,
        publishedDate,
        genre,
        copiesAvailable,
        description,
    } = req.body;

    if(!author || !isbn || !title || !publishedDate ||!genre || !copiesAvailable || !description){
        return next(ErrorHandler("Please enter all details",400));
    }
    let book =await User.findOne({isbn});
    if(book){
        return next(new ErrorHandler("Book already exists",400));
    }
    book = await Book.create({
        title,
        author,
        isbn,
        publishedDate,
        genre,
        copiesAvailable,
        description,
    })
    res.status(200).json({
        success: true,
        message: "Book Added successfully"
    });
})

export const getAllBooks = catchAsyncErrors(async (req,res,err)=>{
    const books = await Book.find();
    res.status(200).json({
        success: true,
        books
    });
})

export const deleteBookById = catchAsyncErrors(async (req,res,next)=>{
    const book = await Book.findByIdAndDelete(req.body.isbn);
    if(!book){
        return next(new ErrorHandler("Book not found",404));
    }
    res.status(200).json({
        success: true,
        message: "Book deleted successfully"
    });
})
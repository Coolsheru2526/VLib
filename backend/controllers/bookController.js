import { catchAsyncErrors } from "../middlewares/CatchAsyncError.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { Book } from "../models/bookSchema.js";

// Add New Book
export const addNewBook = catchAsyncErrors(async (req, res, next) => {
    const {
        title,
        author,
        isbn,
        publishedDate,
        genre,
        copiesAvailable,
        description,
    } = req.body;

    if (!author || !isbn || !title || !publishedDate || !genre || !copiesAvailable || !description) {
        return next(new ErrorHandler("Please enter all details", 400));
    }

    let book = await Book.findOne({ isbn });
    if (book) {
        return next(new ErrorHandler("Book already exists", 400));
    }

    await Book.create({
        title,
        author,
        isbn,
        publishedDate,
        genre,
        copiesAvailable,
        description,
    });
    
    res.status(200).json({
        success: true,
        message: "Book added successfully",
    });
});

// Get All Books
export const getAllBooks = catchAsyncErrors(async (req, res, next) => {
    const books = await Book.find();
    return res.status(200).json({
        success: true,
        books,
    });
});

// Delete Book By ID
export const deleteBookById = catchAsyncErrors(async (req, res, next) => {
    const { isbn } = req.body; // Assuming ISBN is used as the identifier
    const book = await Book.findOneAndDelete({ isbn });

    if (!book) {
        return next(new ErrorHandler("Book not found", 404));
    }

    return res.status(200).json({
        success: true,
        message: "Book deleted successfully",
    });
});

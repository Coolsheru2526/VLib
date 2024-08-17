import express from 'express';
import { isAdminAuthenticated } from '../middlewares/authMiddleware.js';
import { addNewBook, deleteBookById, getAllBooks } from '../controllers/bookController.js';
const router = express.Router();


router.post('/addBook',isAdminAuthenticated,addNewBook);
router.get('/getBooks',getAllBooks);
router.delete('/deleteBook',isAdminAuthenticated,deleteBookById);


export default router; 

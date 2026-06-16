const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Global middleware to parse incoming JSON request payloads
app.use(express.json());

// =========================================================================
// a) Express server setup & local MongoDB connection (8 marks)
// =========================================================================
const MONGO_URI = 'mongodb://127.0.0.1:27017/Bookstore';

mongoose.connect(MONGO_URI)
    .then(() => console.log('Successfully connected to local MongoDB via Mongoose.'))
    .catch((err) => console.error('MongoDB connection error:', err));

// =========================================================================
// b) Define Mongoose Schema & Model with required constraints (8 marks)
// =========================================================================
const bookSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: [true, 'Title is required'] 
    },
    author: { 
        type: String, 
        required: [true, 'Author is required'] 
    },
    price: { 
        type: Number, 
        required: [true, 'Price is required'] 
    }
});

const Book = mongoose.model('Book', bookSchema);

// =========================================================================
// c) POST /api/books: Validate, create, and return a new book (8 marks)
// =========================================================================
app.post('/api/books', async (req, res) => {
    try {
        const { title, author, price } = req.body;
        
        const newBook = new Book({ title, author, price });
        const savedBook = await newBook.save();
        
        res.status(201).json(savedBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// =========================================================================
// d) GET /api/books: Fetch all records or target one by database ID (8 marks)
// =========================================================================

// Retrieve all book documents
app.get('/api/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Retrieve a single book document matching the :id parameter
app.get('/api/books/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// =========================================================================
// e) PUT & DELETE: Modify or remove resource with 404 guard checks (8 marks)
// =========================================================================

// Update document fields; validation options enforce model rule integrity
app.put('/api/books/:id', async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );
        
        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete document from collection by its ID
app.delete('/api/books/:id', async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        
        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({ message: 'Book deleted successfully', deletedBook });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Initialize and bind application server to port 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
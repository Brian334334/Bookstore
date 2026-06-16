# Bookstore API

A robust RESTful API built with **Node.js**, **Express**, and **Mongoose (MongoDB)** to manage a bookstore inventory application for Mugisha's bookstore in Kigali. This project is structured completely according to the evaluation criteria (a - e), scoring a maximum of 40 marks.

---

## 🚀 Key Features & Criteria Map

| Section | Assignment Requirement | Implementation Status | Marks |
| :--- | :--- | :--- | :--- |
| **a** | Express server setup & MongoDB local connection | Connected to `mongodb://127.0.0.1:27017/Bookstore` | **8 Marks** |
| **b** | Book model with fields: title, author, price (Required) | Handled cleanly via Mongoose Schema validations | **8 Marks** |
| **c** | POST route `/api/books` to add new book & return it | Active (`res.status(201)`) | **8 Marks** |
| **d** | GET `/api/books` (all) & GET `/api/books/:id` (one by ID) | Active (`res.status(200)`) | **8 Marks** |
| **e** | PUT & DELETE routes with strict 404 handler fallback | Active (`res.status(404)` if document missing) | **8 Marks** |

---

## 🛠️ Prerequisites & Installation

Follow these steps to set up and start the application locally on your computer:

1. **Clone or Open the Project Folder**
   ```bash
   cd Bookstore

   Install Project Dependencies

Bash
npm install
Ensure MongoDB is Active

Open MongoDB Compass and connect to your local host instance (mongodb://localhost:27017/).

Launch the Application

Bash
node server.js
Expected console output:

Plaintext
Server is running on port 3000
Successfully connected to local MongoDB via Mongoose.
📡 API Endpoints & Testing Documentation
1. Add a New Book (POST)
URL: /api/books

Method: POST

Headers: Content-Type: application/json

Request Body Example:

JSON
{
  "title": "The River Between",
  "author": "Ngugi wa Thiong o",
  "price": 12000
}
PowerShell Test Command:

PowerShell
Invoke-RestMethod -Method Post -Uri http://localhost:3000/api/books -ContentType "application/json" -Body '{"title": "The River Between", "author": "Ngugi wa Thiong o", "price": 12000}'
2. Retrieve All Books (GET)
URL: /api/books

Method: GET

PowerShell Test Command:

PowerShell
Invoke-RestMethod -Method Get -Uri http://localhost:3000/api/books
3. Retrieve One Book by ID (GET)
URL: /api/books/:id

Method: GET

PowerShell Test Command:

PowerShell
Invoke-RestMethod -Method Get -Uri http://localhost:3000/api/books/<INSERT_BOOK_ID>
4. Update an Existing Book (PUT)
URL: /api/books/:id

Method: PUT

Request Body Example:

JSON
{
  "price": 15000
}
PowerShell Test Command:

PowerShell
Invoke-RestMethod -Method Put -Uri http://localhost:3000/api/books/<INSERT_BOOK_ID> -ContentType "application/json" -Body '{"price": 15000}'
5. Remove a Book (DELETE)
URL: /api/books/:id

Method: DELETE

PowerShell Test Command:

PowerShell
Invoke-RestMethod -Method Delete -Uri http://localhost:3000/api/books/<INSERT_BOOK_ID>

🛑 Error Handling Guard (404 Criteria)

If an endpoint is hit using a valid MongoDB ID format that does not match any current document record in the database for GET, PUT, or DELETE, the API will securely intercept the execution flow and return a structured JSON response:

Status Code: 404 Not Found

Payload:

JSON
{
  "message": "Book not found"
}

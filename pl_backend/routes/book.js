// const PickupModel = require("../models/pickup.model");
// const bookModel = require("../models/book.model");
const bookController = require("../controllers/bookController.js")
const express = require("express");
// const mongoose = require("mongoose");
const router = express.Router();


//  Get all books
router.get("/api/books/:download",bookController.findAll );

//  Get a single book by ID
router.get("/api/book/:bookId",bookController.findOne );
//Update by type
router.post("/api/book-update/:updateType",bookController.update );


//  Get a single book by Name
router.get("/api/book/:bookName",bookController.findOneByName );

//  Create a book
router.post("/api/book",bookController.create );

//  Delete a book
router.delete("/api/book/:bookId",bookController.delete );


module.exports = router;
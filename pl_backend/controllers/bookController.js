const BookModel = require('../models/book.model.js');
const fs = require('fs');


// Create and Save a new book
exports.create = (req, res) => {
    // Validate request
    if (!req.body.bookName && !req.body.shortDescription) {
        return res.status(400).send({
            message: "book name and description can not be empty"
        });
    } else {

        // Create a book
        const book = new BookModel({
            bookName: req.body.bookName,
            shortDescription: req.body.shortDescription,
            rating: req.body.rating,
            imgUrl: req.body.imgUrl,
            likes: req.body.likes,
        });

        // Save book in the database
        book.save()
            .then(data => {
                res.send(data);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "An error occurred while creating a book."
                });
            });
    }


};

// Retrieve and return all books from the database.
exports.findAll = (req, res) => {
    var downloadAsFile = req.params.download;
    console.log("Download"+downloadAsFile);
    BookModel.find()
        .then(books => {
            if((downloadAsFile=="noDownload")){
               return res.send(books);
            }else{
                fs.writeFile("./public/bookList.json", JSON.stringify(books), function(err) {
                    if(err) {
                        return console.log(err);
                    }
                    console.log("The file was saved!");
                    //Return download

                    res.download('./public/bookList.json'), (err)=>{

                        res.status(500).send({
                            message: "Could not download the file. " + err,
                          });
            
                    };
                }); 
            }
        }).catch(err => {
            res.status(500).send({
                message: err.message || "An error occurred while returning books."
            });
        });
};

// Find a single book with a bookId
exports.findOne = (req, res) => {
    var bookId = req.params.bookId
    BookModel.findOne(bookId)
        .then(book => {
            if (!book) {
                return res.status(404).send({
                    message: "No book found with id " + bookId
                });
            }
            res.send(book);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "No book found with id " + bookId
                });
            }
            return res.status(500).send({
                message: "Error retrieving a book with id " + bookId
            });
        });
};

// Find a single book with a bookName
exports.findOneByName = (req, res) => {
    var bookName = req.params.bookName
    BookModel.find({ bookName: `/${bookName}}/` })
        .then(book => {
            if (!book) {
                return res.status(404).send({
                    message: "No book found with name " + bookName
                });
            }
            res.send(book);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "No book found with name " + bookName
                });
            }
            return res.status(500).send({
                message: "Error retrieving a book with name " + bookName
            });
        });
};

// Update a book identified by the bookId in the request
exports.update = (req, res) => {
    if (!req.body.bookId && !req.body.shortDescription && !req.body.bookName && !req.body.rating) {
        return res.status(400).send({
            message: "Request body cannot be empty"
        });
    } else if (req.params.updateType == "likes" && req.body.bookId) {
        // Find book and update increase the like
        BookModel.findOneAndUpdate({ _id: req.body.bookId }, {

            $inc: { likes: 1 }

        }, { new: true })
            .then(book => {
                if (!book) {
                    return res.status(404).send({
                        message: "book not found with id " + req.params.bookId
                    });
                }
                res.send(book);
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "book not found with id " + req.params.bookId
                    });
                }
                return res.status(500).send({
                    message: "Error updating book with id " + req.params.bookId
                });
            });
    } else {
        // Find book and update it with the request body
        BookModel.findByIdAndUpdate(req.body.bookId, {
            bookName: req.body.bookName,
            shortDescription: req.body.shortDescription,
            rating: req.body.rating,
        }, { new: true })
            .then(book => {
                if (!book) {
                    return res.status(404).send({
                        message: "book not found with id " + req.params.bookId
                    });
                }
                res.send(book);
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "book not found with id " + req.params.bookId
                    });
                }
                return res.status(500).send({
                    message: "Error updating book with id " + req.params.bookId
                });
            });
    }


};

// Delete a book with the specified bookId in the request
exports.delete = (req, res) => {
    var bookId = req.params.bookId

    BookModel.findByIdAndRemove(bookId)
        .then(book => {
            if (!book) {
                return res.status(404).send({
                    message: "book not found with id " + req.params.bookId
                });
            }
            //Here we return all after deletion
            return this.findAll(req, res);
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "book not found with id " + req.params.bookId
                });
            }
            return res.status(500).send({
                message: "Could not delete book with id " + req.params.bookId
            });
        });
};
// prefix : /book

//Initializing Express Routers
const Router = require("express").Router();

// Database models
const BookModel = require("../../database/book");


/*
Route           /
Description     To get all the books
Access          PUBLIC
Parameters      NONE
Method          Get
*/


Router.get("/",async(req,res)=>{
    const getAllBooks = await BookModel.find();
    return res.json({books:getAllBooks});
});

/*
Route           /is
Description     get specefic book from database based on isbn
Access          PUBLIC
Parameters      isbn
Method          Get
*/

Router.get("/is/:isbn",async(req,res)=>{
    const getSpeceficBook  = await BookModel.findOne({ISBN: req.params.isbn});

    if(!getSpeceficBook){
        return res.json({error : `No book found for the ISBN of ${req.params.isbn}`});
    } 

    return res.json({book:getSpeceficBook});
});

/*
Route           /c
Description     get specefic book basd on a category
Access          PUBLIC
Parameters      category
Method          Get
*/

Router.get("/c/:category", async(req, res)=> {
    const getSpeceficBooks = await BookModel.find({category: req.params.category});

    if(!getSpeceficBooks){
        return res.json({error:`No book found for the category of ${req.params.category}`});
    }

    return res.json({book:getSpeceficBooks});
});


/*
Route           /a
Description     get specefic book basd on a authors
Access          PUBLIC
Parameters      category
Method          Get
*/


Router.get("/a/:authors", async(req, res) => {
    const getSpeceficBooks =await BookModel.findOne({authors:req.params.authors});

    if(!getSpeceficBooks){
        return res.json({error:`No book found for the category of ${req.params.authors}`});
    }

    return res.json({book:getSpeceficBooks});
});

/*
Route           /book/new
Description     add new book
Access          PUBLIC
Parameters      NONE
Method          post
*/

Router.post("/new", async (req, res) => {
    const { newBook } = req.body;
  
   const addNewBook = BookModel.create(newBook);
  
    return res.json({book:addNewBook, message: "book was added!" });
});


/*
Route           /book/update/:title
Description     Update title of a book
Access          PUBLIC
Parameters      isbn
Method          put
*/

Router.put("/update/:isbn", async(req,res) => {

    const updatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN: req.params.isbn,
        },
        {
            title: req.body.bookTitle,
        },
        {
            new: true, // To get updated one
        },
        );
    return res.json({books:updatedBook});
});

/*
Route           /book/author/update/:isbn
Description     Update/add new author
Access          PUBLIC
Parameters      isbn
Method          put
*/

Router.put("/author/update/:isbn", async(req,res) => {
    //Update the book database

    const updatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN: req.params.isbn
        },
        {
            $push:{
                authors :req.body.newAuthor,
            },
        },
        {
            new: true,
        }
    );
        
    //Update the author database
    const upadatedAuthor = await AuthorModel.findOneAndUpdate(
        {
            ID: req.body.newAuthor,
        },
        {
            $addToSet:{
                books :req.params.isbn
            }
        },
        {
            new:true,
        },
    );
    
    return res.json({books: updatedBook, authors:upadatedAuthor,message:"New author was added"});
});

/*
Route           /book/delete
Description     delete a book
Access          PUBLIC
Parameters      isbn
Method          delete
*/
 
Router.delete("/delete/:isbn",async(req,res) => {
    const updatedBook = await BookModel.findOneAndDelete({ISBN: req.params.isbn}); 
    return res.json({books:updatedBook});
});

/*
Route/          book/delete/author
Description     delete a author from a book
Access          PUBLIC
Parameters      isbn,authot id;
Method          delete
*/


Router.delete("/delete/author/:isbn/:authorID",async(req,res) => {
    // Update the book database
    const updatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN:req.params.isbn
        },
        {
            $pull:
            {
                authors:parseInt(req.params.authorID)
            },
        },
        {
            new:true
        }
    );

    //udate the author database
    const updatedAuthor = await AuthorModel.findByIdAndUpdate(
        {
            ID : parseInt(rq.params.authorID)
        },
        {
            $pull:{
                books:req.params.isbn
            }
        },
        {
            new:true
        }
    );

    return res.json({
        books: updatedBook,
        author: updatedAuthor,
        message:"Author was dleted",
    });
});

module.exports = Router;
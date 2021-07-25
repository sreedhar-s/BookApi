
const Router = require("express").Router();

const BookModel = require("../../database/publication");
 

/*
Route           /pub
Description     get all publications
Access          PUBLIC
Parameters      isbn 
Method          Get
*/

Router.get("/pub", async(req,res) => {
    const getAllPublications = await PublicationModel.find();
    return res.json({Publication: getAllPublications});
});

/*
Route           /pub//i/:id
Description     get specefic publication based on id
Access          PUBLIC
Parameters      id 
Method          Get
*/

Router.get("/pub/i/:id",async(req,res) => {
    const getSpeceficPublication = await PublicationModel.findOne({ID:req.params.id});
      

    if(!getSpeceficPublication){
        return res.json({Error: `No publication found for the book ${req.params.id}`});
    }

    return res.json({Publications: getSpeceficPublication});
});

/*
Route           /pub/is/:isbn
Description     to get a list of publications based on a book.     
Access          PUBLIC
Parameters      isbn
Method          Get
*/

Router.get("/pub/is/:isbn",async(req,res) => {
    const getSpeceficPublications = await PublicationModel.find({books:req.params.isbn});

    if(!getSpeceficPublications){
        return res.json({Error: `No publication found for the book ${req.params.isbn}`});
    }

    return res.json({Publications : getSpeceficPublications});
});

/*
Route           /publication/new
Description     add new publication
Access          PUBLIC
Parameters      NONE
Method          post
*/



Router.post("/new",(req,res) => {
    const {newPublication} = req.body;

    PublicationModel.create(newPublication);

    return res.json({message:"Publication was added"});
});

/*
Route           /publication/update/:id
Description     update publication name using id 
Access          PUBLIC
Parameters      id
Method          put
*/

Router.put("/author/update/:id", async (req,res) => {
    const updatedAuthor = await AuthorModel.findOneAndUpdate(
        {
            ID : req.params.id
        },
        {
            name:req.body.authorName
        },
        {
            new:true
        }
    );

    return res.json({authors:updatedAuthor});
});

/*
Route           /publication/update/book
Description     Update/add new book to a publication
Access          PUBLIC
Parameters      isbn
Method          put
*/

Router.put("/update/book/:isbn", (req, res) => {
    // update the publication database
    
  
    // update the book database
    
  
    return res.json({
      books: database.books,
      publications: database.publications,
      message: "Successfully updated publication",
    });
});


/*
Route           /publication/delete/book
Description     delete a book from publication 
Access          PUBLIC
Parameters      isbn, publication id
Method          DELETE
*/

Router.delete("book/delete/publication/:isbn/:publicationID",async(req,res) => {
    // Update the book database
    const updatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN:req.params.isbn
        },
        {
            $pull:
            {
                publication:parseInt(req.params.publicationID)
            },
        },
        {
            new:true
        }
    );

    //udate the publication database
    const updatedPublication = await AuthorModel.findByIdAndUpdate(
        {
            ID : parseInt(rq.params.publicationID)
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
        message:"Publication was dleted",
        books: updatedBook,
        author: updatedPublication,
    });
});

/*
Route           /publication/delete
Description     delete a publication
Access          PUBLIC
Parameters      id
Method          delete
*/

Router.delete("/delete/:isbn",async(req,res) => {
    const updatedPublication = await PublicationModel.findOneAndDelete({ID: req.params.id}); 
    return res.json({books:updatedPublication});
});


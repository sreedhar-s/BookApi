const Router = require("express").Router();

const AuthorModel = ("../../database/author");

/*
Route           /author
Description     get all authors
Access          PUBLIC
Parameters      NONE
Method          Get
*/

Router.get("/", async(req,res) => {
    const getAllAuthors = await AuthorModel.find();
    return res.json({authors: getAllAuthors});
});

/*
Route           /author/:id
Description     get specefic author
Access          PUBLIC
Parameters      id
Method          Get
*/


Router.get("/i/:id",async(req,res)=>{
    const getSpeceficAuthor = await AuthorModel.findOne({ID: req.params.id});

    if(!getSpeceficAuthor){
        return res.json({error : `No author found for the id of ${req.params.id}`});
    } 

    return res.json({book:getSpeceficAuthor});
});

/*
Route           /author/:isbn
Description     to get a list of authors based on a book's ISBN.
Access          PUBLIC
Parameters      isbn
Method          Get
*/



Router.get("/is/:isbn",async(req,res) => {
    const getSpeceficAuthors = await AuthorModel.findOne({books:req.params.isbn});

    if(!getSpeceficAuthors){
        return res.json({error : `No author found for the book ${req.params.isbn}`});
    }

    return res.json({authors : getSpeceficAuthors});
});

/*
Route           /authors/new
Description     add new author
Access          PUBLIC
Parameters      NONE
Method          post
*/


Router.post("/new", (req, res) => {
    const { newAuthor } = req.body;
  
    AuthorModel.create(newAuthor);
  
    return res.json({ message: "author was added!" });
});


/*
Route           /author/update/:id
Description     update Author name using id 
Access          PUBLIC
Parameters      id
Method          put
*/



Router.put("/update/:id", async (req,res) => {
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
Route           /author/delete
Description     delete a author
Access          PUBLIC
Parameters      id
Method          delete
*/


Router.delete("/delete/:id",async(req,res) => {
    const updatedAuthor = await AuthorModel.findOneAndDelete({ID: req.params.id}); 
    return res.json({books:updatedAuthor});
});

module.exports = Router;
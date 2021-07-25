  
let books = [

  {
    ISBN: "12345ONE",
    title: "Getting started with MERN ",
    authors: [1, 2],
    language: "en",
    pubDate: "2021-07-07",
    numOfPage: 225,
    category: ["fiction", "tech", "web dev"],
    publication: 1,
  },
   
  {
    ISBN: "12345TWO",
    title: "Getting started with Python",
    authors: [1, 2],
    language: "en",
    pubDate: "2021-07-07",
    numOfPage: 225,
    category: ["fiction", "tech", "web dev"],
    publication: 1,
  },
];

const authors = [
  {
    ID: 1,
    name: "pavan",
    books: ["12345ONE", "12345TWO"],
  },
  {
    ID: 2,
    name: "Deepak",
    books: ["12345ONE","12345TWO"],
  },
];

const publications = [
  {
    ID: 1,
    name: "Chakra Publications",
    books: ["12345ONE"],
  },
  {
    ID: 2,
    name: "Vickie Publications",
    books: ["12345TWO"],
  },
];

module.exports = { books, authors, publications };
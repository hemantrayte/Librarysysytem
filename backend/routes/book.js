const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const Book = require("../models/book");
const {authToken} = require("../middlewares/userAuth");

//get all books
router.get("/allbooks",  async (req, res) => {
  try{
   const books = await Book.find();
   return res.json({
    status:"Sucess",
    data:books
   })
  } catch(error){
    console.log(error);
    return res.status(500).json({message:"Please Sign in"})
  }
})

//get book by id
router.get("/allbooks/:id", async (req, res) => {
  try{
     const { id } = req.params;
     const book = await Book.findById(id);
     return res.json({
      status:"Success",
      data:book
     });
  } catch(error){
    console.log(error)
    return res.status(500).json({ message: "An error Occurred"});
  }
})

//status of book
router.patch("/allbooks/status", authToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const user = await User.findById(id);

    if(user.role !== "admin"){
      res.status(400).json({ message: "You Dont having Access"});
    }
   const { bookid }= req.headers;
   await Book.findByIdAndUpdate(bookid, {
    status:req.body.status,
   });

   return res.status(200).json({
    message:"Status Updated"
   });
 }catch(error){
   console.log(error)
   return res.status(500).json({ message:"An error Occured"});
 }
})

//add book admin
router.post("/books" , authToken, async (req, res) => {
  try{
    const { id } = req.headers;
    const user = await User.findById(id);

    if(user.role !== "admin"){
      res.status(400).json({ message: "You Dont having Access"});
    }
    const book = new Book ({
      url:req.body.url,
      title:req.body.title,
      author:req.body.author,
      // url: req.body.url,
      publishedYear:req.body.publishedYear,
      // status: req.body.status,
    });
    await book.save();
    res.status(200).json({ message: "Book Added Successfully"});
  }catch(error) {
    res.status(500).json({ message: "Internal Server Error"});
    console.log(error);
  }
});

//Update book admin
router.put("/books/update", authToken , async(req, res) => {
  try {
    const { id } = req.headers;
    const user = await User.findById(id);

    if(user.role !== "admin"){
      res.status(400).json({ message: "You Dont having Access"});
    }
   const { bookid }= req.headers;
   await Book.findByIdAndUpdate(bookid, {
    title:req.body.title,
    author:req.body.author,
    publishedYear:req.body.publishedYear,
    status:req.body.status,
   });

   return res.status(200).json({
    message:"Book Update Successfully"
   });
 }catch(error){
   console.log(error)
   return res.status(500).json({ message:"An error Occured"});
 }
})

//delete book admin
router.delete("/books/delete", authToken, async(req, res) => {
  try{
    const { id } = req.headers;
    const user = await User.findById(id);

    // if(user.role !== "admin"){
    //   res.status(400).json({ message: "You Dont having Access"});
    // }
    const { bookid } = req.headers;
    await Book.findByIdAndDelete(bookid);
    return res.status(200).json({ message:"Book Deleted Successfully"});
  }catch(error){
    console.log(error);
    return res.status(500).json({ message:"An error occurred"});
  }
});

module.exports = router;
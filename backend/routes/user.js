const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {authToken} = require("../middlewares/userAuth");

//sign up
router.post("/register", async (req, res) => {
  try {
    const { username, email, password} = req.body;

    //cheak username length is more than 3
    if (username.length < 4 ) {
      return res
      .status(400)
      .json({ message: "Username lenght should be greater than 3"});
    }

    //cheak username is already exist ?
    const existUser = await User.findOne({username: username})
    if (existUser) {
      return res
      .status(400)
      .json({ message: "Username already exist"});
    }

    //cheak email is already exist ?
    const existEmail = await  User.findOne({email: email})
    if (existEmail) {
      return res
      .status(400)
      .json({ message: "Email already exist"});
    }
    
    //cheak password length is more than 6
    if (password.length <= 5) {
      return res
      .status(400)
      .json({ message: "Username lenght should be greater than 5"});
    }

    //hash the password 
    const hashPassword = await bcrypt.hash(password, 12);

    //save new user data
    const newUser = new  User({
      username:username,
      email:email,
      password:hashPassword,
    });

    await newUser.save();
    return res.status(200).json({ message: "Signup Successfully"});

  } catch(error) {
    res.status(500).json({ message:  "Internal server error"});
    console.log("error", error);
  }
});

//Login/ sign in
router.post("/login", async (req, res) => {
  try {
    const { username, password} = req.body;

    const existUser = await User.findOne({ username });

    if(!existUser) 
    {
      res.status(400).json({ message:"Invaild credentials"});
    }

    await bcrypt.compare(password, existUser.password, (err, data) => {
      if(data) {

        //jwt token
        const authClaims = [
          { name: existUser.username},
          { name: existUser.role},
        ]
        const token = jwt.sign({ authClaims }, "bookStore", {expiresIn: "30d",
      })

        res.status(200).json({ id:existUser._id, role:existUser.role,
        token:token
        });
      }
      else {
        res.status(400).json({ message:"Invaild credentials"});
      }
    });

  } catch(error) {
    res.status(500).json({ message:  "Internal server error"});
  }
});

//get user information
router.get("/authuser", authToken, async (req, res) => {
 try {
   const { id } = req.headers;
   const data = await User.findById(id)
   return res.status(200).json(data);
 } catch(error) {
    res.status(500).json({ message:  "Internal server error"});
  }
})

module.exports = router;
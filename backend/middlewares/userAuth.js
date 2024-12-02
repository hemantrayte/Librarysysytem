const jwt = require("jsonwebtoken");

const authToken = (req, res, next) => {
  const authHeader = req.header("authorization");
  const token =  authHeader.split(" ")[1];

  if (!token){
    return res.status(401).json({message: "Unauthorized HTTP, Token not provided"});
  }

  jwt.verify(token, "bookStore", (err, user) => {
    if(err) {
      return res.status(403).json({message:"Token expired.Please singIn again"});
    }
    req.user = user;
    next();
  });
};

module.exports= { authToken}
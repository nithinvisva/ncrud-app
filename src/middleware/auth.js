const jwt = require("jsonwebtoken");

async function auth(req,res,next){
  try{
    var token = req.headers?.authorization ? req.headers.authorization.split(' ')[1] : null;
    if(!token){
        res.status(403).send("Access Denied"); 
    }  
    else {
        try {
            req.user = await jwt.verify(token,"secrectKey");
          } catch (err) {
            throw new Error(err)
          }
        next();
    }
  }catch{
    res.status(400).send("Invalid Token"); 
  }
}

module.exports.auth = auth
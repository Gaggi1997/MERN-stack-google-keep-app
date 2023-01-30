const jwt = require('jsonwebtoken')
const jwtkey = "Gaggiiswebdeveloper";

const fetchUser = (req , res , next) => {
    //Get the user from thr jwt token and append id to the object
    const token = req.header('authtoken')
    if(!token){
        res.status(401).send("Access Denied - please authenticate a valid token")
        console.log("invalid token")
    }
    try{
    const data = jwt.verify(token , jwtkey);
    req.existUser =  data.existUser;
   next()
    }
    catch(error){
        res.send(error)
    }
}
module.exports = fetchUser
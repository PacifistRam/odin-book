const jwt = require("jsonwebtoken");



const authQuery = require("../models/authQuery")


const authenticateToken = (req,res,next) => {
    const authHeader = req.headers["authorization"]

    // extracting token from authorization header
    const token = authHeader&&authHeader.split(" ")[1];

    // checking if the token is null
    if(!token){
        return res.status(401).json({message: "Authorization failed. No access token."})
    } 

    // verifying if the token is null
    jwt.verify(token,process.env.JWT_SECRET, async (err, user) => {
        if(err) {
            console.log(err);
            return res.status(403).json({message: "Could not verify token"})
        }
        const userExist = await authQuery.getUserById(user.id)
        if(userExist.data){
            req.user = user
        }
        else{
            return res.status(403).json({ message: "user does not exist or has been deactivated"})
        }
        next();
    })
}


module.exports = { authenticateToken }
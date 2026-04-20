const jwt = require("jsonwebtoken");

const JWT_SECRETKEY = process.env.JWT_SECRETKEY;

exports.auth = (req, res, next) => {
    
    const token = req.cookies.token;
    
    if(!token){
        return res.status(401).json({msg:"no token"})
    }

    try {
        const decoded = jwt.verify(token , JWT_SECRETKEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({msg:"invalid token"})
    }
}

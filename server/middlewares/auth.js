const jwt = require('jsonwebtoken');

exports.verifyToken = (req,res,next) => {
    let accessToken = req.cookies.jwt;

    //if there is no token in the cookies , req is unauthorized
    if(!accessToken){
        return res.status(403).json({
            error: "Unauthorized",
        });
    }

    let payload;
    try{
        //verify the token using jwt.verify
        //throws an error if token has exp or has invalid signature
        payload = jwt.verify(accessToken,process.env.JWT_SECRET);
        req._id = payload._id;
        req.username = payload.username;
        req._id = payload._id;
        next();
    }
    catch(e){
        //return req unauthorized error
        return res.status(403).json({
            error:"Unauthorized",
        });
    }
};
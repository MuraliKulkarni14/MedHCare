const User = require('../models/user');

exports.userRegisterValidator = (req,res,next) => {

    //username is not null
    req.check("username","Username is required").notEmpty();

    //email is not null, valid and noramlized
    req.check("email","Email is required").notEmpty();
    req.check("email","Invalid Email").isEmail();

    //check password
    req.check("password","Password is required").notEmpty();
    req.check("password").isLength({min:6}).withMessage("Password must contain atleast 6 characters");

    req.check("password","Password must contain one upper case, one lower case ,one number and one special").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/,"i");

    //check for errors
    const errors = req.validationErrors();

    //if error show first error
    if (errors) {
        const firstError = errors.map((err)=> err.msg)[0];

        return res.status(400).json({
            error: firstError,
        });
    }
    //proceed to next middleware
    next();
};

exports.userById = async (req, res, next) => {
    try {
    const user = await User.findById(req._id).exec();

    if (!user) {
        return res.status(404).json({
        error: "User Not Found",
        });
    }

      // add user obj in req with all user info
    req.user = user;
    next();
    } catch (err) {
    console.error(err);
    return res.status(500).json({
        error: "Internal Server Error",
    });
    }
};

exports.validateProfile = async (req, res, next) => {
    

    try {
        const user = await User.findById(req._id).exec();
        const { fName,lName, profileImage, phone, address, bloodType } = req.body;

    // Check if any of the required profile fields are missing
    if (!fName|| !phone || !address || !bloodType) {
        return res.status(400).json({
            error: 'Incomplete Profile Data',
        });
    }

    // Attach the profile data to the request object
    req.profileData = {
        fName,
        lName,
        profileImage,
        phone,
        address,
        bloodType,
    };
        if (!user) {
            return res.status(404).json({
            error: "User Not Found",
            });
        }
    
          // add user obj in req with all user info
        req.user = user;
        next();
        } 
        catch (err) {
            console.error(err);
            return res.status(500).json({
                error: "Internal Server Error",
        });
        }
};
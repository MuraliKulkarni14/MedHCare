const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (req, res) => {
	// check if user already exists
	const usernameExists = await User.findOne({
		username: req.body.username,
	});
	const emailExists = await User.findOne({
		email: req.body.email,
	});

	if (usernameExists) {
		return res.status(403).json({
			error: "Username is taken",
		});
	}
	if (emailExists) {
		return res.status(403).json({
			error: "Email is taken",
		});
	}

	// if new user, create a new user
	const user = new User(req.body);
	await user.save();

	res.status(201).json({
		message: "Signup Successful! Please Login to proceed",
	});
};

exports.login = async (req, res) => {
    // find the user based on email
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email }).exec();
  
      // if no user is found
      if (!user) {
        return res.status(401).json({
          error: "Invalid Credentials",
        });
      }
  
      // if user is found, verify the password using your authenticate method
      const isPasswordValid = await user.authenticate(password);
  
      if (!isPasswordValid) {
        return res.status(401).json({
          error: "Invalid email or password",
        });
      }

      // Check if it's the user's first login
      let isFirstLogin = false;
      if (user.firstLogin) {
      // Update the firstLogin field to false
      await User.findByIdAndUpdate(user._id, { $set: { firstLogin: false } });
      isFirstLogin = true;
    }
  
      // generate a token with user id and jwt secret
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });
  
      // persist the token as 'jwt' in cookie with an expiry date
      res.cookie("jwt", token, { expires: new Date(Date.now() + 24 * 60 * 60 * 1000), httpOnly: true });
  
      // return the response with user
      const { username } = user;
      return res.json({
        message: "Login Successful!",
        username,
        isFirstLogin,
      });

      
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        error: "Internal Server Error",
      });
    }
  };
  

exports.logout = (req , res) => {
    //clear the cookie
    res.clearCookie("jwt");

    return res.json({
        message: "Logout Successful",
    });
};

exports.getLoggedInUser = (req,res) => {
    const {username} = req.user;

    return res.status(200).json({
        message:"User is Still Logged in",
        username,

    });
};



exports.setProfile = async (req, res) => {
  try {
      // Assuming you have user information from your authentication middleware
      const { _id } = req.user;
      // Retrieve the profile data from the request body
      const { fName, lName, phone, address, bloodType } = req.body;

      // Find the user by their unique identifier (e.g., user ID)
      const user = await User.findOne(_id);

      if (!user) {
          return res.status(404).json({
              error: "User not found",
          });
      }

      // Update the user's profile data
      user.fName = fName;
      user.lName = lName; 
      user.phone = phone;
      user.address = address;
      user.bloodType = bloodType;

      // Save the updated user to the database
      await user.save();

      return res.status(200).json({
          message: "Profile Updated Successfully",
          user,
      });
  } catch (err) {
      console.error(err);
      return res.status(500).json({
          error: "Internal Server Error",
      });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const { _id } = req.user;
    // Find the user by their uid
    const user = await User.findOne(_id);

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    // Return the user's profile data without any updates
    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};




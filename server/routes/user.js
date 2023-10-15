const express = require('express');
const router = express.Router();

//import controllers
const { register,login,logout,getLoggedInUser,setProfile, getProfile } = require("../controllers/user");

//import middlewares
const {userRegisterValidator,userById, validateProfile} = require("../middlewares/user")
const {verifyToken} = require("../middlewares/auth");
//api routes
router.post("/register",userRegisterValidator,register);
router.post("/login",login);
router.get("/logout",logout);
router.get('/user',verifyToken,userById,getLoggedInUser);
router.post('/setprofile',verifyToken,validateProfile,setProfile);
router.get('/getprofile',verifyToken,userById,getProfile);

module.exports = router;
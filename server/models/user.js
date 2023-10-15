const mongoose = require('mongoose');
const uuidv1 = require('uuidv1');
const crypto = require('crypto');
const { kStringMaxLength } = require('buffer');

const userSchema = new mongoose.Schema({
    username :{
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    fName:{
        type: String,
    },
    lName:{
        type: String,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    hashedPassword:{
        type: String,
        required: true,
    },
    profileImage: {
        type: String,
        default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    phone:{
        type:String,
        default:"000 999 000 0"
    },
    address:{
        type:String,
    },
    bloodType:{
        type: String,
    },
    salt : String,

},{
    timestamps:true,
});

//virtual field
userSchema.virtual("password").set(function (password){
    //create temp variable _password
    this._password = password;
    
    //generate a timestamp, uuidv1 gives us the unix timestamp
    this.salt = uuidv1();
    
    //encrypt the password function call
    this.hashedPassword = this.encryptPassword(password);
})

//methods
userSchema.methods = {
    encryptPassword: function (password){
        if (!password) return "";

        try{
            return crypto.createHmac("sha256",this.salt).update(password).digest("hex");
        }catch(err){
            return "";
        }
    },
    authenticate: function (plainText){
        return this.encryptPassword(plainText) === this.hashedPassword;
    }
};

module.exports = mongoose.model("User",userSchema);

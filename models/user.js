const mongoose = require("mongoose");
const validator = require("validator");
const dotenv = require("dotenv");
const Joi = require("joi");

dotenv.config({ path: "./.env"});

const userSchema = new mongoose.Schema({
    FirstName:{
        type: String,
        required: [true, "Please provide your First Name"],
        minlength: [3, "Your First Name should have atleast 3 characters"],
        maxlength: [50, "Your First Name should be less than 50 characters."],
        trim: true,
        validate: {
            validator: validate => validator.isAlpha(validate, ["en-US"]),
            message: "Your Name must only contain characters between A-Z",
        }
    },
    LastName:{
        type: String,
        required: [true, "Please provide your Last Name"],
        minlength: [3, "your Last Name should have atleast 3 characters"],
        maxlength: [50, "Your Last Name should be less than 50 characters."],
        trim: true,
        validate: {
            validator: validate => validator.isAlpha(validate, ["en-US"]),
            message: "Your Name must only contain characters between A-Z",
        }
    },
    Email:{
        type: String,
        required: [true, "Please provide your email"],
        unique: [true, "Email is already registered, Sign up with a new email"],
        validator: [validator.isEmail, "Please provide a valid email"],
    },
    Phone: {
        type: Number,
        required: [true, "Please provide your Contact Number"],
        unique: [true, "This Number is already registered, Sign up with a new number"],
        trim: true
    },
    Password:{
        type: String,
        required : [true, "Please provide password"],
        minlength: [8, "Your password should have atleast 8 characters"],
        maxlength: [255, "Your password should not be more than 16 characters"],
        trim: true
    }
});

const User = mongoose.model("User", userSchema);

function validateUser(user){
    const schema = Joi.object({
        FirstName: Joi.string().required().min(3).max(50),
        LastName: Joi.string().required().min(3).max(50),
        Email: Joi.string().required().min(10).max(50).email(),
        Phone: Joi.number(),
        Password: Joi
                    .string()
                    .min(6)
                    .required()
                    .max(20)
                    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/)
        
    });
    return validation = schema.validate(user);
}

module.exports.User = User;
module.exports.validateUser = validateUser;


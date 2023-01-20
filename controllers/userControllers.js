const {User, validateUser} = require("../models/user");
const asyncMiddleware = require("../middleware/async");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const getUser = asyncMiddleware( async(req, res)=>{
    res.sendfile(__dirname + '/public/index.html');    
});

const postSignup = asyncMiddleware(async(req, res)=>{

    const { error } = validateUser(req.body);
        if (error) return res.status(400).send(error.details[0].message);     

    bcrypt.hash(req.body.Password, saltRounds, async function(err, hash){
        if (err){
            res.status(400).send(err.message);
        }
        else{
        const user = new User({
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Email: req.body.Email,
            Phone: req.body.Phone,
            Password: hash            
        });           
        
        await user.save()  
            .then((result) => {
                res
                    .status(201)
                    .json({
                    message: "Your Account has been successfully registered!",
                    success: true,
                    "Name": result.FirstName + " "+ result.LastName,
                    "Email": result.Email
                    });
            
            })
            .catch((err) => {
                res.status(400).json({
                message: err.message,
                success: false,
                });
            });
        }
    });  
});


module.exports = {
    getUser,
    postSignup
}


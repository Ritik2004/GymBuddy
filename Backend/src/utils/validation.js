const validator = require('validator');

const validateSignup = (req) => {
    const {firstName,lastName,emailId,password} = req.body;
    if(!firstName || !lastName ){
       throw new Error("firstName and lastName are required");
    }
    else if(firstName.length < 4 || lastName.length > 50){
        throw new Error("firstName should be at least 4 characters and lastName should be at most 50 characters");
    }
     else if(!validator.isEmail(emailId)){
       throw new Error("Email is not valid");
    }    
    else if(!validator.isStrongPassword(password)){
         throw new Error("Password is not strong");
    }

}

const validateProfileEdit = (req) => {
    try{
    const allowedEditFields = [
        'firstName',
        'lastName',
        'age',
        'about',
        'skills',
        "gender",
        'photoUrl'
    ]
    Object.keys(req.body).forEach((field) => {
        if (!allowedEditFields.includes(field)) {   
            throw new Error(`Editing ${field} is not allowed`);
        }
    });
      }

    catch(err){
        throw err;
    }   
}
module.exports = {validateSignup,validateProfileEdit};


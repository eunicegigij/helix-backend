const { body, validationResult } = require('express-validator');
const Auth=require("../auth/schema/auth");
const userValidationRules= () =>{
    return[
        body("email").isEmail().withMessage("Must be a valid email address")
            .custom((value)=>{
                const query=Auth.findOne({email:value});
                return query.exec().then (user =>{
                    if (user){
                        return Promise.reject("Email already exists");
                    };
                });
        }),
        body("password")
            .isLength({min:8})
            .withMessage("Password must be atleast 8 characters long"),  
    ];
};

const validate=(req,res,next) =>{
    const errors= validationResult(req);
    if (errors.isEmpty()){
        return next();
    };
    const  extractedErrors=[]
    errors.array().map(err => extractedErrors.push ({[err.param]:err.msg}));
    return res.status(422).json({
        errors:extractedErrors
    });
};

module.exports={
    userValidationRules,
    validate
}
        


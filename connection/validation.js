const joi = require('joi')
const registrationValidation = data =>{
    const schema = joi.object({
        name:joi.string().min(6).required(),
        email:joi.string().email().min(6).required(),
        password:joi.string().min(6).required()
    })
    return schema.validate(data)
}
const loginValidation = data =>{
    const schema = joi.object({
        email:joi.string().email().min(6).required(),
        password:joi.string().min(6).required()
    })
    return schema.validate(data)
}

module.exports.registrationValidation = registrationValidation
module.exports.loginValidation=loginValidation;

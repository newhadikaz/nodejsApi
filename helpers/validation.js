const {validationResult} = require('express-validator');
  
const validate = (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });         
    }else {
        return true
    }
}

const checkValidation = (req, res, next) => {
    if(req.method == 'PUT' || req.method == 'POST'){
        var validationErrors =  validate(req, res);
        if(validationErrors !== true)  return validationErrors
        else  next()
      }else
        next()
}
  
  module.exports = {
    validate,
    checkValidation
  }
  
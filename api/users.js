var express = require('express')
var router = express.Router()
const {body, validationResult} = require('express-validator');
const User = require('../models/users');
var userServices = require('../servces/userServices');
const { handleError, AppError } = require('../helpers/errors')
const {validate} = require('../helpers/validation')


var validators = [
    body('name').isString(),
    body('email').isEmail()
];

router.get('/',   async (req, res, next) => {
  var result = await userServices.get();
  if(result.status == 'success'){
      if(!result.data.length){        
        return next(new AppError('Not Found', 404));
      }else{
        res.status(201).json(result);
      }    
}
  else {
   res.status(400).json({error: result});
    }
})

router.post('/', validators, async (req, res) => {
   
      var validationErrors =  validate(req, res);
      if(validationErrors !== true)  return validationErrors
      var result = await userServices.create(req);
      
      if(result.status == 'success'){
          res.status(201).json(result);
      }else {
          res.status(400).json({error: result});
      }
   
  });

module.exports = router
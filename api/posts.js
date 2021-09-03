var express = require('express')
var router = express.Router()
const {body, validationResult} = require('express-validator');
const Post = require('../models/posts');
var postServices = require('../servces/postServices');
const { handleError, AppError } = require('../helpers/errors')
const {validate, checkValidation} = require('../helpers/validation')


var validators = [
    body('title').isString(),
    body('description').isString()
];

router.use(validators, function (req, res, next) {
  checkValidation(req, res, next)
})

router.get('/:id',   async (req, res, next) => {  

  var result = await postServices.getOne(req.params.id);
  if(result.status == 'success'){
      if(!result.data){        
        return next(new AppError('Not Found', 404));
      }else{
        res.status(200).json(result);
      }    
}
  else {
   res.status(400).json({error: result});
    }
})

router.get('/',   async (req, res, next) => { 
  // get lang
  // console.log(req.acceptsLanguages(['en', 'ar', 'tr']));

  var result = await postServices.getAll();
  if(result.status == 'success'){
      if(!result.data.length){        
        return next(new AppError('Not Found', 404));
      }else{
        res.status(200).json(result);
      }    
}
  else {
   res.status(400).json({error: result});
    }
})

router.post('/',  async (req, res) => {

        var result = await postServices.create(req);
       
        if(result.status == 'success'){
            res.status(201).json(result);
        }else {
           res.status(400).json({error: result});
        }
   
  });

  router.put('/:id', validators, async (req, res) => {    
     
     var result = await postServices.update(req.params.id, req);
    
     if(result.status == 'success'){
         res.status(201).json(result);
     }else {
        res.status(400).json({error: result});
     }

});

module.exports = router
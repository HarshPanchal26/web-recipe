const experess = require('express');
const controllerForLogIn = require('../controllers/controllerForLogIn') 
const {isValidUser , isAutorized} = require('../middlewares/middlewareForAuthentication')

const router = experess.Router();

router.get('/', (_req,res)=>{
    res.send("I am body")
})

router.post('/user', controllerForLogIn);

router.get('/authorization' , isAutorized , (_req , res)=>{
    res.status(201).json({
        authorized : true,
        message : 'Autorized Person'
    })
})

module.exports = router;


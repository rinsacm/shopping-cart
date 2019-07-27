var express = require('express');
var router = express.Router();
let bcrypt=require('bcrypt-nodejs');
let csrf=require('csurf')
let csrfprotection =csrf();
router.use(csrfprotection)
let passport=require('passport');

let dbconnect=require('../dbconfig/db-connect')
const { check, validationResult } = require('express-validator');

/* GET users listing. */
router.get('/signup',function (req,res,next){
    let messages=req.flash('error')
    res.render('user/signup',{csrfToken:req.csrfToken(),messages:messages,hasError:messages.length>0})
})
router.get('/signin',function (req,res,next){
    let messages=req.flash('error')
    res.render('user/signin',{csrfToken:req.csrfToken(),messages:messages,hasError:messages.length>0})
})
router.get('/logout',function (req,res,next) {
    req.logout();
    res.redirect('/')
})

router.post('/signup',[check('email','Invalid email').isEmail(),check('password','Invalid password.').isLength({min:5})],
        passport.authenticate('local-signup',
            {
                failureRedirect:'/user/signup',
                failureFlash:true
            }
        ),function (req,res,next) {
        res.redirect('/user/profile')
    }

);
router.post('/signin',[check('email','Invalid email').isEmail(),check('password','Invalid password.').isLength({min:5})],
    passport.authenticate('local-signin',
        {
            failureRedirect:'/user/signin',
            failureFlash:true
        }
    ),function (req,res,next) {
        res.redirect('/user/profile')
    }

);
router.get('/profile',isLoggedIn,function (req,res,next) {
    res.render('user/profile')
})
function isLoggedIn(req,res,next){
    if(req.isAuthenticated())

        ;
    console.log(req.isAuthenticated())

    res.redirect('/')
}







module.exports = router;

var express = require('express');
var router = express.Router();
let bcrypt=require('bcrypt-nodejs');
let csrf=require('csurf')
let csrfprotection =csrf();
router.use(csrfprotection)
let passport=require('passport');
let CART=require('../cart/cart')
let dbconnect=require('../dbconfig/db-connect')
const { check, validationResult } = require('express-validator');

/* GET users listing. */
router.get('/profile',isLoggedIn,function (req,res,next) {
    dbconnect.get().collection('orders').findOne({user:req.user},function(err,order){
        if(err)
        res.write('Error!');
        else{
           
                let cart=order.cart;
                order.items=CART.generateArray(cart);
                
            }
            console.log(order)
            res.render('user/profile',{orders:order})
        
    })
    
})
router.get('/logout',isLoggedIn,function (req,res,next) {
    req.logOut();
    res.redirect('/')
})
router.use('/',notLoggedIn,function (req,res,next) {
    next();
})
router.get('/signup',function (req,res,next){
    let messages=req.flash('error')
    res.render('user/signup',{csrfToken:req.csrfToken(),messages:messages,hasError:messages.length>0})
})
router.get('/signin',function (req,res,next){
    let messages=req.flash('error')
    res.render('user/signin',{csrfToken:req.csrfToken(),messages:messages,hasError:messages.length>0})
})



router.post('/signup',[check('email','Invalid email').isEmail(),check('password','Invalid password.').isLength({min:5})],
        passport.authenticate('local-signup',
            {
                
                failureRedirect:'/user/signup',
                failureFlash:true
            }),function(req,res,next){
                if(req.session.oldUrl){
                var oldUrl = req.session.oldUrl;
                req.session.oldUrl = null;
                res.redirect(oldUrl);
                } 
                else {
                    res.redirect('/user/profile')
                }
            }
);
router.post('/signin',[check('email','Invalid email').isEmail(),check('password','Invalid password.').isLength({min:5})],
    passport.authenticate('local-signin',
        {
            successRedirect:'/user/profile',
            failureRedirect:'/user/signin',
            failureFlash:true
        }
    )


);

function isLoggedIn(req,res,next){
    if(req.isAuthenticated())
        return next();

    res.redirect('/')   
}
function notLoggedIn(req,res,next){
    if(!req.isAuthenticated())
        return next();

    res.redirect('/')
}






module.exports = router;

var express = require('express');
var router = express.Router();
let passport=require('passport')
let dbconnect=require('../dbconfig/db-connect')
let ObjectID = require('mongodb').ObjectID;
let cart=require('../cart/cart')

/* GET home page. */
router.get('/', function(req, res, next) {
  dbconnect.get().collection('product').find().toArray(function(err,docs){
    res.render('shop/index', { title: 'Shopping Cart' ,products:docs});
  })

});

router.get("/add-to-cart/:id", async  function(req,res,next){
 
  let productId=req.params.id;
  let idString=productId
  let objId = new ObjectID(idString);
  if(!req.session.cart){
     req.session.cart={
      items:{},totalQty:0,totalPrice:0
      
  }
}
   let product=  await dbconnect.get().collection('product').findOne({_id:objId}, function(err,product)
   {
    if(err)
      return err
    if(product)
    {
      req.session.cart= cart.cartAdd(req.session.cart,product,product._id);
      console.log(req.session.cart)
      res.redirect('/')
    }
   
     
  })
  

 
 
  
 
})

  
  
 
    
  
  

    
   

module.exports = router;

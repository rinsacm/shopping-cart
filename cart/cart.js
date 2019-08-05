module.exports.cartAdd=function (oldCart,product,id)
{
    newCart=oldCart;
    let storedItem=newCart.items[id]
    if(!storedItem)
    {
        storedItem=newCart.items[id]={item:product,Qty:0,price:0}
    }
    console.log(storedItem)
    storedItem.Qty++;
    storedItem.price=product.price * storedItem.Qty;
    console.log(storedItem.price)
    newCart.items[id]=storedItem
    newCart.totalQty++;
    newCart.totalPrice+=storedItem.price/storedItem.Qty;
    console.log(newCart)
    
    return newCart;
    
}
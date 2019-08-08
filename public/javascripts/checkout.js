console.log("HI") 
Stripe.setPublishableKey('pk_test_VXL2ZouUSiaHsJeuBFjlbJXu');
var $form=$('#checkout-form');
$form.submit(function(event){
    $('#charge-error').addClass('invisible');
    $form.find('button').prop('disabled',true);
    Stripe.card.createToken({
        number:$('#card-number').val(),
        cvc:$('#card-cvc').val(),
        exp_month:$('#card-expiry-month').val(),
        exp_year:$('#card-expiry-year').val(),
        name:$('#card-name').val()

    },stripeResponseHandler);
    return false;
})

function stripeResponseHandler(status,response){
    if(response.error){
        console.log(response.error)
        console.log("HI")
       $('#charge-error').text(response.error.message);
       $('#charge-error').removeClass('invisible');
        $form.find('button').prop('disabled',false);
    }
    else{
        console.log("HhhI")
        let token =response.id;
        $form.append($('<input type="hidden" name="stripeToken"/>').val(token));
        $form.get(0).submit(); 
    }
}

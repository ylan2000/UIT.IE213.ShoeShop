/*const cart = []

const bodyCart = document.getElementsByClassName("cart__info");

for (i = 0; i < bodyCart.length; i++) {
  const cart_info = new Object();
  cart_info["productName"] = bodyCart[i].getElementsByClassName("cart__product-name")[0].innerText;
  cart_info["productPrice"] = bodyCart[i].getElementsByClassName("cart__product-price")[0].innerText;
  cart.push(cart_info)
}

const total = document.getElementById("cart__totalMoney").innerText;

const sendData = async () => {
    await axios.post("/api/payment",{
        cart: cart,
        total: total,
    }).then(function(res){
        window.location = "/payment"
    })
}

const submit = document.getElementById("submitBtn")

submit.addEventListener('click',sendData)
*/
//Order

const order = document.getElementById('orderBtn')

var stripeHandler = StripeCheckout.configure({
    key: stripePublicKey,
    locale: 'en',
    token: function(token){
        var priceElement = document.getElementsByClassName("cost")[0];
        var price = parseFloat(priceElement.innerText.replace('$','')) * 100;
        axios.post("/client/api/payment/" + token.id, {
            id: token.id,
            stripeTokenId: token.id,
            total: price
        }).then(function(res){
            sessionStorage.setItem("message", res.data.message)
        }).then(function(res){window.location = "/"}).catch(function(err){
            console.error(err)
        })
    }
})

function purchase(){
    var priceElement = document.getElementsByClassName("cost")[0];
    var price = parseFloat(priceElement.innerText.replace('$','')) * 100;
    stripeHandler.open({
        amount: price
    })
}

order.addEventListener('click',purchase)
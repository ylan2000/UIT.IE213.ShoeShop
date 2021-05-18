
//Order

const order = document.getElementById('orderBtn');

const list = document.getElementsByClassName("payment__product-list")
var cart = []
for (i=0; i < list.length; i++){
    cart.push({
        id: list[i].getElementsByClassName("product_id")[0].getAttribute("data-product-id"),
        qty: parseInt(list[i].getElementsByClassName("qty")[0].innerText.replace("x ","")),
    })
}


async function sendData(type,cart,token) {
    let res = await axios.post("/client/api/payment/", {
        type: type,
        cart: cart,
        token: token
    })
    sessionStorage.setItem("message", res.data.message)
    await axios.delete("client/api/payment/")
    window.location="/"
}

var stripeHandler = StripeCheckout.configure({
    key: stripePublicKey,
    locale: 'en',
    token: async function(token){
        await sendData("card",cart,token.id);
    }
});

const purchase = async () => {
    var priceElement = document.getElementsByClassName("cost")[0];
    var price = parseFloat(priceElement.innerText.replace('$','')) * 100;
    for (index = 2; index < 3 && !(document.getElementsByClassName("payment__input")[index].checked); index++);
    switch (index) {
        case 2:
            await sendData("direct",cart,"0")
            break;
        case 3:
            stripeHandler.open({ amount: price })
            break;
    }
}


order.addEventListener('click',purchase);




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
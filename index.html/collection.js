/* =====================================================
   VELOURA SKIN
   COLLECTION CART
===================================================== */

let cart = [];


/* =====================================================
   ELEMENTS
===================================================== */

const cartButtons = document.querySelectorAll(".add-to-cart");

const cartCount = document.getElementById("cart-count");

const cartItems = document.getElementById("cart-items");

const cartTotal = document.getElementById("cart-total");

const whatsappCheckout =
    document.getElementById("whatsapp-checkout");

const onlinePayment =
    document.getElementById("online-payment");


/* =====================================================
   ADD TO CART
===================================================== */

cartButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const name = button.dataset.name;

        const price = Number(button.dataset.price);

        const image = button.dataset.image;


        cart.push({
            name: name,
            price: price,
            image: image
        });


        updateCart();


        /* Scroll gently to cart */

        document
            .getElementById("shopping-cart")
            .scrollIntoView({
                behavior: "smooth"
            });

    });

});


/* =====================================================
   UPDATE CART
===================================================== */

function updateCart() {

    cartCount.textContent = cart.length;


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p>Your cart is currently empty.</p>
        `;

        cartTotal.textContent = "0";

        return;
    }


    cartItems.innerHTML = "";


    let total = 0;


    cart.forEach(function (product, index) {

        total += product.price;


        const item = document.createElement("div");

        item.className = "cart-item";


        item.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}"
            >

            <div class="cart-item-info">

                <h3>
                    ${product.name}
                </h3>

                <p>
                    ₦${product.price.toLocaleString()}
                </p>

            </div>

            <button
                class="remove-button"
                onclick="removeFromCart(${index})">

                REMOVE

            </button>

        `;


        cartItems.appendChild(item);

    });


    cartTotal.textContent =
        total.toLocaleString();

}


/* =====================================================
   REMOVE FROM CART
===================================================== */

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

}


/* =====================================================
   WHATSAPP CHECKOUT
===================================================== */

whatsappCheckout.addEventListener(
    "click",
    function () {

        if (cart.length === 0) {

            alert(
                "Your shopping bag is empty. Please add a product first."
            );

            return;
        }


        let message =
            "Hello VELOURA SKIN! I would like to place an order:%0A%0A";


        let total = 0;


        cart.forEach(function (product, index) {

            total += product.price;


            message +=
                (index + 1) +
                ". " +
                product.name +
                " - ₦" +
                product.price.toLocaleString() +
                "%0A";

        });


        message +=
            "%0ATotal: ₦" +
            total.toLocaleString();


        const whatsappNumber =
            "2348033478890";


        const whatsappURL =
            "https://wa.me/" +
            whatsappNumber +
            "?text=" +
            message;


        window.open(
            whatsappURL,
            "_blank"
        );

    }
);


/* =====================================================
   ONLINE PAYMENT
===================================================== */

onlinePayment.addEventListener(
    "click",
    function () {

        if (cart.length === 0) {

            alert(
                "Your shopping bag is empty. Please add a product first."
            );

            return;
        }


        /*
           This is a SAMPLE payment page.

           It does NOT process real money.

           It simply takes the customer
           to your payment.html page.
        */

        window.location.href =
            "payment.html";

    }
);


/* =====================================================
   INITIAL CART
===================================================== */

updateCart();
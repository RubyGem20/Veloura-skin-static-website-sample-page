/* =====================================================
   VELOURA SKIN
   SHOPPING CART / CHECKOUT
===================================================== */


/* =====================================================
   CART
===================================================== */

/*
    Load existing cart from localStorage.
    If there is no saved cart, start with an empty cart.
*/

let cart =
    JSON.parse(localStorage.getItem("velouraCart")) || [];


/* =====================================================
   PAGE ELEMENTS
===================================================== */

const cartButtons =
    document.querySelectorAll(".add-to-cart");

const cartCount =
    document.getElementById("cart-count");

const cartItems =
    document.getElementById("cart-items");

const cartTotal =
    document.getElementById("cart-total");

const whatsappCheckout =
    document.getElementById("whatsapp-checkout");

const onlinePayment =
    document.getElementById("online-payment");


/* =====================================================
   ADD PRODUCTS TO CART
===================================================== */

cartButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const product = {

            name: button.dataset.name,

            price: Number(button.dataset.price),

            image: button.dataset.image

        };


        /*
            Add the selected product to the cart.
            This works for ALL products that have
            the .add-to-cart class and data attributes.
        */

        cart.push(product);


        /*
            Update the cart and save it.
        */

        updateCart();


        /*
            Confirmation message.
        */

        alert(
            product.name +
            " has been added to your cart."
        );

    });

});


/* =====================================================
   UPDATE CART
===================================================== */

function updateCart() {

    /*
        Save the current cart.
    */

    localStorage.setItem(
        "velouraCart",
        JSON.stringify(cart)
    );


    /*
        Update cart number in the header.
    */

    if (cartCount) {

        cartCount.textContent = cart.length;

    }


    /*
        Stop here if this page does not contain
        the shopping-cart section.
    */

    if (!cartItems || !cartTotal) {

        return;

    }


    /*
        Show empty-cart message.
    */

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p>
                Your cart is currently empty.
            </p>
        `;

        cartTotal.textContent = "0";

        return;

    }


    /*
        Clear previous cart contents.
    */

    cartItems.innerHTML = "";


    let total = 0;


    /* =================================================
       DISPLAY EACH PRODUCT
    ================================================= */

    cart.forEach(function(product, index) {

        total += product.price;


        const item =
            document.createElement("div");


        /*
            cart-item allows the CSS to style
            the product as a compact shopping-cart box.
        */

        item.className = "cart-item";


        item.innerHTML = `

            <div class="cart-item-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

            </div>


            <div class="cart-item-info">

                <h3>
                    ${product.name}
                </h3>

                <p>
                    ₦${product.price.toLocaleString()}
                </p>

            </div>


            <button
                class="remove-cart-item"
                type="button"
                onclick="removeFromCart(${index})"
            >
                REMOVE
            </button>

        `;


        cartItems.appendChild(item);

    });


    /*
        Display total.
    */

    cartTotal.textContent =
        total.toLocaleString();

}


/* =====================================================
   REMOVE PRODUCT FROM CART
===================================================== */

function removeFromCart(index) {

    /*
        Remove the selected product.
    */

    cart.splice(index, 1);


    /*
        Refresh the cart.
    */

    updateCart();

}


/*
    Keep this function available to the HTML.
*/

window.removeFromCart = removeFromCart;


/* =====================================================
   WHATSAPP CHECKOUT
===================================================== */

if (whatsappCheckout) {

    whatsappCheckout.addEventListener(
        "click",
        function() {

            /*
                Do not allow checkout with an
                empty cart.
            */

            if (cart.length === 0) {

                alert(
                    "Your cart is empty. Please add a product first."
                );

                return;

            }


            /*
                Start WhatsApp order message.
            */

            let message =
                "Hello VELOURA SKIN!%0A%0A" +
                "I would like to place an order:%0A%0A";


            let total = 0;


            /*
                Add every product in the cart
                to the WhatsApp message.
            */

            cart.forEach(function(product, index) {

                total += product.price;


                message +=
                    (index + 1) +
                    ". " +
                    product.name +
                    " - ₦" +
                    product.price.toLocaleString() +
                    "%0A";

            });


            /*
                Add total price.
            */

            message +=
                "%0A*Total: ₦" +
                total.toLocaleString() +
                "*";


            /*
                VELOURA SKIN WhatsApp number.
            */

            const whatsappNumber =
                "2348033478890";


            const whatsappURL =
                "https://wa.me/" +
                whatsappNumber +
                "?text=" +
                message;


            /*
                Open WhatsApp in a new tab.
            */

            window.open(
                whatsappURL,
                "_blank"
            );

        }
    );

}


/* =====================================================
   ONLINE PAYMENT
===================================================== */

if (onlinePayment) {

    onlinePayment.addEventListener(
        "click",
        function() {

            /*
                Do not allow payment with
                an empty cart.
            */

            if (cart.length === 0) {

                alert(
                    "Your cart is empty. Please add a product first."
                );

                return;

            }


            /*
                Save cart before going
                to the payment page.
            */

            localStorage.setItem(
                "velouraCart",
                JSON.stringify(cart)
            );


            /*
                Take the customer to
                payment.html.
            */

            window.location.href =
                "payment.html";

        }
    );

}


/* =====================================================
   INITIAL CART LOAD
===================================================== */

/*
    Run immediately when the page loads.

    This means:
    - Cart count is restored.
    - Saved products appear in the cart.
    - Cart total is restored.
*/

updateCart();
const products = [
    {
        id: 1,
        name: "Coca-Cola",
        price: 12000,
        barcode: "4780001234567"
    }
];

let cart = [];

const productsList = document.querySelector("#productsList");
const cartList = document.querySelector("#cartList");
const totalPrice = document.querySelector("#totalPrice");
const sellBtn = document.querySelector("#sellBtn");


function renderProducts() {

    productsList.innerHTML = "";

    products.forEach(product => {

        productsList.innerHTML += `
            <div class="product">

                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>${product.price.toLocaleString()} so'm</p>
                </div>

                <button 
                    class="add-btn"
                    onclick="addToCart(${product.id})"
                >
                    +
                </button>

            </div>
        `;

    });
}


function addToCart(productId) {

    const product = products.find(product => product.id === productId);

    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }

    renderCart();
}


function renderCart() {

    cartList.innerHTML = "";

    let total = 0;

    cart.forEach(item => {

        const itemTotal = item.price * item.quantity;

        total += itemTotal;

        cartList.innerHTML += `
            <div class="cart-item">

                <span>
                    ${item.name} × ${item.quantity}
                </span>

                <span>
                    ${itemTotal.toLocaleString()} so'm
                </span>

            </div>
        `;

    });

    totalPrice.textContent = total.toLocaleString();
}


sellBtn.addEventListener("click", () => {

    if (cart.length === 0) {
        alert("Savat bo'sh!");
        return;
    }

    alert("Savdo muvaffaqiyatli amalga oshirildi!");

    cart = [];

    renderCart();

});


function renderCart() {

    cartList.innerHTML = "";

    let total = 0;

    cart.forEach(item => {

        const itemTotal = item.price * item.quantity;

        total += itemTotal;

        cartList.innerHTML += `
            <div class="cart-item">

                <div>
                    <strong>${item.name}</strong>
                    <span>
                        ${item.quantity} × ${item.price.toLocaleString()} so'm
                    </span>
                </div>

                <div>
                    <span>
                        ${itemTotal.toLocaleString()} so'm
                    </span>

                    <button
                        class="delete-btn"
                        onclick="removeFromCart(${item.id})"
                    >
                        🗑️
                    </button>
                </div>

            </div>
        `;

    });

    totalPrice.textContent = total.toLocaleString();
}


function removeFromCart(productId) {

    cart = cart.filter(item => item.id !== productId);

    renderCart();
}

const scanBtn = document.querySelector("#scanBtn");

const reader = new Html5Qrcode("reader");

scanBtn.addEventListener("click", () => {

    reader.start(
        { facingMode: "environment" },
        {
            fps: 10,
            qrbox: {
                width: 250,
                height: 150
            }
        },

        (decodedText) => {

            console.log("Barcode:", decodedText);

            const product = products.find(
                product => product.barcode === decodedText
            );

            if (product) {

                addToCart(product.id);

                alert(`${product.name} savatga qo'shildi`);

            } else {

                alert("Bu mahsulot bazada topilmadi");

            }

            reader.stop();

        },

        (errorMessage) => {
            // Barcode topilmagan paytda ishlaydi
        }
    );

});




renderProducts();
renderCart();

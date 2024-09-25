let cart = [];

async function fetchData() {
    let resp = await fetch('https://fakestoreapi.com/products');
    let products = await resp.json();
    display(products);
}

function display(products) {
    /* query productList */
    const productList = document.querySelector('.productList');
    /* creating prod card */
    products.forEach((product) => {
        const card = document.createElement('div');
        card.className = 'productCard';
        card.innerHTML = `
            <img src=${product.image} loading="lazy" alt=${product.title}>
            <h2>${product.title}</h2>
            <h3>
                <span style="color:white; font-size:2rem">★ </span>
                <span>${product.rating.rate}</span>
            </h3>
            <h1>$ ${product.price}</h1>
            <a href='#cart'>
                <button class="addToCart">Add to Cart</button>
            </a>`;
        /* append to productList */
        productList.appendChild(card);
        /* Button AddEventListener */
        card.querySelector('button').addEventListener('click', () => handleAddToCart(product));
    });
}

/* Handling Button Listener */
function handleAddToCart(product) {
    /* Checking for existing product */
    const existProduct = cart.find(item => item.id === product.id);
    /* Add product to card */
    if (existProduct) {
        existProduct.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    updateCart(); //UI UPDATION
}

/* Handling Remove Cart */
function handleRemoveFromCart(productId) {
    cart = cart.filter((item) => item.id != productId);
    updateCart();
}

/* Qty-Ctrl Btn Event */
function handleQtyCtrlBtn(action, prodId) {
    const productItem = cart.find(item => item.id === prodId);
    if (action === 'incr') {
        productItem.qty += 1;
    } else {
        if (productItem.qty != 1) {
            productItem.qty -= 1;
        }
        else {
            cart = cart.filter((item) => item.id != prodId);
        }
    }
    updateCart();
}

function handlePlaceOrder() {
    for (let i = 0; i < cart.length; i++) {
        delete cart[i];
    }
    cart.length = 0;
    alert('Order Placed Successfully');
    updateCart();
}

/* UpdateCart func */
function updateCart() {
    /* query cartProducts */
    const cartDiv = document.querySelector('.cartDiv');
    cartDiv.innerHTML = '';
    let totalMrp = 0;

    if (cart.length == 0) {
        const EmptyCart = document.createElement('h2');
        EmptyCart.innerHTML = 'Cart is Empty!! Add Products to Cart!!';
        cartDiv.appendChild(EmptyCart);
    }

    cart.forEach((item) => {
        /* creating cardProductElements */
        const cartItem = document.createElement('div');
        cartItem.className = 'cartItem';

        cartItem.innerHTML = `
        <button class="closeButton">&times;</button>
        <img src=${item.image} loading="lazy" alt=${item.title}>
        <div>
            <h3>${item.title}</h3>
            <h2>
                <span style="text-decoration: line-through;">$ ${item.price}</span>
                $ ${(item.price * 0.8).toFixed(2)}
                <br/>
                <span class='blink-anime'>20% OFF</span>
            </h2>
            <div class='qty-ctrl'>
                <button class="qty-btn desc">-</button>
                <span>${item.qty}</span>
                <button class="qty-btn incr">+</button>
            </h1>
        </div>`;

        /* append to cartProducts */
        cartDiv.appendChild(cartItem);

        /* Button AddEventListener */
        cartItem.querySelector('.closeButton').addEventListener('click', () => { handleRemoveFromCart(item.id) });
        cartItem.querySelector('.desc').addEventListener('click', () => { handleQtyCtrlBtn('desc', item.id) })
        cartItem.querySelector('.incr').addEventListener('click', () => { handleQtyCtrlBtn('incr', item.id) })

        /* Total MRP update */
        totalMrp += item.price * item.qty * 0.8;
    })


    /* Price Summary Details */
    const priceDiv = document.querySelector('.priceDiv');
    let ShippingCost;
    totalMrp > 500 ? ShippingCost = 0 : ShippingCost = 20;
    if (cart.length == 0) {
        priceDiv.innerHTML = '';
    }
    else {
        priceDiv.innerHTML = `
        <table>
             <thead>
                <th colspan="2">Price Details</th>
            </thead>
            <tbody>
                <tr>
                    <td>Total MRP</td>
                    <td>$ ${totalMrp.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Coupon Discount</td>
                    <td>$ 50</td>
                </tr>
                <tr>
                    <td>Platform Fee</td>
                    <td>$ 10</td>
                </tr>
                <tr>
                    <td>Shipping Charges</td>
                    <td>$ ${ShippingCost}</td>
                </tr>
                <tr>
                    <td>Total Amount</td>
                    <td style='font-weight:bolder'>$ ${(totalMrp + 20).toFixed(2)}</td>
                </tr>
               <tr>
                    <td colspan="2">
                        <button class='placeButton'>Place Order</button>
                    </td>
                </tr>
            </tbody>
        </table>`
        priceDiv.querySelector('.placeButton').addEventListener('click', () => { handlePlaceOrder(); });
    }
};

fetchData();

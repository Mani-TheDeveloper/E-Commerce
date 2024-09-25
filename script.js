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
    /* Add product to card */
    cart.push(product);
    updateCart(); //UI UPDATION
}

/* Handling Remove Cart */
function handleRemoveFromCart(productId) {
    cart = cart.filter((item) => item.id != productId);
    updateCart();
}

function handlePlaceBtn(){
    alert('Placed Order Successfully');
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
        <button class="closeButton">X</button>
        <img src=${item.image} loading="lazy" alt=${item.title}>
        <div>
        <h3>${item.title}</h3>
        <h2>$ ${item.price}</h2>
        </div>`;

        /* append to cartProducts */
        cartDiv.appendChild(cartItem);

        /* Button AddEventListener */
        cartItem.querySelector('button').addEventListener('click', () => { handleRemoveFromCart(item.id) });

        /* Total MRP update */
        totalMrp += item.price;
    })


    /* Price Summary Details */
    const priceDiv = document.querySelector('.priceDiv');
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
                    <td>$ 20</td>
                </tr>
                <tr>
                    <td>Total Amount</td>
                    <td>$ ${totalMrp.toFixed(2) + 20}</td>
                </tr>
               <tr>
                    <td>
                        <button class='placeButtton'>Place Order</button>
                    </td>
                </tr>
            </tbody>
        </table>`
        priceDiv.querySelector('.placeButton').addEventListener('click', () => { handlePlaceBTn() });
    }
};

fetchData();

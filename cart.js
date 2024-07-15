// Function to format prices to show as whole numbers
function formatPrice(price) {
    return `₹${Math.round(price)}`; // Round the price to the nearest whole number
}

// Function to display cart items in the cart page
function displayCart() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.querySelector('.cart-items');
    cartContainer.innerHTML = '';

    cartItems.forEach((item, index) => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        cartItemElement.innerHTML = `
            <h3>${item.name}</h3>
            <p>Price: ${formatPrice(item.price)}</p> <!-- Formatted price -->
            <p>Quantity: ${item.quantity}</p>
            <button class="btn delete-item" data-index="${index}">Remove</button>
        `;
        cartContainer.appendChild(cartItemElement);
    });

    const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    document.getElementById('cartTotal').textContent = formatPrice(cartTotal); // Formatted total
}

// Function to place an order
function placeOrder() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    if (cartItems.length === 0) {
        alert('Your cart is empty.');
        return;
    }
    localStorage.removeItem('cart'); // Clear the cart
    displayCart(); // Refresh the cart display
    document.getElementById('orderMessage').textContent = 'Order placed successfully!';
}

// Function to clear the cart
function clearCart() {
    localStorage.removeItem('cart');
    displayCart();
    document.getElementById('orderMessage').textContent = 'Your cart has been cleared.';
}

// Function to delete an individual item from the cart
function deleteItem(index) {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    displayCart();
}

// Event listeners for buttons
document.addEventListener('DOMContentLoaded', () => {
    displayCart();

    document.querySelector('.checkout').addEventListener('click', placeOrder);
    document.querySelector('.clear-cart').addEventListener('click', clearCart);

    document.querySelector('.cart-items').addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-item')) {
            const index = e.target.getAttribute('data-index');
            deleteItem(index);
        }
    });
});

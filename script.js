// Function to handle adding items to cart
function addToCart(event) {
    if (!event.target.classList.contains('add-to-cart')) return;
    
    const button = event.target;
    const menuItem = button.parentElement;
    const itemId = menuItem.dataset.id;
    const itemName = menuItem.dataset.name;
    const itemPrice = parseFloat(menuItem.dataset.price);

    // Create or retrieve cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if item already exists in cart
    const existingItem = cart.find(item => item.id === itemId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ id: itemId, name: itemName, price: itemPrice, quantity: 1 });
    }

    // Save updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update cart count display
    updateCartCount();

    // Optional: Provide feedback to user
    alert('Item added to cart!');
}

// Function to update cart count display
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    // Update cart count display in navigation
    const cartCountDisplay = document.getElementById('cartCount');
    if (cartCountDisplay) {
        cartCountDisplay.textContent = cartCount.toString();
    }
}

// Function to display cart items in the cart page
function displayCart() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.querySelector('.cart-items');
    cartContainer.innerHTML = '';

    cartItems.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        cartItemElement.innerHTML = `
            <h3>${item.name}</h3>
            <p>Price: $${item.price.toFixed(2)}</p>
            <p>Quantity: ${item.quantity}</p>
            <button class="btn btn-remove" data-id="${item.id}">Remove</button>
        `;
        cartContainer.appendChild(cartItemElement);
    });

    // Update total price
    const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    document.getElementById('cartTotal').textContent = `$${cartTotal.toFixed(2)}`;
}

// Function to handle removing items from cart
function removeFromCart(event) {
    if (!event.target.classList.contains('btn-remove')) return;

    const itemId = event.target.dataset.id;
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Remove item from cart
    cart = cart.filter(item => item.id !== itemId);

    // Save updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update cart display
    displayCart();
    updateCartCount();
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount(); // Initialize cart count display
    displayCart(); // Display cart items on cart page load
});

document.querySelector('.menu-items').addEventListener('click', addToCart);
document.querySelector('.cart-items').addEventListener('click', removeFromCart);

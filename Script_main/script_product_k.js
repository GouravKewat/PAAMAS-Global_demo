document.addEventListener('DOMContentLoaded', function () {
    // const shipping = document.getElementById('shipping');
    const kitContainer = document.getElementById('kit-container');
    const cartContent = document.getElementById('cart-content');
    // const maincontainer = document.querySelector('.main-container');
    const totalItems = document.getElementById('total-items');
    const subtotal = document.getElementById('subtotal');
 
    const totalAmount = document.getElementById('total-amount');
    const checkoutBtn = document.getElementById('checkout-btn');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Static data
    const data = [
        { id: 1, name: "Level -1", price: 1250, description: "2 Books (Abacus slate, Certificate, Bag, T-shirt)", image: "./asset/level-1.jpeg" },
        { id: 2, name: "Level -2", price: 520, description: "2 Books, Certificate", image: "./asset/level-2.jpeg" },
        { id: 3, name: "Level -3", price: 520, description: "2 Books (Booklet multiply, Division, Certificate)", image: "./asset/logo.png" },
        { id: 4, name: "Level -4", price: 520, description: "2 Books, Certificate", image: "./asset/logo.png" },
        { id: 5, name: "Level -5", price: 520, description: "2 Books, Certificate", image: "./asset/logo.png" },
        { id: 6, name: "Level -6", price: 520, description: "2 Books, Certificate", image: "./asset/logo.png" },
        { id: 7, name: "Level -7", price: 520, description: "2 Books, Certificate", image: "./asset/logo.png" },
        { id: 8, name: "Level -8", price: 520, description: "2 Books, Certificate", image: "./asset/logo.png" },
        { id: 9, name: "T-shirt", price: 300, description: "T-shirt for Student all sizes", image: "./asset/shirt.jpeg" },
        { id: 10, name: "Bag", price: 300, description: "Paamas Global Bag", image: "./asset/bag.jpeg" },
        { id: 11, name: "Student Abacus tool", price: 120, description: "Abacus tool for Student.", image: "./asset/student.jpeg" },
        { id: 12, name: "Teacher Abacus tool", price: 3000, description: "Abacus tool for Teacher", image: "./asset/teachers.jpeg" }

    ];

    // Render kit items
    function renderKits() {
        kitContainer.innerHTML = '';
        data.forEach(kit => {
            const kitItem = document.createElement('div');
            kitItem.className = 'kit-item';
            kitItem.innerHTML = `
                <img src="${kit.image}" alt="${kit.name}" class="kit-image">
                <h3 class="kit-name">${kit.name}</h3>
                <p class="kit-description">${kit.description}</p>
                <p class="kit-price">₹${kit.price}</p>
                <button class="add-to-cart">ADD TO CART</button>
            `;
            kitItem.querySelector('.add-to-cart').addEventListener('click', () => addToCart(kit));
            kitContainer.appendChild(kitItem);
        });
    }

    // Add to cart
    function addToCart(kit) {
        const existingItem = cart.find(item => item.id === kit.id);
        if (existingItem) {
            existingItem.qty += 1;
        } else {
            cart.push({ ...kit, qty: 1 });
        }
        updateCartCount();
        renderCart();
        updateQuantity(0,0);
        alert(`${kit.name} added to cart!`);
    }

    // Update cart count
    function updateCartCount() {
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            cartCount.textContent = cart.length;
        }
    }

    // Render cart items
    function renderCart() {
        if (!cartContent) return;
        cartContent.innerHTML = '';

        let total = 0;
        let itemsCount = 0;
        let charge = cart.length > 0 ? 30 : 0; // Fixed shipping fee

        if (cart.length === 0) {
            cartContent.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12" y2="16"></line>
                    </svg>
                </div>
                <h4>Your Cart is Empty</h4>
                <p>Looks like you haven't added anything to your cart yet.</p>
                <button onclick="window.location.href='#'">Continue Shopping</button>
            </div>
        `;
        } else {
            cart.forEach((item, index) => {
                const itemTotal = item.price * item.qty;
                total += itemTotal;
                itemsCount += item.qty;

                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <p class="item-name">${item.name}</p>
                    <p class="item-description">${item.description}</p>
                </div>
                <div class="quantity-controls">
                    <button onclick="updateQuantity(${index}, -1)">-</button>
                    <span>${item.qty}</span>
                    <button onclick="updateQuantity(${index}, 1)">+</button>
                </div>
                <p class="item-price">₹${item.price} x ${item.qty}</p>
            `;
                cartContent.appendChild(cartItem);
            });
        }

        // Update order summary
        if (totalItems && subtotal && totalAmount) {
            totalItems.textContent = itemsCount;
            subtotal.textContent = total.toFixed(2);
            totalAmount.textContent = (total + charge).toFixed(2);
        }

        // Update cart count in the header
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            cartCount.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
        }
    }


    // Update quantity
    window.updateQuantity = function (index, change) {
        cart[index].qty += change;

        if (cart[index].qty < 1) {
            cart.splice(index, 1); // Remove item if quantity is 0
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        renderCart();
    };

    // Checkout
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function () {
            alert('Redirecting to checkout...');
            window.location.href = './checkout.html'; // Redirect to checkout page
        renderCart();
        });
    }

    // Initial render
    renderKits();
    if (cartContent) {
        renderCart();
    }
});
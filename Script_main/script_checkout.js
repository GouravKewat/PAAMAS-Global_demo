document.addEventListener('DOMContentLoaded', function () {
    const totalItems = document.getElementById('total-items');
    const subtotal = document.getElementById('subtotal');
    const cartContent = document.getElementById('cart-content');
    const shipping = document.getElementById('shipping');
    const totalAmount = document.getElementById('total-amount');
    const confirmOrderBtn = document.getElementById('confirm-order-btn');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Render order summary
    function renderOrderSummary() {
        let total = 0;
        let itemsCount = 0;

        cart.forEach(item => {
            total += item.price * item.qty;
            itemsCount += item.qty;
        });

        if (totalItems && subtotal && totalAmount) {
            totalItems.textContent = itemsCount;
            subtotal.textContent = total.toFixed(2);
            totalAmount.textContent = (total + 30).toFixed(2); // Add shipping
        }
    }

    // Render cart items
    function renderCart() {
        if (cartContent) {
            cartContent.innerHTML = '';
            let total = 0;
            let itemsCount = 0;
            let charge=30;

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
                        <button onclick="window.location.href='./product_k.html'">Continue Shopping</button>
                    </div>
                `;
            } else {
                cart.forEach((item, index) => {
                    const itemTotal = item.price * item.qty;
                    total += itemTotal;
                    itemsCount += item.qty;
                    charge*=itemsCount;

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
                        <p class="item-price"> ₹${item.price} x ${item.qty}</p>
                             `;
                    cartContent.appendChild(cartItem);
                });
            }

            // Update cart count
            function updateCartCount() {
                const cartCount = document.getElementById('cart-count');
                if (cartCount) {
                    cartCount.textContent = cart.length;
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

            // Update order summary
            if (totalItems && subtotal && totalAmount) {
                totalItems.textContent = itemsCount;
                subtotal.textContent = total.toFixed(2);
                // if (itemsCount > 0)
                totalAmount.textContent = (total + charge).toFixed(2); // Add shipping
            }
        }
    }

    // Confirm Order
    if (confirmOrderBtn) {
        confirmOrderBtn.addEventListener('click', function (e) {
            e.preventDefault();
            alert('Order confirmed! Thank you for your purchase.');
            localStorage.removeItem('cart'); // Clear cart after order confirmation
            window.location.href = './product_k.html'; // Redirect to shop page
        });
    }

    // Initial render
    renderOrderSummary();
    renderCart();
});
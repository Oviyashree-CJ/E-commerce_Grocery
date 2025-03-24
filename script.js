// index page

document.addEventListener("DOMContentLoaded", () => {
    updateAuthButton();
});

function updateAuthButton() {
    const username = localStorage.getItem("username");
    const authButton = document.getElementById("authButton");

    if (username) {
        authButton.innerHTML = `
            <div class="dropdown">
                <button class="btn btn-success dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown">
                    ${username}
                </button>
                <ul class="dropdown-menu bg-light-green">
                    <li><a class="dropdown-item" href="#" id="logout" onclick="logout()">Logout</a></li>
                </ul>
            </div>
        `;
    } else {
        authButton.innerHTML = `<a href="login.html" class="btn btn-success">Login</a>`;
    }
}

// logout

function logout() {
    if (confirm("Are you sure you want to log out?")) {
        localStorage.removeItem("username");
        updateAuthButton();
    }
}
//  cart
document.addEventListener("DOMContentLoaded", function () {
    updateCartCount();
    
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            let itemName = this.getAttribute("data-name");
            let itemPrice = parseFloat(this.getAttribute("data-price"));
            let itemImage = this.getAttribute("data-image");

            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            let existingItem = cart.find(item => item.name === itemName);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ name: itemName, price: itemPrice, quantity: 1, image: itemImage });
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartCount();
            alert(`${itemName} added to cart!`);
        });
    });
});

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("cart-count").innerText = totalCount;
}


// CART PAGE

document.addEventListener("DOMContentLoaded", function () {
    displayCartItems();
});

function displayCartItems() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartTable = document.getElementById("cart-items");
    let totalAmount = 0;

    cartTable.innerHTML = "";

    cart.forEach((item, index) => {
        let itemTotal = item.price * item.quantity;
        totalAmount += itemTotal;

        let row = `
            <tr>
                <td>${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>
                    <button class="btn btn-sm btn-outline-danger" onclick="updateQuantity(${index}, -1)">-</button>
                    <span class="mx-2">${item.quantity}</span>
                    <button class="btn btn-sm btn-outline-success" onclick="updateQuantity(${index}, 1)">+</button>
                </td>
                <td>$${itemTotal.toFixed(2)}</td>
                <td><button class="btn btn-sm btn-danger" onclick="removeItem(${index})">Remove</button></td>
            </tr>
        `;
        cartTable.innerHTML += row;
    });

    document.getElementById("cart-total").innerText = totalAmount.toFixed(2);
}

function updateQuantity(index, change) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    displayCartItems();
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCartItems();
}

function clearCart() {
    if (confirm("Are you sure you want to clear the cart?")) {
        localStorage.removeItem("cart");
        displayCartItems();
    }
}

// PRODUCTS PAGE

window.onload = function() {
    document.getElementById("all").classList.remove("hidden");
};
function showSection(section) {
    // Hide all sections
    document.querySelectorAll('.product-card').forEach(el => {
        el.classList.add('hidden');
    });

    // Show the selected section
    document.getElementById(section).classList.remove('hidden');
}

document.addEventListener("DOMContentLoaded", function () {
document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", function () {
        let itemName = this.getAttribute("data-name");
        let itemPrice = parseFloat(this.getAttribute("data-price"));

        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let existingItem = cart.find(item => item.name === itemName);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name: itemName, price: itemPrice, quantity: 1});
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${itemName} added to cart!`);
    });
});
});
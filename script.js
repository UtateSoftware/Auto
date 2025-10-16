// script.js - Funcionalidad principal

// Elementos del DOM
const navbar = document.querySelector('.navbar');
const navList = document.querySelector('.nav-list');
const hamburger = document.querySelector('.hamburger');
const cartBtn = document.querySelector('.cart-icon');
const closeCart = document.querySelector('.close-cart');
const clearCart = document.querySelector('.clear-cart');
const cartOverlay = document.querySelector('.cart-overlay');
const cartContent = document.querySelector('.cart-content');
const cartTotal = document.querySelector('.cart-total');
const cartCount = document.querySelector('.cart-count');
const productsCenter = document.querySelector('.products-center');
const filterBtns = document.querySelectorAll('.filter-btn');

// Carrito
let cart = [];

// Mostrar/Ocultar menú en móvil
hamburger.addEventListener('click', () => {
    navList.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-list a').forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Mostrar/Ocultar carrito
cartBtn.addEventListener('click', () => {
    cartOverlay.classList.add('show');
});

closeCart.addEventListener('click', () => {
    cartOverlay.classList.remove('show');
});

// Scroll header efecto
window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mostrar productos
function displayProducts(filteredProducts = productos) {
    productsCenter.innerHTML = filteredProducts.map(product => {
        return `
            <article class="product">
                <div class="product-header">
                    <img src="${product.imagen}" alt="${product.nombre}">
                    ${product.destacado ? '<span class="destacado">Destacado</span>' : ''}
                </div>
                <div class="product-footer">
                    <h3>${product.nombre}</h3>
                    <div class="price">$${product.precio.toLocaleString()}</div>
                    <p class="desc">${product.descripcion}</p>
                    <button class="add-to-cart btn" data-id="${product.id}">Agregar al Carrito</button>
                </div>
            </article>
        `;
    }).join('');

    // Agregar event listeners a los botones
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', addToCart);
    });
}

// Filtrar productos
filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const category = e.currentTarget.dataset.id;
        filterBtns.forEach(btn => btn.classList.remove('active'));
        e.currentTarget.classList.add('active');
        
        if (category === 'todos') {
            displayProducts();
        } else {
            const filteredProducts = productos.filter(product => product.categoria === category);
            displayProducts(filteredProducts);
        }
    });
});

// Agregar al carrito
function addToCart(e) {
    const id = e.currentTarget.dataset.id;
    const product = productos.find(item => item.id === parseInt(id));
    const cartItem = cart.find(item => item.id === parseInt(id));
    
    if (cartItem) {
        // Si ya está en el carrito, aumentar cantidad
        cart = cart.map(item => {
            if (item.id === parseInt(id)) {
                item.quantity += 1;
            }
            return item;
        });
    } else {
        // Si no está, agregarlo
        const newItem = {
            ...product,
            quantity: 1
        };
        cart = [...cart, newItem];
    }
    
    updateCart();
    showAlert('Producto agregado al carrito');
}

// Mostrar alerta
function showAlert(message) {
    const alert = document.createElement('div');
    alert.className = 'alert';
    alert.textContent = message;
    document.body.appendChild(alert);
    
    setTimeout(() => {
        alert.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        alert.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(alert);
        }, 300);
    }, 2000);
}

// Actualizar carrito
function updateCart() {
    // Actualizar contenido del carrito
    cartContent.innerHTML = cart.map(item => {
        return `
            <div class="cart-item">
                <img src="${item.imagen}" alt="${item.nombre}">
                <div>
                    <h4>${item.nombre}</h4>
                    <h5>$${item.precio.toLocaleString()}</h5>
                    <span class="remove-item" data-id="${item.id}">eliminar</span>
                </div>
                <div>
                    <i class="fas fa-chevron-up" data-id="${item.id}"></i>
                    <p class="item-amount">${item.quantity}</p>
                    <i class="fas fa-chevron-down" data-id="${item.id}"></i>
                </div>
            </div>
        `;
    }).join('') || '<p class="empty-cart">Tu carrito está vacío</p>';
    
    // Actualizar total
    const total = cart.reduce((acc, item) => {
        return acc + (item.precio * item.quantity);
    }, 0);
    cartTotal.textContent = total.toLocaleString();
    
    // Actualizar contador
    const count = cart.reduce((acc, item) => {
        return acc + item.quantity;
    }, 0);
    cartCount.textContent = count;
    
    // Agregar event listeners
    const removeItems = document.querySelectorAll('.remove-item');
    const upArrows = document.querySelectorAll('.fa-chevron-up');
    const downArrows = document.querySelectorAll('.fa-chevron-down');
    
    removeItems.forEach(btn => {
        btn.addEventListener('click', removeItem);
    });
    
    upArrows.forEach(btn => {
        btn.addEventListener('click', increaseAmount);
    });
    
    downArrows.forEach(btn => {
        btn.addEventListener('click', decreaseAmount);
    });
}

// Eliminar item del carrito
function removeItem(e) {
    const id = e.currentTarget.dataset.id;
    cart = cart.filter(item => item.id !== parseInt(id));
    updateCart();
    showAlert('Producto eliminado del carrito');
}

// Aumentar cantidad
function increaseAmount(e) {
    const id = e.currentTarget.dataset.id;
    cart = cart.map(item => {
        if (item.id === parseInt(id)) {
            item.quantity += 1;
        }
        return item;
    });
    updateCart();
}

// Disminuir cantidad
function decreaseAmount(e) {
    const id = e.currentTarget.dataset.id;
    cart = cart.map(item => {
        if (item.id === parseInt(id)) {
            if (item.quantity > 1) {
                item.quantity -= 1;
            }
        }
        return item;
    });
    updateCart();
}

// Vaciar carrito
clearCart.addEventListener('click', () => {
    cart = [];
    updateCart();
    showAlert('Carrito vaciado');
});

// Finalizar compra
document.querySelector('.checkout').addEventListener('click', () => {
    if (cart.length === 0) {
        showAlert('El carrito está vacío');
    } else {
        cart = [];
        updateCart();
        cartOverlay.classList.remove('show');
        showAlert('¡Compra realizada con éxito! Gracias por tu compra');
    }
});

// Inicializar la aplicación
function init() {
    displayProducts();
    updateCart();
}

init();

// Estilos dinámicos para las alertas
const style = document.createElement('style');
style.textContent = `
    .alert {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--secondary-color);
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 3000;
    }
    .alert.show {
        opacity: 1;
        bottom: 30px;
    }
`;
document.head.appendChild(style);
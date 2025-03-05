// Lista del carrito
let cart = [];

// Elementos del DOM
const cartModal = document.getElementById('cartModal');
const cartList = document.getElementById('cartList');
const cartEmpty = document.getElementById('cartEmpty');
const cartBtn = document.querySelector('.cart-btn');
const cartCount = document.querySelector('.cart-count');
const closeCart = document.getElementById('closeCart');
const orderBtn = document.getElementById('orderBtn');
const orderModal = document.getElementById('orderModal');
const orderForm = document.getElementById('orderForm');
const cancelOrder = document.getElementById('cancelOrder');
const backBtn = document.querySelector('.back-btn');
const addButtons = document.querySelectorAll('.add-btn');

// Función para actualizar el carrito
function updateCart() {
    cartList.innerHTML = '';
    if (cart.length === 0) {
        cartEmpty.style.display = 'block';
        cartList.style.display = 'none';
        orderBtn.disabled = true;
    } else {
        cartEmpty.style.display = 'none';
        cartList.style.display = 'block';
        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - ${item.type}`;
            cartList.appendChild(li);
        });
        orderBtn.disabled = false;
    }
    cartCount.textContent = cart.length;
}

// Abrir el carrito
cartBtn.addEventListener('click', () => {
    cartModal.style.display = 'flex';
    updateCart();
});

// Cerrar el carrito
closeCart.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

// Agregar productos al carrito
addButtons.forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const type = button.getAttribute('data-type');
        cart.push({ name, type });
        updateCart();
    });
});

// Confirmación al regresar
backBtn.addEventListener('click', (e) => {
    if (cart.length > 0) {
        e.preventDefault();
        const confirmLeave = confirm('Si regresas a la página principal, los productos en el carrito se perderán. ¿Estás seguro?');
        if (confirmLeave) {
            window.location.href = backBtn.href;
        }
    }
});

// Abrir el formulario de orden
orderBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('El carrito está vacío. Agrega productos antes de ordenar.');
        return;
    }
    cartModal.style.display = 'none';
    orderModal.style.display = 'flex';
});

// Cancelar el formulario
cancelOrder.addEventListener('click', () => {
    orderModal.style.display = 'none';
});

// Enviar la orden
orderForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();

    if (!phone.match(/^\+\d{10,15}$/)) {
        alert('Por favor, ingresa un número de teléfono válido (ej. +1234567890).');
        return;
    }

    // Crear el pedido
    const order = {
        name,
        phone,
        address,
        products: cart,
        timestamp: new Date().toISOString()
    };

    // Obtener pedidos existentes de localStorage
    let orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    // Limpiar el carrito
    cart = [];
    updateCart();

    // Cerrar modal y redirigir
    orderModal.style.display = 'none';
    alert('¡Orden enviada con éxito!');
    window.location.href = 'index.html';
});
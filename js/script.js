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
const phoneInput = document.getElementById('phoneInput');
const backBtn = document.querySelector('.back-btn');
const addButtons = document.querySelectorAll('.add-btn');

// Función para actualizar el carrito
function updateCart() {
    cartList.innerHTML = '';
    if (cart.length === 0) {
        cartEmpty.style.display = 'block';
        cartList.style.display = 'none';
        orderBtn.disabled = true; // Desactiva el botón si el carrito está vacío
    } else {
        cartEmpty.style.display = 'none';
        cartList.style.display = 'block';
        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - ${item.type}`;
            cartList.appendChild(li);
        });
        orderBtn.disabled = false; // Activa el botón si hay productos
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

// Ordenar y enviar mensaje por WhatsApp
orderBtn.addEventListener('click', () => {
    const phone = phoneInput.value.trim();
    if (!phone || !phone.match(/^\+\d{10,15}$/)) {
        alert('Por favor, ingresa un número de teléfono válido (ej. +1234567890).');
        return;
    }

    if (cart.length === 0) {
        alert('El carrito está vacío. Agrega productos antes de ordenar.');
        return;
    }

    // Crear el mensaje
    let message = '¡Hola! Quiero ordenar lo siguiente desde Panadería Delicia:\n\n';
    cart.forEach(item => {
        message += `- ${item.name} (${item.type})\n`;
    });
    message += '\nPor favor, indícame la dirección para la entrega. ¡Gracias!';

    // Codificar el mensaje para la URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;

    // Abrir WhatsApp
    window.open(whatsappUrl, '_blank');
    cartModal.style.display = 'none'; // Cierra el modal tras ordenar
    cart = []; // Vacía el carrito
    updateCart(); // Actualiza la vista
});
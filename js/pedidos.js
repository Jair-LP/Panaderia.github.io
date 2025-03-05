const ordersBody = document.getElementById('ordersBody');

// Cargar pedidos de localStorage
const orders = JSON.parse(localStorage.getItem('orders') || '[]');

orders.forEach(order => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${order.name}</td>
        <td>${order.phone}</td>
        <td>${order.address}</td>
        <td>${order.products.map(p => `${p.name} (${p.type})`).join('<br>')}</td>
        <td>${new Date(order.timestamp).toLocaleString()}</td>
    `;
    ordersBody.appendChild(row);
});

// Si no hay pedidos
if (orders.length === 0) {
    ordersBody.innerHTML = '<tr><td colspan="5">No hay pedidos registrados.</td></tr>';
}
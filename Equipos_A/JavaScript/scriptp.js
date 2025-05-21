// Recuperar carrito desde localStorage o iniciar vacío
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function agregarAlCarrito(nombre, precio) {
  carrito.push({ nombre, precio });
  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert(`${nombre} agregado al carrito.`);
}

function actualizarCarrito() {
  const carritoDiv = document.getElementById('carrito');
  const totalSpan = document.getElementById('total');
  if (!carritoDiv || !totalSpan) return; // Si estamos en index.html, no hay carrito que actualizar

  carritoDiv.innerHTML = "";
  let total = 0;

  carrito.forEach((item, index) => {
    total += item.precio;
    carritoDiv.innerHTML += `
      <p>${item.nombre} - $${item.precio.toLocaleString()} 
      <button onclick="eliminarDelCarrito(${index})">Eliminar</button></p>
    `;
  });

  totalSpan.textContent = total.toLocaleString();
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarCarrito();
}

function pagar() {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío.");
  } else {
    alert("Gracias por tu compra. Total: $" + document.getElementById('total').textContent);
    carrito = [];
    localStorage.removeItem("carrito");
    actualizarCarrito();
  }
}

// Actualiza carrito automáticamente si estamos en carrito.html
document.addEventListener("DOMContentLoaded", actualizarCarrito);

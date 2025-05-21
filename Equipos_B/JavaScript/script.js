document.addEventListener('DOMContentLoaded', function () {
  const popup = document.getElementById('popup');

  document.querySelectorAll('.jugador-info').forEach(jugador => {
    jugador.addEventListener('click', function (e) {
      e.stopPropagation();

      const nombre = this.dataset.nombre;
      const posicion = this.dataset.posicion;
      const edad = this.dataset.edad;
      const numero = this.dataset.numero;
      const imgUrl = this.dataset.img;

      popup.innerHTML = `
        <div class="popup-contenido">
          <img src="${imgUrl}" alt="${nombre}" class="popup-img">
          <div class="popup-detalles">
            <strong>${nombre}</strong><br>
            Posición: ${posicion}<br>
            Edad: ${edad}<br>
            Número: ${numero}
          </div>
        </div>
      `;

      const rect = this.getBoundingClientRect();
      popup.style.top = `${window.scrollY + rect.top - 100}px`;
      popup.style.left = `${rect.left}px`;
      popup.style.display = 'block';
    });
  });

  document.addEventListener('click', function () {
    popup.style.display = 'none';
  });
});

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

// Recupera el carrito almacenado en localStorage y lo convierte de JSON a objeto JS; si no existe, crea un array vacío
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Función para agregar un producto al carrito
function agregarAlCarrito(nombre, precio) {
  carrito.push({ nombre, precio }); // Añade el producto al array carrito
  localStorage.setItem("carrito", JSON.stringify(carrito)); // Guarda el carrito actualizado en localStorage como string JSON
  alert(`${nombre} agregado al carrito.`); // Muestra alerta confirmando que se agregó el producto
}

// Función para actualizar la vista del carrito en el HTML
function actualizarCarrito() {
  const carritoDiv = document.getElementById('carrito'); // Elemento donde se muestra la lista de productos
  const totalSpan = document.getElementById('total');    // Elemento donde se muestra el total acumulado
  if (!carritoDiv || !totalSpan) return; // Si no existen estos elementos en la página (por ejemplo, estamos en otra página), salir de la función

  carritoDiv.innerHTML = ""; // Limpia el contenido actual del carrito
  let total = 0;             // Inicializa variable para acumular el total

  // Recorre cada producto del carrito
  carrito.forEach((item, index) => {
    total += item.precio;    // Suma el precio del producto al total
    carritoDiv.innerHTML += `
      <p>${item.nombre} - $${item.precio.toLocaleString()} 
      <button onclick="eliminarDelCarrito(${index})">Eliminar</button></p>
    `; // Agrega el producto y un botón para eliminarlo al HTML del carrito
  });

  totalSpan.textContent = total.toLocaleString(); // Muestra el total actualizado con formato de número local
}

// Función para eliminar un producto del carrito según su índice
function eliminarDelCarrito(index) {
  carrito.splice(index, 1); // Elimina el producto en la posición indicada
  localStorage.setItem("carrito", JSON.stringify(carrito)); // Actualiza localStorage con el nuevo carrito
  actualizarCarrito(); // Actualiza la vista del carrito
}

// Función para simular el pago y limpiar el carrito
function pagar() {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío."); // Si no hay productos, avisa al usuario
  } else {
    alert("Gracias por tu compra. Total: $" + document.getElementById('total').textContent); // Agradece y muestra el total
    carrito = [];                         // Vacía el carrito en memoria
    localStorage.removeItem("carrito");  // Elimina el carrito del localStorage
    actualizarCarrito();                  // Actualiza la vista para mostrar carrito vacío
  }
}

// Cuando el DOM esté listo, actualiza la vista del carrito si está presente en la página
document.addEventListener("DOMContentLoaded", actualizarCarrito);

// Listener para el formulario con validación y mensaje sin recargar la página
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('miFormulario'); // Obtiene el formulario

  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío tradicional que recarga la página

    const nombre = document.getElementById('nombre').value.trim(); // Obtiene y limpia el valor del campo nombre
    const email = document.getElementById('email').value.trim();   // Obtiene y limpia el valor del campo email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;              // Expresión regular para validar el email

    if (nombre === '') {
      alert('Ingresa tu Inconformidad.'); // Si el nombre está vacío, muestra alerta y no continúa
      return;
    }

    if (email === '') {
      alert('Por favor, ingresa tu correo electrónico.'); // Si email vacío, alerta y para
      return;
    }

    if (!emailRegex.test(email)) {
      alert('Por favor, ingresa un correo electrónico válido.'); // Si el email no pasa la validación, alerta y para
      return;
    }

    alert('Gracias por Su Comentario Esto Nos Ayuda a Seguir Mejorando'); // Si todo está bien, muestra mensaje de agradecimiento

    form.reset(); // Limpia el formulario
  });
});

// Variables
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos')
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners () {
    // When you add a course by pressing "Agregar Carrito"
    listaCursos.addEventListener('click', agregarCurso);

    // Remove courses at Carrito
    carrito.addEventListener('click', eliminarCurso);

    // Show Local Storage courses
    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

        carritoHTML();
    })

    // Empty carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; // Reset the array

        limpiarHTML(); // We delete all HTML
    })
}

// Functions 
function agregarCurso(e) {
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

// Remove course of the carrito
function eliminarCurso (e) {
    if(e.target.classList.contains('borrar-curso')) {
        const cursoId =  e.target.getAttribute('data-id');

        // Remove to the array with the data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        carritoHTML(); // Interate about carrito and show its HTML
    }
}

// Reads the content of the HTML we clicked on and extracts the course information
function leerDatosCurso(curso) {
    console.log(curso);

    // Create object with the content of the current course
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('span').textContent,
        id: curso.querySelector("a").getAttribute('data-id'),
        cantidad: 1
    }

    // Check if a element exists at the carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if(existe){
        // We update the amount 
        const cursos = articulosCarrito.map( curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; // Return the updated object
            } else {
                return curso; // Return objects that are not duplicates 
            }
        });
        articulosCarrito = [...cursos];

    } else {
        // Add elements to carrito array
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    

    console.log(articulosCarrito);

    carritoHTML();
}

// Show the shopping card in the HTML
function carritoHTML() {

    // Clear HTML
    limpiarHTML();

    // Iterates through the HTML and outputs the carrito
    articulosCarrito.forEach(curso => {
        const { imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src="${imagen}" width="200">
        </td>
        <td>${titulo}</ td>
        <td>${precio}</ td>
        <td>${cantidad}</ td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}">X </a>
        </td>
        `;

        // Add carrito HTML in the tbody
        contenedorCarrito.appendChild(row);
    });

    // Add shopping cart to the Storage
    sincronizarStorage();
}

function sincronizarStorage(){
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

// Delete the tbody's courses
function limpiarHTML () {
    //Slow way
    // contenedorCarrito.innerHTML = "";

    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

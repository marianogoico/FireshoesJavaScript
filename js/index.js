let productos = [];

fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        mostrarItems(productos);
    })

const btnCarrito = document.querySelector('.contenedor-icono-carrito')
const contenedorCarrito = document.querySelector('.contenedor-carrito')
const contenedorItems = document.querySelector("#contenedor-items")
const botonComprar = document.querySelector('.boton-comprar')


btnCarrito.addEventListener('click', () => {
    contenedorCarrito.classList.toggle('hidden-carrito')
})


function mostrarItems() {

    contenedorItems

    productos.forEach(producto => {
        let div = document.createElement("div");
        div.classList.add("contenedor-producto");
        div.innerHTML = `
            <div class="contenedor-imagen-producto">
                <img src="${producto.imagen}" alt="">
            </div>
            <div class="contenedor-info">
                <h2>${producto.titulo}</h2>
                <p class="precio">$${producto.precio}</p>
                <button class="agregar-carrito" id="${producto.id}">Agregar al carrito</button>
            </div>
        `
        contenedorItems.append(div);
    })
}



const carritoInfo = document.querySelector(".productos-carrito")
const productosCarrito = document.querySelector('.contenedor-productos-carrito')
const valorTotal = document.querySelector('.total-pagar')
const contarProductos = document.querySelector('#contador')

let carrito = [];



contenedorItems.addEventListener('click', e => {
    if (e.target.classList.contains('agregar-carrito')) {
        const producto = e.target.parentElement

        const infoProducto = {
            cantidad: 1,
            titulo: producto.querySelector('h2').textContent,
            precio: producto.querySelector('p').textContent,
        }

        const existe = carrito.some(producto => producto.titulo === infoProducto.titulo)
        if (existe) {
            const productos = carrito.map(producto => {
                if (producto.titulo === infoProducto.titulo) {
                    producto.cantidad++;
                    return producto;
                }
                else {
                    return producto;
                }
            })

            carrito = [...productos];
        }

        else {
            carrito = [...carrito, infoProducto];
        }

        mostrarHTML();
    }


})

const mostrarHTML = () => {


    productosCarrito.innerHTML = ``;

    let total = 0;
    let totalProductos = 0;

    carrito.forEach(producto => {
        const contenedorProducto = document.createElement('div')
        contenedorProducto.classList.add('productos-carrito')

        contenedorProducto.innerHTML = `
            <div class="info-carrito">
                <span class="cantidad-producto">${producto.cantidad}</span>
                <p class="titulo-producto">${producto.titulo}</p>
                <span class="precio-producto-carrito">${producto.precio}</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon-close">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        `

        productosCarrito.append(contenedorProducto);

        total = total + parseInt(producto.cantidad * producto.precio.slice(1))
        totalProductos = totalProductos + producto.cantidad;

    });

    valorTotal.innerText = `$${total}`;
    contarProductos.innerText = totalProductos;
};


productosCarrito.addEventListener('click', (e) => {
    if (e.target.classList.contains('icon-close')) {
        const producto = e.target.parentElement;
        const titulo = producto.querySelector('p').textContent;

        carrito = carrito.filter(producto => producto.titulo !== titulo)
    }

    mostrarHTML();
})

botonComprar.addEventListener('click', () => {
    Swal.fire('Muchas gracias por tu compra!')
})
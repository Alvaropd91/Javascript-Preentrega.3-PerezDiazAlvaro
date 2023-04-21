class Producto {
    constructor(id, nombre, precio, stock, img, descripcion, alt) {
        this.id = id
        this.nombre = nombre
        this.cantidad = 1
        this.precio = precio
        this.stock = stock
        this.img = img
        this.descripcion = descripcion
        this.alt = alt
    }
}

class ProductoController {
    constructor() {

        //DOM 
        this.contenedor_productos = document.getElementById("contenedor_productos")
        this.listaProductos = []
    }

    cargarProdutos() {
        this.listaProductos = [
            new Producto(1, "Sorrentinos de Jamon y Ricota", 1600, 20, "./imagenes/sorrentinos-1.jpg", "Sorrentinos realizados de forma artesanal con receta italiana de pasta y abundante relleno de jamón y ricota, se presentan en cajas de 12 unidades", "Sorrentinos artesanales en caja x 12 unidades"),
            new Producto(2, "Sorrentinos de Espinaca y Pollo", 1600, 20, "./imagenes/sorrentinos-2.jpg", "Sorrentinos realizados de forma artesanal con receta italiana de pasta y abundante relleno de espinaca fresca y pollo, se presentan en cajas de 12 unidades", "Sorrentinos artesanales en caja x 12 unidades"),
            new Producto(3, "Ñoquis de papa", 1300, 12, "./imagenes/noquis-1.jpg", "Ñoquis de papa, elaborado de forma artesanal  con la mejor materia prima, se presenta en caja de 500 gr", "Ñoquis de papa por 500gr"),
            new Producto(4, "Ñoquis de Espinaca y Ricota", 1500, 15, "./imagenes/noquis-2.jpg", "Ñoquis de espinaca, elaborado de forma artesanal  con la mejor materia prima, espinacas frescas organicas, se presenta en caja de 500 gr", "Ñoquis de espinaca y ricota por 500gr"),
            new Producto(5, "Tallarines al huevo", 1200, 20, "./imagenes/tallarines-1.jpg", "Tallarines  elaborados de forma artesanal con huevos de granja que le dan su color amarillo caracteristico, presentación en paquete de 500gr", "Tallarines al huevo, presentacion por 500gr"),
            new Producto(6, "Tallarines de Espinaca", 1400, 20, "./imagenes/tallarines-2.jpg", "Tallarines elaborados de forma artesanal con espinaca fresca de huerta organica, presentación en paquete de 500gr", "Tallarines de espinaca, presentacion por 500gr"),
            new Producto(7, "Queso Parmesano rallado", 600, 10, "./imagenes/parmesano.jpg", "Queso Parmesado rallado en hebras y en escamas su presentacion viene en pote por 150gr", "Queso Parmesano rallado, pote por 150gr"),
            new Producto(8, "Salsa Pesto para acompañar", 600, 10, "./imagenes/pesto.jpg", "Salsa de Pesto casera elaborada con albahaca, parmesano, pistachos y aceite de oliva extravirgen, se presenta en envase por 500ml", "Salsa Pesto envase por 500ml"),
            new Producto(9, "Salsa Filetto para acompañar", 600, 50, "./imagenes/salsa-fileto.jpg", "Salsa Filetto artesanal,una receta tipica italiana elaborada con tomates seleccionados, ajo y albahaca cocinados gentilmente con aceite de oliva extra virgen. Se presenta en envase de 500ml", "Salsa Filetto envase por 500ml"),
        ]
    }

    mostrarProductosEnDom() {
        this.listaProductos.forEach(producto => {
            this.contenedor_productos.innerHTML += `
            <div class="card" style="width: 18rem;">
            <img src="${producto.img}" class="card-img-top" alt="${producto.alt}">
            <div class="card-body">
                <h5 class="card-title">${producto.nombre}</h5>
                <p class="card-text">${producto.descripcion}</p>
                <p class="card-text">Precio:$${producto.precio}</p>
                <a href="#" id="producto-${producto.id}" class="btn btn-primary">Añadir producto</a>
            </div>
        </div>`
        })
    }

    darEventoClickAProductos(controlador_carrito) {
        this.listaProductos.forEach(producto => {
            const btnAP = document.getElementById(`producto-${producto.id}`)
            btnAP.addEventListener("click", () => {

                controlador_carrito.agregarAlCarrito(producto, this);


                controlador_carrito.guardarEnStorage()

                //TODO: Que solo añada 1 producto al DOM. Que no recorra toda la lista.

                controlador_carrito.mostrarCarritoEnDom(contenedor_carrito);

                Toastify({

                    text: `Se agrego ${producto.nombre} al carrito`,

                    duration: 3000,

                    gravity: "bottom",
                    position: "right",

                    style: {
                        background: "linear-gradient(to right, #00b09b, #96c93d)",
                    },

                }).showToast();

            })
        })
    }
}

class CarritoController {
    constructor() {
        this.contenedor_carrito = document.getElementById("contenedor_carrito")
        this.listaCarrito = []
    }

    agregarAlCarrito(producto) {
        this.listaCarrito.push(producto);
    }

    guardarEnStorage() {
        let listaCarritoJSON = JSON.stringify(this.listaCarrito)
        localStorage.setItem("listaCarrito", listaCarritoJSON)
    }

    verificarExistenciaEnStorage() {
        this.listaCarrito = JSON.parse(localStorage.getItem('listaCarrito')) || []
        if (this.listaCarrito.length > 0) {
            this.mostrarCarritoEnDom(contenedor_carrito)
        }
    }

    limpiarContenedor_Carrito() {
        //convertir objeto a JSON
        contenedor_carrito.innerHTML = "";
    }

    mostrarCarritoEnDom() {

        this.limpiarContenedor_Carrito(contenedor_carrito)
        this.listaCarrito.forEach(producto => {

            this.contenedor_carrito.innerHTML += `
        <div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
              <div class="col-md-4">
                <img src="${producto.img}" class="img-fluid rounded-start" alt="${producto.alt}">
            </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${producto.nombre}</h5>
                  <p class="card-text">Descripcion: ${producto.descripcion}</p>
                  <p class="card-text">Precio: $${producto.precio}</p>
                  
                  <p class="card-text">Cantidad: ${producto.cantidad}</p>
                  
                </div>
              </div>
            </div>
          </div>`
        })
    }
}



const controlador_producto = new ProductoController();

const controlador_carrito = new CarritoController();

//DOM
//mostramos los productos en DOM
controlador_producto.cargarProdutos();

// Verifico si existe
controlador_carrito.verificarExistenciaEnStorage();

controlador_producto.mostrarProductosEnDom();

controlador_producto.darEventoClickAProductos(controlador_carrito)
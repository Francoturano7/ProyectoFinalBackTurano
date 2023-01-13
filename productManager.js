import fs from "fs"


export class ProductManager {
    #precioBaseGanancia = 0.15

    constructor(path) {
        this.path = path
    }

    async getProducts(limit) {

        if (fs.existsSync(this.path)) {
        const products=    await fs.promises.readFile(this.path, `utf-8`)
        if(limit===`max`){

            return JSON.parse(products)
        }else{
            return JSON.parse(products).slice(0,limit)
        }
        } else {
            return []
        }

    }

    async getProductsById(idProduct) {
        const products = await this.getProducts()
        const product = products.find((p) => p.id === parseInt (idProduct))
        if (product) {
            return product
        } else {
            return `Producto no existe`
        }
    }

    async agregarProduct(nombre, tipo, precio, stock = 50, fecha = new Date()) {
        const product = {
            id:await this.#generarId(),
            nombre,
            tipo,
            precio: precio + this.#precioBaseGanancia,
            stock,
            fecha,
            color: [],
        }
        const products = await this.getProducts()
        eventos.push(product)
        await fs.promises.writeFile(this.path, JSON.stringify(products))

    }

    async  #generarId() {
        const products = await this.getProducts()
        let id =
            products.length === 0
                ? 1
                : products[products.length - 1].id + 1
        return id

    }


}
const productManager = new ProductManager(`product.json`)

// async function prueba() {
// //    await ticketManager.agregarEvento(`Evento3`, `Lugar3`, 3)
//  //   await ticketManager.agregarEvento(`Evento4`, `Lugar4`, 4)

//  const eventos = await ticketManager.getEventosById(2)
//  console.log(eventos)

// }

// prueba()
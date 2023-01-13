import express from "express"
import { ProductManager } from "./productManager.js"
const app = express()
const productManager = new ProductManager(`DB.json`)

app.get(`/products`, async(req,res)=>{
    const {limit}= req.query
   const products = await productManager.getProducts(limit || `max`)
   res.json({products})
})

app.get(`/products/:idProduct`,async(req,res)=>{
    const {idProduct}= req.params
    const product = await productManager.getProductsById(idProduct)
    res.json({product})
})

const PORT=8080

app.listen(PORT,()=>{
    console.log(`escuchando puerto ${PORT}`)
})
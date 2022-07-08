const express = require('express');
const Router = require('express');
const app = express();
const router = Router();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/api/productos', router)
app.use(express.static('public'))

class Contenedor {
    constructor(){
        this.id = 0;
        this.arrayProductos = []
    }}

const contenedor1 = new Contenedor;


router.get('/', (req, res) =>{
    res.send(contenedor1.arrayProductos)
})


router.get('/:id', (req, res) =>{
    const id = Number(req.params.id)
    if(id > contenedor1.arrayProductos.length || id < 1){
        res.json({error: "Producto no encontrado"})
    }

    res.json({id: id, ...contenedor1.arrayProductos[id-1]})
})

router.post('/', (req, res) =>{
    const producto = req.body
    contenedor1.id++
    contenedor1.arrayProductos.push({id: contenedor1.id, producto})
    res.json({id: contenedor1.id, producto})
})

router.post('/formulario', (req, res) =>{
    contenedor1.id++
    contenedor1.arrayProductos.push({id: contenedor1.id , producto: req.body})
    res.json(contenedor1.arrayProductos[contenedor1.arrayProductos.length - 1])
})

router.put('/:id', (req, res) =>{
    const id = Number(req.params.id)
    const indice = contenedor1.arrayProductos.findIndex(elem => elem.id === id)
    indice === -1
    ?
    res.json({error: "Producto no encontrado"})
    :
    contenedor1.arrayProductos[indice] = {id: id, producto: req.body}
    res.json(contenedor1.arrayProductos[indice])
})

router.delete('/:id', (req, res) =>{
    const id = Number(req.params.id)
    const indice = contenedor1.arrayProductos.findIndex(elem => elem.id === id)
    indice === -1
    ?
    res.json({error: "Producto no encontrado"})
    :
    contenedor1.arrayProductos.splice( indice, 1)
    res.json(`Producto eliminado`)
})


const PORT = 8080
const server = app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on(`error`, error => console.log(`Error en servidor: ${error}`))












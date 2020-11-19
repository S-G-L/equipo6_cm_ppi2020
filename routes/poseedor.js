/*const { Router } = require("express");
const router = Router();
const fs = require("fs");
//var app = require('express')()
const FilePoseedor = fs.readFileSync("./poseedor.json", "utf-8")
const JSONPoseedor = JSON.parse(FilePoseedor)

//let FileSalidas = null
//let JSONSalidas = null

//const loadFile = (req) => {
  //const FileSalidas = fs.readFileSync(`${req.app.get('ABSOLUTE_PATH')}salidas.json`, 'utf-8');
  //const JSONVentas = JSON.parse(FileVentas);
//}


router.get("/", (req, res) => {
  res.send("API REST POSEEDOR");
});

router.get("/poseedor", (req, res) => {
  //loadFile(req)
  res.json(JSONPoseedor);
});

router.post("/poseedor", (req, res) => {
  let id = JSONPoseedor.length + 1 
  //loadFile(req)
  let { valor_total,cantidad } = req.body

  let nuevoPoseedor = {
    "id_": id,
    "valor_total" : valor_total ,
    "cantidad": cantidad
  }

  JSONPoseedor.push(nuevaSalida)
  fs.writeFileSync("./poseedor.json", JSON.stringify(JSONPoseedor), "utf-8")
  res.status(201).json(nuevaSalida)
})

router.get("/poseedor/:id", (req, res) => {
  let id = req.params.id
  //loadFile(req)
  let poseedorEncontrado = JSONPoseedor.find
    (poseedor => poseedor.id == id)

  if (poseedorEncontrado != undefined)
    res.status(201).json(poseedorEncontrado)
  else
    res.status(200).json(`El poseedor ${id} no existe`)
})

router.put("/poseedor/:id", (req, res) => {
  let id = req.params.id
  let { valor_total, cantidad } = req.body
  //loadFile(req)
  let poseedorModificado = JSONPoseedor.find(poseedor => {
    if (poseedor.id == id) {
      salida.valor_total = valor_total
      salida.cantidad = cantidad
      return poseedor
    }
  })

  if (poseedorModificado != undefined) {
    fs.writeFileSync('./poseedor.json', JSON.stringify(JSONPoseedor), 'utf-8')
    res.status(201).json(poseedorModificado)
  } else {
    res.status(200).json(`El poseedor ${id} no existe`)
  }
})

router.delete("/poseedor/:id", (req, res) => {
  let id = req.params.id
  //loadFile(req)
  let indicePoseedor = JSONPoseedor.findIndex
    (poseedor => poseedor.id == id)
  if (indicePoseedor != -1) {
    JSONPoseedor.splice(indicePoseedor, 1)
    fs.writeFileSync('./poseedor.json', JSON.stringify(JSONPoseedor), 'utf-8')
    res.status(200).json({mensaje : `El poseedor ${id} fue eliminada`})
  } else {
    res.status(200).json(`El poseedor ${id} no existe`)
  }
})

module.exports = router;*/
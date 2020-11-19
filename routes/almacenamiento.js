/*const {Router} = require('express')
const router = Router()
const {connection} = require('./../db/mysql_pool')
//connection.connect()

router.get('/almacenamiento', (req, res) => {
  try{
    //connection.connect()
    connection.query("SELECT * FROM almacenamiento", (error, rows, fields) => {
      if(error){
        res.status(502).json({mensaje : "Error en el servidor", error:true, errorDB : error})
      }
      res.json(rows)
      //connection.end() 
    })
  }catch(error){
    console.log({ mensaje : "este es el error: ", error : true})
  }
})

router.get('/almacenamiento/:id', (req, res) => {
  try{
    const id = req.params.id
    connection.query(`SELECT * 
                      FROM id_ingreso 
                      WHERE id_ventas = ?`, [id_ventas]
                      )
    console.log(response)
  }catch(error){
    res.status(503).json({mensaje: "Error en el servidor", error : true })
    }
  }
)

router.put('/almacenamiento/:id', (req, res) => {
  try{
    const id_ventas = req.params.id
    const {
      id_ingreso,
      id_salidas
    } = req.body

    connection.query(`UPDATE almacenamiento 
                      SET id_ingreso = ?
                      WHERE id_ventas = ?`, [id_ingreso, id_salidas], (error, resultset)=>{
                        if(error){
                          res.status(502).json({mensaje: "error en motor de base de datos"})
                        }else{
                          res.status(200).json({
                            id_ventas: id_ventas,
                            id_ingreso : id_ingreso
                          })
                        }
                      }
                    )

    console.log(id)
  }catch(error){
    res.status(502).json({mensaje: "Error en el servidor."})
  }
})

router.post('/almacenamiento', (req, res) => {
  try{
    const {
      id_ingreso,
      id_salidas
    } = req.body
    const SQL  = `INSERT INTO almacenamiento (id_ingreso,
      id_salidas)
      VALUES(?, ?) `
  const parametros = [id_ingreso, id_salidas]
  connection.query(SQL, parametros, (error, results, fields)=>{
    if(error){
      res.status(502).json({mensaje: 'error ejecutando la consola'})
    }else{
      console.log(results)
        res.status(201).json({id : results.insertId,
                              id_ingreso : id_ingreso,
                              id_salidas:id_salidas})
      /*res.status(201).json({mensaje : "IE creada exitosamente"})*/
    //}/*
  /*})
  }catch(error){
    res.status(502).json({mensaje: "error en el servidor"})
  }*/
/*})

router.delete('/almacenamiento/:id', (req, res) => {
   try{
    const {id} = req.params
    const SQL = `DELETE FROM almacenamiento WHERE id_ventas = ?`
    connection.query(SQL, [id], (error, results, fields) => {
      if(error){
        res.status(502).json({mensaje : 'Error ejecutando la consulta'})
      }else{
        console.log(results)
        if(results.affectedRows > 0)
          res.json({mensaje : "Registro eliminado"})
        else
          res.json({mensaje : "El registro no existe"})
      }
    })
  }catch(error){
    res.status(502).json({mensaje:"Error en el servidor"})
  }
})


//module.exports = router





/*

//Actores de la tabla de oscar*/

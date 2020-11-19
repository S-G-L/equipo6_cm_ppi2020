const {Router} = require('express')
const router = Router()
const {connection} = require('./../db/mysql_pool')
//connection.connect()

router.get('/ventas', (req, res) => {
  try{
    connection.query("SELECT * FROM ventas", (error, rows, fields) => {
      if(error){
        res.status(503).json({mensaje : "Error en el servidor.", error : true, errorDB : error})
      }
      res.json(rows)
    })
  }catch(error){
    res.status(503).json({mensaje : "Error en el servidor.", error : true})
  }
})

router.get('/ventas/:id',(req,res)=>{
  const {id} = req.params;
  connection.query(`SELECT * FROM ventas WHERE id_ventas = ?`, [id],(err, rows, fields)=>{
    if(!err){
      res.json(rows[0])
    }else{
      console.log(err)
    }
  });
});

router.put('/ventas/:id', (req, res) => {
  try{
    const id_ventas = req.params.id
    const {
      cantidad
    } = req.body

    connection.query(`UPDATE ventas
                      SET cantidad = ? WHERE id_ventas = ?`,[cantidad, id_ventas], (error, resulset, fields) => {
                        if(error){
                          res.status(502).json({mensaje: "Error en motor de base de datos."})
                        }else{
                          res.status(201).json({
                            id_ventas : id_ventas,
                            cantidad : cantidad
                          })
                        }
                      } 
                    )

 //   console.log(id)
  }catch(error){
    res.status(502).json({mensaje : "Error en el servidor."})
  }
})

router.post('/ventas', (req, res) => {
  try{
    const {
      cantidad
    } = req.body    
    const SQL = `INSERT INTO ventas (cantidad) VALUES(?)`
    const parametros = [cantidad]
    connection.query(SQL, parametros, (error, results, fields) => {
      if(error){
        console.log(error)
        res.status(502).json({mensaje : 'Error ejecutando la consulta.'})
      }else{
        console.log(results)
        res.status(201).json({
                              id_ventas : results.insertId,
                              cantidad : cantidad
                              })
                              }
    })
  }catch(error){
    res.status(502).json({mensaje:"Error en el servidor"})
  }
})

router.delete('/ventas/:id', (req, res) => {
  try{
    const {id} = req.params
    const SQL = `DELETE FROM ventas WHERE id_ventas = ?`
    connection.query(SQL, [id], (error, results, fields) => {
      if(error){
        res.status(502).json({mensaje : 'Error ejecutando la consulta'})
      }else{
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
  
module.exports = router

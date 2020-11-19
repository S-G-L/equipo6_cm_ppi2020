const {Router} = require('express')
const router = Router()
const {connection} = require('./../db/mysql_pool')
//connection.connect()

router.get('/producto', (req, res) => {
  try{
    connection.query("SELECT * FROM producto", (error, rows, fields) => {
      if(error){
        res.status(503).json({mensaje : "Error en el servidor.", error : true, errorDB : error})
      }
      res.json(rows)
    })
  }catch(error){
    res.status(503).json({mensaje : "Error en el servidor.", error : true})
  }
})

/*router.get('/producto/:id_producto', (req, res) => {
  try{
    const id = req.params.id
    connection.query(`SELECT * 
                      FROM producto
                      WHERE producto = ?`, [id])
  }catch(error){
    res.status(503).json({mensaje : "Error en el servidor.", error : true})
  }
})*/

router.get('/producto/:id',(req,res)=>{
  const {id} = req.params;
  connection.query(`SELECT * FROM producto WHERE id_producto = ?`, [id],(err, rows, fields)=>{
    if(!err){
      res.json(rows[0])
    }else{
      console.log(err)
    }
  });
});

router.put('/producto/:id', (req, res) => {
  try{
    const id_producto = req.params.id
    const {
      nombre,
      cantidad,
      valor,
      id_usuario
    } = req.body

    connection.query(`UPDATE producto
                      SET nombre = ?, cantidad = ?, valor = ?, id_usuario = ? WHERE id_producto = ?`,[nombre, cantidad, valor,  id_usuario, id_producto], (error, resulset, fields) => {
                        if(error){
                          res.status(502).json({mensaje: "Error en motor de base de datos."})
                        }else{
                          res.status(201).json({
                            id_producto : id_producto,
                            nombre : nombre,
                            cantidad : cantidad,
                            valor : valor,
                            id_usuario : id_usuario
                          })
                        }
                      } 
                    )

 //   console.log(id)
  }catch(error){
    res.status(502).json({mensaje : "Error en el servidor."})
  }
})

router.post('/producto', (req, res) => {
  try{
    const {
      nombre,
      cantidad,
      valor,
      id_usuario
    } = req.body    
    const SQL = `INSERT INTO producto (nombre, cantidad, valor, id_usuario) 
                       VALUES(?,?,?,?)`
    const parametros = [nombre, cantidad, valor, id_usuario]
    connection.query(SQL, parametros, (error, results, fields) => {
      if(error){
        console.log(error)
        res.status(502).json({mensaje : 'Error ejecutando la consulta.'})
      }else{
        console.log(results)
        res.status(201).json({
                              id_producto : results.insertId,
                              nombre: nombre, 
                              cantidad: cantidad,
                              valor: valor,
                              id_usuario: id_usuario})
      }
    })
  }catch(error){
    res.status(502).json({mensaje:"Error en el servidor"})
  }
})

router.delete('/producto/:id', (req, res) => {
  try{
    const {id} = req.params
    const SQL = `DELETE FROM producto WHERE id_producto = ?`
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

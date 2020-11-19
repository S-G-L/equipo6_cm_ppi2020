const { Router } = require('express')
const router = Router()
const { connection } = require('./../db/mysql_pool')
//connection.connect()

router.get('/ingresos', (req, res) => {
  try {
    connection.query("SELECT * FROM ingresos", (error, rows, fields) => {
      if (error) {
        res.status(503).json({ mensaje: "Error en el servidor.", error: true, errorDB: error })
      }
      res.json(rows)
    })
  } catch (error) {
    res.status(503).json({ mensaje: "Error en el servidor.", error: true })
  }
})

/*router.get('/ingresos/:id', (req, res) => {
  try {
    const {id} = req.params.id
    connection.query(`SELECT * 
                      FROM ingresos
                      WHERE id_ingresos = ?`, [id])
  } catch (error) {
    res.status(503).json({ mensaje: "Error en el servidor.", error: true })
  }
})*/

router.get('/ingresos/:id',(req,res)=>{
  const {id} = req.params;
  connection.query(`SELECT * FROM ingresos WHERE id_ingresos = ?`, [id],(err, rows, fields)=>{
    if(!err){
      res.json(rows[0])
    }else{
      console.log(err)
    }
  });
});

router.put('/ingresos/:id', (req, res) => {
  try {
    const id = req.params.id
    const {
      cantidad,
      valor_und
    } = req.body

    connection.query(`UPDATE ingresos
                      SET cantidad = ?, valor_und = ?
                      WHERE id_ingresos = ?`, [cantidad, valor_und, id], (error, resulset, fields) => {
        if (error) {
          res.status(502).json({ mensaje: "Error en motor de base de datos." })
        } else {
          res.status(201).json({
            id: id,
            cantidad: cantidad,
            valor_und: valor_und
          })
        }
      }
    )

    //   console.log(id)
  } catch (error) {
    res.status(502).json({ mensaje: "Error en el servidor." })
  }
})

router.post('/ingresos', (req, res) => {
  try {
    const {
      cantidad,
      valor_und
    } = req.body
    const SQL = `INSERT INTO ingresos (cantidad, valor_und) VALUES(?,?)`
    const parametros = [cantidad, valor_und]
    connection.query(SQL, parametros, (error, results, fields) => {
      if (error) {
        console.log(error)
        res.status(502).json({ mensaje: 'Error ejecutando la consulta.' })
      } else {
        console.log(results)
        res.status(201).json({
          id_ingresos: results.insertId,
          cantidad: cantidad,
          valor_und : valor_und
        })
      }
    })
  } catch (error) {
    res.status(502).json({ mensaje: "Error en el servidor" })
  }
})

router.delete('/ingresos/:id', (req, res) => {
  try {
    const { id } = req.params
    const SQL = `DELETE FROM ingresos WHERE id_ingresos = ?`
    connection.query(SQL, [id], (error, results, fields) => {
      if (error) {
        res.status(502).json({ mensaje: 'Error ejecutando la consulta' })
      } else {
        if (results.affectedRows > 0)
          res.json({ mensaje: "Registro eliminado" })
        else
          res.json({ mensaje: "El registro no existe" })
      }
    })
  } catch (error) {
    res.status(502).json({ mensaje: "Error en el servidor" })
  }
})

module.exports = router

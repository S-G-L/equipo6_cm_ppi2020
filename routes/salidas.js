const { Router } = require('express')
const router = Router()
const { connection } = require('./../db/mysql_pool')

router.get("/salidas", (req, res) => {
    try {
    connection.query("SELECT * FROM salidas", (error, rows, fields) => {
      if (error) {
        res.status(503).json({ mensaje: "Error en el servidor.", error: true, errorDB: error })
      }
      res.json(rows)
    })
  } catch (error) {
    res.status(503).json({ mensaje: "Error en el servidor.", error: true })
  }
});

/*router.get("/salidas/:id", (req, res) => {
  try {
    const id_salidas = req.params.id
    connection.query(`SELECT * 
                      FROM salidas
                      WHERE id_salidas = ?`, [id_salidas])
  } catch (error) {
    res.status(503).json({ mensaje: "Error en el servidor.", error: true })
  }
});*/

router.get('/salidas/:id',(req,res)=>{
  const {id} = req.params;
  connection.query(`SELECT * FROM salidas WHERE id_salidas = ?`, [id],(err, rows, fields)=>{
    if(!err){
      res.json(rows[0])
    }else{
      console.log(err)
    }
  });
});

router.post("/salidas", (req, res) => {
    try {
    const {
      cantidad,
      valor_total
    } = req.body
    const SQL = `INSERT INTO salidas (cantidad, valor_total)VALUES(?,?)`
    const parametros = [cantidad, valor_total]
    connection.query(SQL, parametros, (error, results, fields) => {
      if (error) {
        console.log(error)
        res.status(502).json({ mensaje: 'Error ejecutando la consulta.' })
      } else {
        console.log(results)
        res.status(201).json({
          id_salidas: results.insertId,
          cantidad: cantidad,
          valor_total : valor_total
        })
      }
    })
  } catch (error) {
    res.status(502).json({ mensaje: "Error en el servidor" })
  }
})

router.put("/salidas/:id", (req, res) => {
    try {
    const id_salidas = req.params.id
    const {
      cantidad,
      valor_total
    } = req.body

    connection.query(`UPDATE salidas
                      SET cantidad = ?, valor_total = ?
                      WHERE id_salidas = ?`, [ cantidad, valor_total, id_salidas], (error, resulset, fields) => {
        if (error) {
          res.status(502).json({ mensaje: "Error en motor de base de datos." })
        } else {
          res.status(201).json({
            id_salidas: id_salidas,
            cantidad: cantidad,
            valor_total: valor_total
          })
        }
      }
    )
  } catch (error) {
    res.status(502).json({ mensaje: "Error en el servidor." })
  }
})

router.delete("/salidas/:id", (req, res) => {
   try {
    const { id } = req.params
    const SQL = `DELETE FROM salidas WHERE id_salidas = ?`
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

module.exports = router;
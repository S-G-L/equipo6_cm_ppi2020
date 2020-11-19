const {Router} = require ('express');
const router = Router();
const {connection} = require('./../db/mysql_pool');


router.get('/stock', (req, res) => {
  try{
    connection.query("SELECT * FROM stock", (error, rows, fields) => {
      if(error){
        res.status(503).json({mensaje : "Error en el servidor.", error : true, errorDB : error})
      }
      res.json(rows)
    })
  }catch(error){
    res.status(503).json({mensaje : "Error en el servidor.", error : true})
  }
})

router.get('/stock/:id',(req,res)=>{
  const {id} = req.params;
  connection.query(`SELECT * FROM stock WHERE id_stock = ?`, [id],(err, rows, fields)=>{
    if(!err){
      res.json(rows[0])
    }else{
      console.log(err)
    }
  });
});

router.put('/stock/:id', (req, res) => {
  try{
    const id_stock = req.params.id
    const {
      cantidad
    } = req.body

    connection.query(`UPDATE stock
                      SET cantidad = ? WHERE id_stock = ?`,[cantidad, id_stock], (error, resulset, fields) => {
                        if(error){
                          res.status(502).json({mensaje: "Error en motor de base de datos."})
                        }else{
                          res.status(201).json({
                            id_stock : id_stock,
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

module.exports = router;
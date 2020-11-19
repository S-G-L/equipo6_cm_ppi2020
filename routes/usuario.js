const {Router} = require('express')
const router = Router()
const path = require('path')
const multer = require('multer')
const {v4 : uuidv4} = require('uuid')
const {connection} = require('./../db/mysql_pool')
//connection.connect()

const cargador = multer({
  storage : multer.diskStorage({
    destination : (req, file, cb) => {
      cb(null, path.join(__dirname,'../public/uploads'))
    },
    filename : (req, file, cb) => {
       cb(null, uuidv4() + path.extname(file.originalname));
    }
  })
})

router.get('/usuario', (req, res) => {
  try{
    connection.query("SELECT * FROM usuario", (error, rows, fields) => {
      if(error){
        res.status(503).json({mensaje : "Error en el servidor.", error : true, errorDB : error})
      }
      res.json(rows)
    })
  }catch(error){
    res.status(503).json({mensaje : "Error en el servidor.", error : true})
  }
})

/*router.get('/usuario/:id', (req, res) => {
  try{
    const id_usuario = req.params.id
    connection.query(`SELECT * 
                      FROM usuario
                      WHERE id_usuario = ?`, [id_usuario]
                      )
  }catch(error){
    res.status(503).json({mensaje : "Error en el servidor.", error : true})
  }
})*/

router.get('/usuario/:id',(req,res)=>{
  const {id} = req.params;
  connection.query(`SELECT * FROM usuario WHERE id_usuario = ?`, [id],(err, rows, fields)=>{
    if(!err){
      res.json(rows[0])
    }else{
      console.log(err)
    }
  });
});

router.put('/usuario/:id', (req, res) => {
  try{
    const id_usuario = req.params.id
    const {
      nombre,
      apellido,
      correo
    } = req.body

    connection.query(`UPDATE usuario
                      SET nombre = ?, apellido = ?,
                      correo = ? WHERE id_usuario = ?`,[nombre, apellido, correo, id_usuario], (error, resulset, fields) => {
                        if(error){
                          res.status(502).json({mensaje: "Error en motor de base de datos."})
                        }else{
                          res.status(201).json({
                            id_usuario : id_usuario,
                            nombre : nombre,
                            apellido : apellido,
                            correo : correo
                          })
                        }
                      } 
                    )

 //   console.log(id)
  }catch(error){
    res.status(502).json({mensaje : "Error en el servidor."})
  }
})

router.post('/usuario', (req, res) => {
  try{
    const {
      nombre,
      apellido,
      correo
    } = req.body    
    const SQL = `INSERT INTO usuario (nombre, apellido,correo) VALUES(?,?,?)`
    const parametros = [nombre, apellido, correo]
    connection.query(SQL, parametros, (error, results, fields) => {
      if(error){
        console.log(error)
        res.status(502).json({mensaje : 'Error ejecutando la consulta.'})
      }else{
        console.log(results)
        res.status(201).json({
                              id_usuario : results.insertId,
                              nombre : nombre,
                              apellido : apellido,
                              correo : correo})
                              }
    })
  }catch(error){
    res.status(502).json({mensaje:"Error en el servidor"})
  }
})

router.delete('/usuario/:id', (req, res) => {
  try{
    const {id} = req.params
    const SQL = `DELETE FROM usuario WHERE id_usuario = ?`
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
  
router.post('/usuario/subir-imagen-perfil', cargador.single('imagen_perfil') , (req, res) => {
  res.json(req.file)
})

module.exports = router


// actores

/*
router.get("/actores/filtro", (req, res) => {
  try{
    const nombre = req.query.nombre
    const SQL = `SELECT a.*, td.descripcion tipo_doc
                FROM actores a
                INNER JOIN tipo_documento td ON a.tipo_documento = td.codigo
                WHERE a.nombres LIKE ? OR a.apellidos LIKE ?`
    connection.query(SQL,[`%${nombre}%`,`%${nombre}%`], (errors, results, fields) => {
      if(errors){
        res.status(500).json({mensje : "error en la consulta"})
      }else{
        res.status(200).json(results)
      }
    })
  }catch(error){
    res.status(502).json({mensaje : "Error en el servidor."})
  }finally{
    
  }
})

router.post('/actor', async(req,res) => {
  try{
    const {
        documento,
        tipo_documento,
        nombres,
        apellidos,
        contrasena,
        correo,
        telefono_celular,
        numero_expediente,
        genero,
        fecha_nacimiento,
        estado_actor_id,
        institucion_id,
        tipo_actor_id
    } = req.body
    const SQL = `INSERT INTO actores(documento, tipo_documento, nombres, apellidos, contrasena, correo, telefono_celular, numero_expediente, genero, fecha_nacimiento, estado_actor_id, institucion_id,tipo_actor_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)` 
    const DATA = [documento, tipo_documento, nombres, apellidos, contrasena, correo, telefono_celular, numero_expediente, genero, fecha_nacimiento, estado_actor_id, institucion_id, tipo_actor_id]

    const response = await connection.query(SQL, DATA)

    const result = await connection.query(`SELECT * FROM actores WHERE  id = ?`, [response.insertId])

    res.json(result[0])
  }catch(error){
    console.log(error)
    res.status(502).json({mensaje : "Error en el servidor."})
  }
})

router.post('/actor/subir-imagen-perfil', 
cargador.single('imagen_perfil') , (req, res) => {
  if(req.file){
    const {id_actor} = req.body
    const response = await connection.query(UPDATE actores SET)
    res.json(req.file)
  }
})


})*/
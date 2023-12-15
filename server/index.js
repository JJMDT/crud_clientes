const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
app.use(cors());
app.use(express.json());
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud_clientes",
});

app.post("/create", (req, res) => {
  const nombre = req.body.nombre;
  const apellido = req.body.apellido;
  const dni = req.body.dni;
  const direccion = req.body.direccion;
  const pais = req.body.pais;

  db.query(
    "insert into clientes(nombre,apellido,dni,direccion,pais) values (?,?,?,?,?)",
    [nombre, apellido, dni, direccion, pais],
    (err, result) => {
      if (err) {
        console.error("Error al insertar en la base de datos:", err);
        res.status(500).send("Error al procesar la solicitud");
      } else {
        res.send("Cliente registrado con éxito");
      }
    }
  );
});

//update
app.put("/update", (req, res) => {
  const id_cliente = req.body.id_cliente;
  const nombre = req.body.nombre;
  const apellido = req.body.apellido;
  const dni = req.body.dni;
  const direccion = req.body.direccion;
  const pais = req.body.pais;

  db.query(
    "update clientes set nombre=?,apellido=?,dni=?,direccion=?,pais=? where id_cliente=?",
    [nombre, apellido, dni, direccion, pais,id_cliente],
    (err, result) => {
      if (err) {
        console.error("Error al insertar en la base de datos:", err);
        res.status(500).send("Error al procesar la solicitud");
      } else {
        res.send("Cliente registrado con éxito");
      }
    }
  );
});




app.get("/clientes", (req, res) => {
  db.query("SELECT * FROM clientes", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});


app.listen(3001, () => {
  console.log(" servidor corriendo en http://localhost:3001");
});
// app.put("/update", (req, res) => {
//     const id_cliente= req.body.id_cliente
//     const nombre = req.body.nombre;
//     const apellido = req.body.apellido;
//     const dni = req.body.dni;
//     const direccion = req.body.direccion;
//     const pais = req.body.pais;

//     db.query(
//       "UPDATE  clientes SET nombre=?,apellido=?,dni=?,direccion=?,pais=?  WHERE id_cliente=?",
//       [nombre, apellido, dni, direccion, pais,id_cliente],
//       (err, result) => {
//         if (err) {
//           console.log(err);
//         } else {
//           res.send("empleado actualizado exitosamente!");
//           console.log(`Cliente actualizado `);
//         }
//       }
//     );
//   });

let mysql = require("mysql");

let conexion = mysql.createConnection({
    host: "remoto.pronetsys.com.co",
    port: 33060,
    database: "db_prueba",
    user: "andresf",
    password: "Inicio2024*"
});

conexion.connect(function (err) {
    if (err) {
        throw err;
    } else {
        console.log("conexion exitosa");
    }
});


// Ejecuta tu consulta aquí, si es necesario

/**conexion.end(function (err) {
    if (err) {
        throw err;
    } else {
        console.log("conexión cerrada");
    }
});



let datosdomicilios = "INSERT INTO datosdomicilios (NombreCompleto, Direccion, TipodePago, NumeroContacto, ComercioPedido, Pedido, Observaciones) VALUES ('ana maria', 'puerto berrio', 'trasnferencia', '3214315219', 'jhon perrada', '2 crepes canolas', 'ninguna')";

conexion.query(datosdomicilios, function (error, rows) {
    if (error) {
        throw error;
    } else {
        console.log("Datos insertados correctamente");
    }
})
conexion.end();

/**const datosdomicilios = "SELECT * FROM datos_domicilios";

conexion.query(datosdomicilios, function (error, lista) {
    if (error) {
        throw error;
    } else {
        console.log(lista);
    }
})

conexion.end();*/

module.exports = { conexion }
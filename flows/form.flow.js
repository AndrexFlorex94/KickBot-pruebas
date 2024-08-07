let mysql = require("mysql");
const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const { writeToSheet, readSheet, appendToSheet, getFilteredData } = require("../scripts/sheets");
const { conexion } = require("../conexion");

const formFlow = addKeyword(EVENTS.ACTION)
    .addAnswer("¿Cuál es tu Nombre Completo?", { capture: true },
        async (ctx, ctxFn) => {
            await ctxFn.state.update({ nombre: ctx.body }); // Guarda el nombre completo del usuario en el estado
        }
    )
    .addAnswer("¿Cual es la direccion de entrega?(Si puedes añadir un punto de referencia, mucho mejor !)", { capture: true },
        async (ctx, ctxFn) => {
            await ctxFn.state.update({ direccion: ctx.body }); // Guarda la direccion en el estado
        }
    )
    .addAnswer("¿De que forma desea realizar el pago, efectivo o transferencia?", { capture: true },
        async (ctx, ctxFn) => {
            await ctxFn.state.update({ pago: ctx.body }); // Guarda el tipo de pago en el estado
        }
    )
    .addAnswer("¿Cual es el numero de contacto de quien resibe?", { capture: true },
        async (ctx, ctxFn) => {
            await ctxFn.state.update({ numero: ctx.body }); // Guarda el numero de contacto en el estado
        }
    )
    .addAnswer("¿De que comercio deseas realizar su pedido?", { capture: true },
        async (ctx, ctxFn) => {
            await ctxFn.state.update({ comercio: ctx.body }); // Guarda el comercio de donde se realizara el pedido en el estado
        }
    )
    .addAnswer("Indicanos que deseas ordenar?", { capture: true },
        async (ctx, ctxFn) => {
            await ctxFn.state.update({ pedido: ctx.body }); // Guarda el pedido como tal en el estado
        }
    )
    .addAnswer("Tienes alguna observacion que añadir acerca de tu orden(Adiciones, Salsas, sabores, terminos de coopcion, entre otros.) ?", { capture: true },
        async (ctx, ctxFn) => {
            await ctxFn.state.update({ observaciones: ctx.body }); // Guarda observaciones del pedido en el estado
        }
    )
    .addAnswer("¡Gracias por la información! Seras contactado a la brevedad por nuestros asesores. El precio del servicio te lo indicara el asesor que te contacte", null,
        async (ctx, ctxFn) => {
            const userInfo = await ctxFn.state.getMyState(); // Recupera todos los datos almacenados en el estado
            await appendToSheet([[userInfo.nombre, userInfo.direccion, userInfo.pago, userInfo.numero, userInfo.comercio, userInfo.pedido, userInfo.observaciones]])


            let datosdomicilios = "INSERT INTO datosdomicilios (NombreCompleto, Direccion, TipodePago, NumeroContacto, Comerciopedido, Pedido, Observaciones) VALUES ('" + userInfo.nombre + "', '" + userInfo.direccion + "', '" + userInfo.pago + "', '" + userInfo.numero + "', '" + userInfo.comercio + "', '" + userInfo.pedido + "', '" + userInfo.observaciones + "')";

            conexion.query(datosdomicilios, function (error, rows) {
                if (error) {
                    throw error;
                } else {
                    console.log("Datos insertados correctamente");
                }
            })
            conexion.end();
        })


    ;



module.exports = { formFlow };
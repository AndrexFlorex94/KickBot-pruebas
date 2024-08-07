const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const { writeToSheet, readSheet, appendToSheet, getFilteredData } = require("../scripts/sheets2");

const form2Flow = addKeyword(EVENTS.ACTION)
    .addAnswer("A continuacion los datos que se solicitaran seran con respecto al remitente del envio📤")
    .addAnswer("¿Cuál es el Nombre Completo del que envia?", { capture: true },
        async (ctx, ctxFn) => {
            await ctxFn.state.update({ nombreremitente: ctx.body }); // Guarda el nombre completo del remitente en el estado
        }
    )
    .addAnswer("¿Cual es la direccion del que envia indicando el barrio?", { capture: true },
        async (ctx, ctxFn) => {
            await ctxFn.state.update({ direccionremitente: ctx.body }); // Guarda la direccion del que envia en el estado
        }
    )
    .addAnswer("¿Cual es el numero de contacto de quien envia?", { capture: true },
        async (ctx, ctxFn) => {
            await ctxFn.state.update({ numeroremitente: ctx.body }); // Guarda el numero de contacto del que envia en el estado
        }
    )
    .addAnswer("A continuacion los datos que se solicitaran seran con respecto al Destinatario del envio📤")
    .addAnswer("¿Cuál es el Nombre Completo del Destinatario?", { capture: true },
        async (ctx, ctxFn) => {
            await ctxFn.state.update({ nombredestinatario: ctx.body }); // Guarda el nombre completo del destinatario en el estado
        }
    )
    .addAnswer("¿Cual es la direccion del destinatario indicando el barrio?", { capture: true },
        async (ctx, ctxFn) => {
            await ctxFn.state.update({ direcciondestinatario: ctx.body }); // Guarda la direccion del destinatario en el estado
        }
    )
    .addAnswer("Cual es el numero de contacto del destinatario?", { capture: true },
        async (ctx, ctxFn) => {
            await ctxFn.state.update({ numerodestinatario: ctx.body }); // Guarda el numero de contacto del destinatario en el estado
        }
    )
    .addAnswer("Que contiene el paquete a enviar y cual es el peso promedio en kilogramos?", { capture: true },
        async (ctx, ctxFn) => {
            await ctxFn.state.update({ pesopaquete: ctx.body }); // Guarda el peso promedio del paquete a enviar en el estado
        }
    )
    .addAnswer("De que forma desea realizar el pago, efectivo o transferencia?", { capture: true },
        async (ctx, ctxFn) => {
            await ctxFn.state.update({ pagoenvio: ctx.body }); // Guarda el tipo de pago en el estado
        }
    )
    .addAnswer("¡Gracias por la información! Seras contactado a la brevedad por nuestros asesores. El precio del servicio te lo indicara el asesor que te contacte", null,
        async (ctx, ctxFn) => {
            const userInfo = await ctxFn.state.getMyState(); // Recupera todos los datos almacenados en el estado.
            await appendToSheet([[userInfo.nombreremitente, userInfo.direccionremitente, userInfo.numeroremitente, userInfo.nombredestinatario, userInfo.direcciondestinatario, userInfo.numerodestinatario, userInfo.pesopaquete, userInfo.pagoenvio]])
        });

module.exports = { form2Flow };
const { addKeyword, EVENTS } = require('@bot-whatsapp/bot')
const { sendPdfFlow } = require('./sendPdf.flow.js');
const { formFlow } = require("./form.flow.js")
const { form2Flow } = require("./form2.flow.js")
const { gptFlow } = require('./gpt.flow.js');



const path = require('path');
const fs = require('fs');

const pathMenu = path.join(__dirname, "../mensajes", "menu.txt");
const menuText = fs.readFileSync(pathMenu, 'utf8');

const flow1 = addKeyword("1") //Opcion 1 del menu
    .addAnswer("Te envio nuestro catalogo completo 🍟🍕🍖🍴")
    .addAnswer("El catalogo es interactivo, puedes navegar en el tan solo precionando los nombres de lo que requieres y tambien te da la opcion de volver al menu anterior y al indice. Pruebalo!!")
    .addAnswer("Cuando finalizes escribe la palabra 'Menu' y selecciona la 'Opc 3' para tomar su pedido")
    .addAction(async (ctx, ctxFn) => {
        await ctxFn.gotoFlow(sendPdfFlow)
    })

const flow2 = addKeyword("2") //Opcion 2 del menu
    .addAnswer("Dime, que dudas tienes de nuestro catalogo?🗒️✍️🤖, cuando ya no tengas mas dudas escribe la palabra 'Menu' y selecciona la 'Opc 3' para tomar su pedido ", { capture: true },
        async (ctx, ctxFn) => {
            await ctxFn.gotoFlow(gptFlow)
        })

const flow3 = addKeyword("3") //Opcion 3 del menu
    .addAnswer("En el cumplimiento de la ley 1581 de 2012, decreto 1377 del 2013,sobre el tratamiento de datos personales. Kick Domicilios informa que el uso de los datos personales suministrados al momento de los servicios, son de uso exclusivo y que por ningún motivo son divulgados ni compartidos para otros temas ajenos a  la prestación del servicio del Domicilio.")
    .addAnswer("Para darnos la autorización, te vamos a contactar con un asesor👨‍💻. Para eso te voy a hacer unas preguntas antes✍️")
    .addAction(async (ctx, ctxFn) => {
        await ctxFn.gotoFlow(formFlow)
    })

const flow4 = addKeyword("4") //Opcion 4 del menu
    .addAnswer("En el cumplimiento de la ley 1581 de 2012, decreto 1377 del 2013,sobre el tratamiento de datos personales. Kick Domicilios informa que el uso de los datos personales suministrados al momento de los servicios, son de uso exclusivo y que por ningún motivo son divulgados ni compartidos para otros temas ajenos a  la prestación del servicio del Domicilio.")
    .addAnswer("Para darnos la autorización, te vamos a contactar con un asesor👨‍💻. Para eso te voy a hacer unas preguntas antes✍️")
    .addAction(async (ctx, ctxFn) => {
        await ctxFn.gotoFlow(form2Flow)
    })

const menuFlow = addKeyword(EVENTS.ACTION)
    .addAnswer(menuText, { capture: true, }, //Si, quiere abrir el menu
        async (ctx, ctxFn) => {
            const opciones = ["1", "2", "3", "4", "0"]
            if (!opciones.includes(ctx.body)) {
                return ctxFn.fallBack("No elegiste una opcion correcta. Elegi 1, 2, 3, 4 o 0")
            }
            if (ctx.body === "0") {
                return ctxFn.endFlow("Volviendo al menu principal. Escribi 'Menu' para volver a ver las opciones")
            }
        }, [flow1, flow2, flow3, flow4])

module.exports = { menuFlow };
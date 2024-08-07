const { addKeyword, EVENTS } = require('@bot-whatsapp/bot');

const welcomeFlow = addKeyword(EVENTS.ACTION)

    .addAction(async (ctx, ctxFn) => {
        await ctxFn.endFlow("Bienvenido a *KickBot!*🤖 de *Kick Domiclios*. Puedes escribir 'Menu' para ver las opciones que te ofrecemos o directamente puedes hacer una consulta acerca de nuestro catalogo")
    })

module.exports = { welcomeFlow };
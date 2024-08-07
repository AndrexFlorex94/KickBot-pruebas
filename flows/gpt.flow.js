const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const { chat } = require("../scripts/chatgpt");
const pdf = require("pdf-parse")
const fs = require("fs")

const gptFlow = addKeyword(EVENTS.ACTION)
    .addAction(async (ctx, ctxFn) => {
        const pdfPath = "./flows/pdfs/catalogo-manual-Kickbot.pdf"
        let pdfBuff = fs.readFileSync(pdfPath)
        const pdfRead = await pdf(pdfBuff)
        const pdfTxt = pdfRead.text
        const prompt = "Sos un contacto inicial de una empresa de domicilios llamada KickDomicilios y te van a hacer preguntas sobre el catalogo completo disponible. Debes indicar que cuando finalizen y no tengan mas dudas deben de copiar la palabra Menú y seleccionar la Opc 3 para tomar el pedido. El catalogo es el siguiente: " + pdfTxt;
        const text = ctx.body;


        // Recuperar el estado actual
        let userState = await ctxFn.state.getMyState() || {};
        userState.conversations = userState.conversations ?? [];
        const conversations = userState.conversations;

        // Crear el contexto con las últimas dos conversaciones
        const contextMessages = conversations.flatMap(conv => [
            { role: "user", content: conv.question },
            { role: "assistant", content: conv.answer }
        ]);

        // Añadir la pregunta actual al contexto
        contextMessages.push({ role: "user", content: text });

        // Obtener la respuesta de ChatGPT
        const response = await chat(prompt, contextMessages);

        // Actualizar el estado con la nueva conversación
        const newConversations = [...conversations, { question: text, answer: response }];
        if (newConversations.length > 2) {
            newConversations.shift(); // Mantener solo las últimas dos entradas
        }

        await ctxFn.state.update({ conversations: newConversations });

        // Enviar la respuesta al usuario
        await ctxFn.flowDynamic(response);
    });

module.exports = { gptFlow };
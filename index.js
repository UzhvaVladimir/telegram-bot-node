const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '6655519759:AAFYqEO8twQTyNEzVP-4bBBHrxS3Ql-5ji8';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

const WebAppUrl = 'https://ubiquitous-trifle-97a24d.netlify.app/';

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message

    const chatId = msg.chat.id;
    const resp = match[1]; // the captured "whatever"

    // send back the matched "whatever" to the chat
    bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (text === '/start') {
        // send a message to the chat acknowledging receipt of their message
        await bot.sendMessage(chatId, 'Заполни форму, которая появится ниже', {
            reply_markup: {
                inline_keyboard: [
                    [{text: 'Кнопка', web_app: {url: WebAppUrl}}]
                ]
            }
        });
    }
});
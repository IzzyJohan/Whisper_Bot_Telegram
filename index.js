require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const {API_KEY, SERVER_URL} = process.env;
const TELEGRAM_API = `https://api.telegram.org/bot${API_KEY}`;
const URI =`/webhook/${API_KEY}`;
const WEBHOOK_URL = SERVER_URL + URI;

const app = express()
app.use(bodyParser.json());

const init = async() => {
    const res = await axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`);
    console.log(res.data);
}

app.post(URI, async (req, res) => {
    console.log(req.body);

    const chatId = req.body.message.chat.id;
    const text = req.body.message.text;

    await axios.post(`${TELEGRAM_API}/sendMessage`, {
        chat_id: chatId,
        text: text
    });
    return res.send();
});

app.listen(process.env.PORT || 5000, async() => {
    console.log('App running on port', process.env.PORT || 5000);
    await init()
});
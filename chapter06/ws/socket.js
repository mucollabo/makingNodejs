const Websocket = require('ws');

module.exports = (server) => {
    const wss = new Websocket.Server({ server });

    wss.on('connection', (ws, req) => {
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        console.log('New Client : ', ip);
        ws.on('message', (message) => {   // message from client
            console.log(message);
        });
        ws.on('error', (err) => {   // error processing
            console.error(err);
        });
        ws.on('close', () => {   // close
            console.log('disconnect client', ip);
            clearInterval(ws.interval);
        });

        ws.interval = setInterval(() => {   // message from server
            if (ws.readyState === ws.OPEN) {
                ws.send('Message From Server.');
            }
        }, 3000);
    });
};

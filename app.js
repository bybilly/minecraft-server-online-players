const express = require('express');
const util = require('minecraft-server-util');
const apicache = require('apicache');

const app = express();
const cache = apicache.middleware;

const CACHE_TIME = '3 minutes';

app.use(express.json());

app.get('/server/:ip/:port', cache(CACHE_TIME), async (req, res) => {
    const ip = req.params.ip;
    const port = req.params.port;

    if (isNaN(port)) return res.json({error: "Port must be a number"});

    await util.status(ip, {port: parseInt(port)})
    .then((response) => {
        return res.json({online: response.onlinePlayers});
    })
    .catch((err) => {
        console.log(err);
        return res.json({error: "Unknown error"});
    });
});

app.listen(3000);
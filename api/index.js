const app = require('express')();
const util = require('minecraft-server-util');
const cache = require('apicache').middleware;

app.use(cache('2 minutes'));

app.get('/api/players/:ip/:port', async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');

    const { ip, port } = req.params;

    if (isNaN(port)) return res.json({error: "Port must be a number"});

    await util.status(ip, {port: parseInt(port)})
    .then((response) => {
        return res.json({online: response.onlinePlayers.toString()});
    })
    .catch((err) => {
        return res.json({error: "Unknown error"});
    });
});

module.exports = app;
const app = require('express')();
const util = require('minecraft-server-util');

const options = {
    timeout: 2000, // 2 seconds
    enableSRV: true
};

app.get('/api/players/:ip/:port', (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 's-maxage=60');

    const { ip, port } = req.params;

    if (isNaN(port)) return res.json({error: "Port must be a number"});

    util.status(ip, parseInt(port), options)
    .then(resp => {
        return res.json({online: resp.players.online.toString()});
    })
    .catch(err => {
        return res.json({error: "Unknown error"});
    });
});

module.exports = app;
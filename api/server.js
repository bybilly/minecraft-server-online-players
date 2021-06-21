const util = require('minecraft-server-util');

module.exports = async (req, res) => {
    console.log("API called");
    const { ip, port } = req.query;

    if (isNaN(port)) return res.json({error: "Port must be a number"});

    await util.status(ip, {port: parseInt(port)})
    .then((response) => {
        return res.json({online: response.onlinePlayers});
    })
    .catch((err) => {
        return res.json({error: "Unknown error"});
    });
}
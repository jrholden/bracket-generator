module.exports = function (io) {

    io.on('connection', function (client) {

        client.on('join', function (data) {
        });
        client.on('tourney-added', function (data) {
            client.broadcast.emit("new-tourney", data);
        });
    });

}
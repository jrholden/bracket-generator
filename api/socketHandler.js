
module.exports = function(io) {

    io.on('connection', function(client) {
        console.log('Client connected...');

        client.on('join', function(data) {
            console.log(data);
        });
        client.on('tourney-added', function(data) {
            console.log(data);
            client.broadcast.emit("new-tourney", data);
        });
    });
/*    io.on('tourney-added', function(client) {
        console.log('tournament added');
        client.broadcast.emit("new-tourney", "tourney");
    });*/
}
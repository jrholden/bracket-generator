import io from "socket.io-client";
import config from '../config';
import ErrorService from "./ErrorService";
class SocketService {
    constructor() {
        let apiUrl = config.apiUrl;// + "/socket/connect";
        this.socket = io.connect(apiUrl, { reconnection: false });
    }
    connect(){
        let self = this;
        this.socket.on('connect', function (data){
            self.socket.emit('join', 'Hello World from client');
        })
    }
    listen(){
        this.socket.on('new-tourney', function (data){
            console.log("new Tourney Created::: "+data);
        })
        this.socket.on('connect_error', err => ErrorService.handleError(err,"Connect Error"))
        this.socket.on('connect_failed', err => ErrorService.handleError(err, "connect Fail"))
        this.socket.on('disconnect', err => ErrorService.handleError(err,"Disconnected"))
    }
    sendNewTourney(tourneyId){
        console.log("Sending tourneyadded");
        this.socket.emit('tourney-added', tourneyId)
    }

}export default SocketService;
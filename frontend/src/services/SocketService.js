import io from "socket.io-client";
import config from '../config';
import ErrorService from "./ErrorService";
import tourney from "../components/Tourney";
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
        this.socket.on('connect_error', err => ErrorService.handleError(err))
        this.socket.on('connect_failed', err => ErrorService.handleError(err))
        this.socket.on('disconnect', err => ErrorService.handleError(err))
    }
    sendNewTourney(tourneyId){
        console.log("Sending tourneyadded");
        this.socket.emit('tourney-added', tourneyId)
    }

}export default SocketService;
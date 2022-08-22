import config from '../config';
import ErrorService from "./ErrorService";
import SocketService from "./SocketService";

class TournamentService {
    static saveTournament(data, socket){
        // Send data to the backend via POST
        fetch(config.apiUrl+"/tournament/save", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            mode: 'cors',
            body: JSON.stringify(data) // body data type must match "Content-Type" header

        }).then(function (res) {
            return res.json();
        }).then(function(data){
            console.log(data.res);
            socket.sendNewTourney(data.res._id);

        }).catch(err => {

        }).finally( function() {
            console.log("Is this hit?: ");
        })
    }
    static getTournaments(){
        return fetch(config.apiUrl+"/tournament/get", {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            mode: 'cors',
        }).then(function(res){
            return res.json();
        }).then(function(data){
            console.log(data.res);
            return data.res;
        }).catch(err => {
            ErrorService.handleError(err);
            //return empty because something went wrong
            return [];
        }).finally( function() {
            //stop loaders
        })
    }
}
export default TournamentService;
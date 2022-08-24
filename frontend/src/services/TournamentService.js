import config from '../config';
import ErrorService from "./ErrorService";
import TestService from "./TestService";

class TournamentService {
    static saveTournament(data, socket){
        // Send data to the backend via POST
        return fetch(config.apiUrl+"/tournament/save", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            mode: 'cors',
            body: JSON.stringify(data) // body data type must match "Content-Type" header

        }).then(function (res) {
            return res.json();
        }).then(function(data){
            if(!TestService.testData(data.res, '_id', "Save Tournament Return Data BAD")) return false;
            socket.sendNewTourney(data.res._id);

        }).catch(err => {
            ErrorService.handleError(err, "Error Saving New Tournament");
            return false;
        }).finally( function() {
            return true;
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
            if(!TestService.testData(data.res[0], 'tournament', "Tournaments Object Invalid")) return false;
            return data.res;
        }).catch(err => {
            ErrorService.handleError(err, "Error getting Tournament");
            //return empty because something went wrong
            return [];
        }).finally( function() {
            //stop loaders
        })
    }
    static getOneTournament(id){
        return fetch(config.apiUrl+"/tournament/get/"+id, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            mode: 'cors'
        }).then(function (res){
            return res.json();
        }).then(function (data){
            if(!TestService.testData(data.res, 'tournament', "getOneTournament Data Invalid")) return false;
            return data.res;
        }).catch(err => {
            ErrorService.handleError(err, "Error Getting Tournament by Id");
            return false;
        }).finally(function (){

        })
    }
}
export default TournamentService;
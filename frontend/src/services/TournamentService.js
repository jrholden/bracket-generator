import config from '../config';
import ErrorService from "./ErrorService";
import TestService from "./TestService";

class TournamentService {
    static saveTournament(data, socket){
        let self = this;
        // Send data to the backend via POST
        return fetch(config.apiUrl+"/tournament/save", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            mode: 'cors',
            body: JSON.stringify(data) // body data type must match "Content-Type" header

        }).then(function (res) {
            if(!res.ok){
                let message = "Server Failed to Save Tournament::" + res.status + "\n" + res.statusText;
                throw new Error(message);
            }else{return res.json();}
        }).then(function(data){
            self.id = data.res._id;
             if (TestService.testData(data.res, '_id', "Save Tournament Return Data BAD")){
                 return self.id;
             }else{
                 return null;
             }

        }).catch(err => {
            ErrorService.handleError(err, "Error Saving New Tournament");
            return false;
        }).finally(function(){
            socket.sendNewTourney(self.id);
        })
}
    static getTournaments(){
        return fetch(config.apiUrl+"/tournament/get", {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            mode: 'cors',
        }).then(function(res){
            if(!res.ok){
                let message = "Server Failed to Get Tournaments::" + res.status + "\n" + res.statusText;
                throw new Error(message);
            }else{return res.json();}
        }).then(function(data){
            //no active tournaments
            if(!data.res) return [];
            if(!TestService.testData(data.res[0], 'tournament', "Tournaments Object Invalid")) return false;
            return data.res;

        }).catch(err => {
            ErrorService.handleError(err, "Error getting Tournament");
            //return empty because something went wrong
            return [];
        })
    }
    static getOneTournament(id){
        return fetch(config.apiUrl+"/tournament/get/"+id, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            mode: 'cors'
        }).then(function (res){
            if(!res.ok){
                let message = "Server Failed to Get Tournament::" + res.status + "\n" + res.statusText;
                throw new Error(message);
            }else{return res.json();}
        }).then(function (data){
            if(!TestService.testData(data.res, 'tournament', "getOneTournament Data Invalid")) return false;
            return data.res;
        }).catch(err => {
            ErrorService.handleError(err, "Error Getting Tournament by Id");
            return false;
        }).finally(function (){

        })
    }
    static deleteTournament(id){
        return fetch(config.apiUrl + "/tournament/delete/"+id, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            mode: 'cors'

        }).then(function (res) {
            if (!res.ok) {
                let message = "Server Failed to Delete Tournament" + res.status + "\n" + res.statusText;
                throw new Error(message);
            } else {
                return res.json();
            }
        }).then(function (data) {
            return data.res;
        }).catch(err => {
            ErrorService.handleError(err, "Error Saving New Tournament");
            return false;
        })
    }
    static deleteTournaments(){

    }
}
export default TournamentService;
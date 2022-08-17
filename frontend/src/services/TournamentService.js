import config from '../config';

class TournamentService {
    static saveTournament(data){
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
        })
    }
}
export default TournamentService;
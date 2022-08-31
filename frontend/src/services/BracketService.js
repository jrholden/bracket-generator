import config from "../config";
import ErrorService from "./ErrorService";

class BracketService {
    static createBracket(bracketProps){
        return fetch(config.apiUrl + "/bracket/create", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            mode: 'cors',
            body: JSON.stringify(bracketProps)

        }).then(function (res) {
            if (!res.ok) {
                let message = "Server Failed to Create Bracket" + res.status + "\n" + res.statusText;
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
}
export default BracketService;
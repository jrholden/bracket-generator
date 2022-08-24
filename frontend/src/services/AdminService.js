import config from "../config";
import ErrorService from "./ErrorService";

class AdminService {
    static authAdmin(token) {
        return fetch(config.apiUrl + "/admin/auth", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            mode: 'cors',
            body: JSON.stringify(token) // body data type must match "Content-Type" header

        }).then(function (res) {
            if (!res.ok) {
                let message = "Server Failed to Auth Admin" + res.status + "\n" + res.statusText;
                throw new Error(message);
            } else {
                return res.json();
            }
        }).then(function (data) {
            return data.res;
        }).catch(err => {
            ErrorService.handleError(err, "Error Saving New Tournament");
            return false;
        }).finally(function () {
            //we get here even on error
        })
    }
}

export default AdminService;
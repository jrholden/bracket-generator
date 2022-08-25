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
        })
    }
    static deleteAllTourneys() {
        return fetch(config.apiUrl + "/admin/deleteAllTourneys", {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            mode: 'cors'

        }).then(function (res) {
            if (!res.ok) {
                let message = "Server Failed to delete all tourneys" + res.status + "\n" + res.statusText;
                throw new Error(message);
            } else {
                return res.json();
            }
        }).then(function (data) {
            return data.res;
        }).catch(err => {
            ErrorService.handleError(err, "Error DELETING ALL TOURNEYS");
            return false;
        })
    }
    static deleteAllData() {
        return fetch(config.apiUrl + "/admin/deleteAllData", {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            mode: 'cors'

        }).then(function (res) {
            if (!res.ok) {
                let message = "Server Failed to DELETE EVERYTHING" + res.status + "\n" + res.statusText;
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

export default AdminService;
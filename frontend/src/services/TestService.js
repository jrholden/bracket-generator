import ErrorService from "./ErrorService";

class TestService {
    static testData(object, propString, errMessage){
        try{
            return object[propString];
        }catch (err) {
            ErrorService.handleError(err, errMessage);
            return false;
        }
    }
}export default TestService;
import ErrorService from "./ErrorService";

class TestService {
    static testData(object, propString){
        try{
            return object[propString];
        }catch (err) {
            ErrorService.handleError(err);
            return false;
        }
    }
}export default TestService;
import ErrorService from "./ErrorService";

class TestService {
    static testData(object, propString, errMessage, suppressError){
        try{
            return object[propString];
        }catch (err) {
            if(!suppressError) {
                ErrorService.handleError(err, errMessage);
            }
            return false;
        }
    }
}export default TestService;
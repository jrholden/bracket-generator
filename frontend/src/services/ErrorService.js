class ErrorService {
    static handleError(error, message){
        console.error("ERROR:: "+message+"\n"+error);
    }
}export default ErrorService
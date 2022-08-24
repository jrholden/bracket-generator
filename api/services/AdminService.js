exports.authAdmin = (token, callback) => {
    console.log(token);
    callback(null, token.secret === '12345');
}
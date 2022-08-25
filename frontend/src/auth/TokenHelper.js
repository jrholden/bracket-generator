let token = {};

exports.setTokenThenFreeze = (t) => {
    token = t;
    Object.freeze(token);
}
exports.getToken = () => {
    return token;
}

//object should be -> {key:{**}}
exports.combineObjects = (...objects) =>{
    let combined = {};
    objects.forEach((object) => {
        let key = Object.keys(object)[0];
        combined[key] = object[key];
    })
    return combined;
}
const fs = require('fs');

exports.clearFile = (name) => {
    fs.writeFileSync(name, '');
}

exports.saveToFile = (name, key, value) => {
    fs.appendFileSync(name, key + ',' + value + '\n');
}

exports.generateRandomString = (length) => {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};
// Your code here.
const db = require('./db.js');

const getAloha = function(language) {
    if(language === undefined) {
        return null;
    }
    else {
        language = language.toLowerCase();
    }
    if(language in db) {
        return db[language];
    }
    else {
        return null;
    }
}
// Our code here.
if (typeof getAloha === 'undefined') {
    getAloha = undefined;
}

module.exports = getAloha;

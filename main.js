const getAloha = require('./get-aloha.js');

const userLanguage = process.argv[2];
const language = getAloha(userLanguage);
if(language === null) {
    console.log('Your language is not in our database');
}
else {
    console.log(language.greeting);
    console.log(language.farewell);
}

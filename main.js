const getAloha = require('./get-aloha.js');

const userLanguage = process.argv[2];
const language = getAloha(userLanguage);
console.log(language.greeting);
console.log(language.farewell);


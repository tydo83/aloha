const getAloha = require('./get-aloha.js');


describe('getAloha', () => {
    it(`returns a greeting for the given language`, () => {
        const words1 = getAloha('english');
        const greeting1 = words1.greeting;
        const farewell1 = words1.farewell;
        const expectedWords1 = {
            greeting: 'hello',
            farewell: 'goodbye',
        }

        expect(greeting1).toBe('hello');
        expect(farewell1).toBe('goodbye');
        expect(words1).toEqual(expectedWords1);

        const words2 = getAloha('spanish');
        const greeting2 = words2.greeting;
        const farewell2 = words2.farewell;
        const expectedWords2 = {
            greeting: 'hola',
            farewell: 'adios',
        }

        expect(greeting2).toBe('hola');
        expect(farewell2).toBe('adios');
        expect(words2).toEqual(expectedWords2);

        const words3 = getAloha('japanese');
        const greeting3 = words3.greeting;
        const farewell3 = words3.farewell;
        const expectedWords3 = {
            greeting: 'konnichiwa',
            farewell: 'sayonara',
        }

        expect(greeting3).toBe('konnichiwa');
        expect(farewell3).toBe('sayonara');
        expect(words3).toEqual(expectedWords3);
    });

    it(`is case-insensitive`, () => {
        const words1 = getAloha('English');
        expect(words1.greeting).toBe('hello');
        const words2 = getAloha('ZULU');
        expect(words2.greeting).toBe('sawubona');
        const words3 = getAloha('rUsSiAn');
        expect(words3.greeting).toBe('zdravstvuyte');
    })

    it(`returns a null value if no parameter is passed in`, () => {
        const result = getAloha();
        expect(result).toBeNull();
    })

    it(`returns a null value if the language isn't in our database`, () => {
        // that is, the given string is not a key in our object
        const language1 = 'colin' // not in the db
        const language2 = 'engilsh' // misspelled
        const language3 = 'englis' // missing a letter

        const result1 = getAloha(language1);
        const result2 = getAloha(language2);
        const result3 = getAloha(language3);

        expect(result1).toBeNull();
        expect(result2).toBeNull();
        expect(result3).toBeNull();
    })
})

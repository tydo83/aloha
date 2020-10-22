# Aloha - Walkthrough

### Setup and Background

* Do NOT try to pass tests right away! We'll do them one by one as we go.
* Remember that a FUNCTION is going to be code WE use to get input and output for our own INTERNAL use, while `process.argv` and `console.log` are for getting input from and output to the USER via the TERMINAL.


### Hard-Coding Our I/O

* We'll start by printing a greeting and farewell from the database, but with an imaginary user.
* Check out the `db.js` file. That's where all our data is!
* Create a `main.js` file. We'll code exclusively in here for a while!
* Now `require` `db.js` into `main.js`.
    * Don't forget that `require` takes in one parameter: a string that's the path to another file.
    * Use `./` for the start of the path and `.js` for the end.
        * Neither of those are standard practice for advanced devs, but they serve as a good reminder that this is just a path to a file!
    * Save the result of `require` in a variable called `languages`.
        * even though we're grabbing whatever `db.js` exports, it's our variable and we can call it whatever we want!
* Try printing out a greeting and a farewell from a language.
    * First try `console.log`ging out the values in `languages.english`. Note that it's an object with `.greeting` and `.farewell` properties.
    * Now change that `console.log` to print out the values in `languages.english.greeting` and `languages.english.farewell`.
    * Run your code in the terminal by typing `node main.js`. You should see "hello" and "goodbye" print out!


### Real User Input And Logic

* We pulled in our object and printed out a greeting and farewell from it, but WE decided which language to print. Now let's take in input using `process.argv`, run it through some simple if/else logic, and print out a response.
    * Take `process.argv[2]` and save it into a variable. Let's call it `userLanguage`.
    * Check the value of that language against two or three hard-coded language name strings (maybe "english" and "spanish" and "arabic"?) using an `if/else` chain or a `switch` statement (this is a good use case for that, since we're checking one thing's value against several possible values it could have).
    * If it matches one of those strings, print out that specific language's `.greeting` and `.farewell` properties. Don't hard-code it to the point where you're writing "hello" into the code, but you CAN choose which language to print in each case; for example, if "english" is a match, you can print out `languages.english.greeting` and `languages.english.farewell`. This is a fine solution if we only have a few possibilities!
    * Print out a default response if it doesn't match one of the languages you're searching for (`default` for `switch` or an `else` for an `if/else` chain). Maybe something like, "Sorry, that language is not in our database yet."
    * Try running `node main.js english` and your other languages from your logic chain; if you set up your logic correctly, it should print out the correct greeting and farewell. Now try `node main.js xhosa`. That IS in our database, but if you didn't put it in your logic chain, it will claim we don't have it.
    * There is, of course, a better way!
    
    
### Functions First, Functions Always

* First let's move this all into a function in its own file.
* Why?
    * It's better to separate the user interface (what is our user's input and how do we get them output?) from the logic (what's the appropriate output for their input?) 
    * And most obviously, code outside functions is difficult to test... have to manually check every language to see if it works this way. Console.log statements are for visual checking by PEOPLE, but code can test return values from functions very quickly and with less error.
* In `main.js`, get rid of the `require` for `db.js` and replace it with a `require` of `getAloha.js`. The front end won't care where the data is, it'll be the back end's job to get it.
* Now call getAloha, pass in that `userLanguage` we took in from our terminal-using friend, and save its response as `language`. If all goes according to plan, we'll get back an object like `languages.english` or `languages.arabic`. We'll assume that's going to work and print out our `language.greeting` and `language.farewell` for the user.
* Let's move over to `getAloha.js` and make this happen! First, we'll require our `db.js` file into a `languages` variable here.
* Then take your logic chain from `main.js` and move it into a function called `getAloha` there. Instead of coming in directly from `process.argv` now, our language name will come in as a parameter; maybe call it `languageName`, and change our logic chain to use that name instead of `userLanguage`. (Good to make sure we're not confusing the two!)
* We're no longer printing here; that's the front end's job to do whatever is appropriate with the answer. We're just here to give back the correct answer. So instead of our `console.log`s of each language's properites, just return the entire language object. So if you get passed "english", you'll want to return `languages.english`, but let the front end deal with the object's `.greeting` and `.farewell` properties.
* Now we can run our tests in the terminal, the terminal can run that code, and then `jest` can report whether, given a language, we can give back the matching language object from our `db.js`.
* if you change the languages you're checking for to English, Spanish, and Japanese (keeping in mind that everything should be lowercase!), you SHOULD be passing the first test at this point.
* If you're not, make sure you're:
    * grabbing the languages from `db.js`
    * taking in the language the user wants as a parameter
    * using lower case when checking what language it is
    * If that all seems like you've got it, but you're not passing the test, try checking what values you're working with, with `console.log`, which should be visible through Quokka if you call your own function or through your results in the terminal when WE call it, or with running the debugger (don't forget to call your own function and set breakpoints!)
    

### Still Kind Hard-Coded, Huh.

* So the problem with this approach is that to pass the tests, you'd need if/else cases for English, Spanish, Japanese, Russian, and Zulu, and that would be just to pass the tests... those tests are only checking for 5 of the 26 languages we actually have in our database!
* Instead, we want to be able to generalize.
* What we want to do to generalize is to say, "Whatever language you pass me, I can just look it up on the object." This way, if we add "Klingon" to our database, we don't have to add any more code to `getAloha`... if passed "klingon", it will simply find the `languages.klingon` object and return it. SO: how do we do it?
    * Since we're getting a string for a language from the terminal-wielding user (as `process.argv[2]`), and our `languages` object in `db.js` has a property for each language (`english`, `hawaiian`, `luganda`, etc.), we can say, "I want whatever object is at languages dot... that language." So if we're passed "english", we want to give them back `languages.english`, and so on.
    * So if we're taking in our parameter here as `userLanguage` (and you can call it what you want), we want to say `languages.userLanguage`. But that doesn't work, because userLanguage is a variable name, but `languages.userLanguage` is saying I want a property LITERALLY called "userLanguage", NOT the property at whatever string the variable `userLanguage` HOLDS.
    * So dot notation won't do it for us. But this is precisely what bracket notation is for! We want to use bracket notation to return the object at the key passed to us. if you're missing how todo this, your friendly search engine should be able to help you.
    * If you've got that, then all you need is to return that object to pass the first test.
* Let's test it manually. Our first automatic test, remember, only checks 5 languages!
  * In your `main.js` file, make sure you're a) getting the value from the users' `process.argv[2]`, b) passing that in to your `require`'d in `getAloha` function, and c) printing out BOTH the `.greeting` and `.farewell` properties on the object it returns (preferably in some nice sentence).
  * Now try that out in your terminal! Run `node main.js english` and `node main.js hawaiian` and so on. Try a few that aren't on the first test you're passing but ARE in our db. You should be able to get all of them!
  * You could even at this point try adding a language object (for a real or imagined language!) as a property of our `db.js` object, in the same format as the others. Then try looking it up using `node main.js [your language here]`. It should work automagically!
* Congratulations, you have completed the Minimum Viable Product version of our app!
* But what about the next three tests?!
  * Test 2: case insensitivity. Make sure before you look up the value in your key, that you've lower-cased the string you were passed.
  * Test 3: If we call getAloha without a parameter, return `null`. This is in case our terminal-using user forgets to give us a real value. Then our front end can deal with that information. Hint: if there is nothing passed in, what will be the value of our parameter?
  * Test 4: If we call it with `elvish` (and you haven't put that in yourself!), we should return `null` as well. Hint: there's a way to check if our key is `in` our object!
* You may find that passing some of these tests makes some others not work. Make sure you're checking if it's undefined BEFORE you're trying to lowerCase it... otherwise you may run `.toLowerCase` on a value that's not a string! AND make sure you're lowercasing the language when you check if it's in your `db`... there's a way to get the order of this right. The debugger can help!
* But changing the code to return `null` has affected the front end. Now our function is giving us back `null` if our language isn't in the database or we just wrote `node main.js` without a language at all, and on the front end, we're looking for a `.greeting` property on something (`null`) that doesn't have one. Let's check for `null` and ONLY check for properties if we don't have it, and print something appropriate out if they didn't give us the right response. 
* We might also consider checking before we call `getAloha` to see if our `process.argv` even holds a language, and respond appropriately if it doesn't (without calling our function!). Without that check, we don't know if our function is returning `null` because the language isn't in the db or there was no language at all!
* Final stretch goal if you haven't done this already: make sure all your messages to your user are clear. which one is a greeting and which one is a farewell? Are you telling them how to use the app if they're having trouble? Are you repeating back to them the language they typed? We'll be improving the size of our UI toolbox soon, but let's do what we can with the basic terminal interface for now!

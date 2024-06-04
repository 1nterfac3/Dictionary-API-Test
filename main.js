
//Fetching data from the dictionary API

async function fetchData() {
    //*Always use try and catch for this type of function
    try {

        const word = document.getElementById("input").value;
        word.toLowerCase();

        const wordOutput = document.getElementById("word");
        const definition = document.getElementById("definition");
        const synonyms = document.getElementById("synonym");
        const antonyms = document.getElementById("antonym");
        

        //*Fetching data from the API
        const API_URL = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`; //API URL
        const response = await fetch(API_URL);

        if (!response.ok) {
            alert(`${word} couldn't be found`);
            throw new Error("Couldn't fetch the resource");
        }

        //TODO: Load the synonyms,antonyms,phonetics and other definitions from the API (use loops and array methods)
        const data = await response.json();
        wordOutput.innerHTML = `Word: " ${data[0].word} "`;
        definition.innerHTML = `Definition: ${data[0].meanings[0].definitions[0].definition}`;


        console.log(data[0]); //Always log the data to inspect the JSON
    }
    catch(error) {
        console.log(error);
    }
}
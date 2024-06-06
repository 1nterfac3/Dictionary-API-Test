//Capitalizing the First letter of a string
const capitalizeFirstLetter = (string) => {
    //Capitalizing the first letter and adding it back to the original string minus the first letter
    return string.charAt(0).toUpperCase() + string.slice(1);
}

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

        //TODO: Create the list variables to store the JSON Data in
        

        //*Fetching data from the API
        const API_URL = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`; //API URL
        const response = await fetch(API_URL);

        if (!response.ok) {
            alert(`${word} couldn't be found`);
            throw new Error("Couldn't fetch the resource");
        }

        //Array of the elements with the class name "output"
        const resultSection = document.getElementsByClassName("output"); 
        
        //* Change the display of the elements in the output class from none to inline-block
        for (let i=0; i<resultSection.length; i++) {
            resultSection[i].style.display = "inline-block";
        }

        //TODO: Load the synonyms,antonyms,phonetics and other definitions from the API (use loops and array methods)
        const data = await response.json();
        wordOutput.innerHTML = capitalizeFirstLetter(data[0].word);

        //Definitions
        const allMeanings = data[0].meanings;
        const definitionsList =[];
        
        for (let i=0; i<allMeanings.length; i++) {
            const partOfSpeech = allMeanings[i].partOfSpeech;
            const temp = `${capitalizeFirstLetter(partOfSpeech)}: ${allMeanings[i].definitions[0].definition}`;
            definitionsList.push(temp);
        }
        definition.innerHTML = definitionsList.join('  ');

        //Phonetics
        const phonetics = data[0].phonetics;
        const phoneticsList = [];
        for (let i=0; i<phonetics.length; i++) {
            phoneticsList.push(phonetics[i].text);
        }
        phonetic.innerHTML = phoneticsList.join('  ');

        //? Why is this side undefined but antonyms isn't?
        const allSynonyms = data[0].meanings[0].synonyms; //The Synonyms of the particular word (array)
        console.log(allSynonyms);
        const allSynonymsList = [];
        //TODO: Use a nested for loop to try and solve the issue of the synonyms being undefined
        for (let i=0; i<allMeanings.length-1; i++) {
            const item = allSynonyms[i]; //Index of the synonyms array
            console.log(item);

            if (allSynonyms === undefined) {
                synonyms.innerHTML = "N/A"; //No synonyms for the word
            } else {
                allSynonymsList.push(item); //Add Synonyms to the list
            }  
        }
        synonyms.innerHTML = allSynonymsList.join(' , '); //Display Synonyms


        //Antonyms
        const allAntonyms = data[0].meanings[0].antonyms; //The Antonyms of the particular word (array)
        const allAntonymsList = [];
        // console.log(allAntonyms);

        for (let i=0; i<allMeanings.length-1; i++) {
            const item = allAntonyms[i]; //Index of the antonyms array

            if (allAntonyms.length === 0) {
                antonyms.innerHTML = "No Antonyms"; //No antonyms for the word
            } else {
                allAntonymsList.push(item); //Add antonyms to the list
            }
        }
        antonyms.innerHTML = allAntonymsList.join(' , '); //Display the antonyms


        console.log(data[0]); //Always log the data to inspect the JSON
    }
    catch(error) {
        console.log(error); //Catch the errors present
    }
}
const {api_key} = require('../api_key')

let response; 
getRecipesBySearch = async (searchQuery) =>{
    console.log("from main controller: ", searchQuery)
    console.log(api_key)
    try{
        response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${api_key}&query=${searchQuery}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json()
        console.log("Response: ", data);
        return response;
        
    }catch(err){
        console.error(err)
        throw err;
    }
}

async function consumeStream(response) {
    const reader = response.body.getReader();
    let chunks = [];

    // Read data from the stream
    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
    }

    // Concatenate the chunks into a single Uint8Array
    const uint8Array = new Uint8Array(chunks.reduce((acc, chunk) => acc.concat(Array.from(chunk)), []));

    // Decode the Uint8Array into a string (assuming it's text data)
    const bodyText = new TextDecoder().decode(uint8Array);

    // Log or use the decoded body text
    console.log(bodyText);
}



module.exports = {getRecipesBySearch}
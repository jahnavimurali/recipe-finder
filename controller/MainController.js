const {api_key} = require('../api_key')
const {connect} = require('../model/MainModel')

userLoginAuth=async (username, password)=>{
    console.log(`Authenticate registered user (login): ${username} ${password}`)
    try{
        const db = await connect()
        const usersCollection = db.collection('flavourQuest')
        const user = await usersCollection.findOne({ username, password})
        if (!user){
            return 'incorrect username or password'
        } else{
            return 'login successful'
        }
    }catch(err){
        console.log(err)
        throw err
    }
}

userSignupAuth = async(name, username, password)=>{
    console.log(`Register new user (signup): ${name} ${username} ${password}`)
    try{
        const db = await connect()
        const usersCollection = db.collection('flavourQuest')
        await usersCollection.insertOne({name: name, username: username, password: password, score: 0 });
        return 'signup successful'

    } catch(err){
        console.log(err)
        throw err
    }
}


getRecipesBySearch = async (searchQuery, cuisine, diet) =>{
    console.log("from main controller: ", searchQuery, cuisine, diet)
    console.log(api_key)
    try{
        const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${api_key}&query=${searchQuery}&cuisine=${cuisine}&diet=${diet}&number=12`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json()
        // console.log(data)
        return data;
        
    }catch(err){
        console.error(err)
        throw err;
    }
}

getRecipesRandom = async() => {
    try{
        const response = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${api_key}&number=12`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const complete_data = await response.json()
        // console.log(complete_data)
        const data_results = complete_data.recipes //an array: relevant details id, title, image
        let data = []
        data_results.map((recipe)=>{
            // console.log(recipe.id, recipe.title, recipe.image)
            data.push({id: recipe.id, title: recipe.title, image: recipe.image})
        })
        // console.log("Data: ", data)
        return data
    }catch(err){
        console.error(err)
        throw err
    }
}

module.exports={getRecipesBySearch,userSignupAuth,userLoginAuth,getRecipesRandom}
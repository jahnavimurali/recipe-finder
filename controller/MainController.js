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

saveRecipes = async(username, id)=>{
    try{
        const db = await connect()
        const usersCollection = db.collection('flavourQuest')
        await usersCollection.updateOne({username: username}, {$push: {saved: id}})
        return 'saved successfully'
    }catch(err){
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

getRecipeInformationByID = async(id)=>{
    try{
        console.log("from controller", id)
        const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${api_key}&includeNutrition=false&addWinePairing=false&addTasteData=false`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const complete_data = await response.json()
        // console.log(complete_data)
        let ingredients = []
        let data = {id: complete_data.id, title:complete_data.title, image: complete_data.image, sourceUrl: complete_data.sourceUrl, readyInMinutes: complete_data.readyInMinutes, servings: complete_data.servings}
        const extendedIngredients = complete_data.extendedIngredients
        extendedIngredients.map((ingredient)=>{
            console.log(ingredient)
            ingredients.push(ingredient.original)
        })
        data.ingredients = ingredients
        return data;

    }catch(err){
        console.error(err)
        throw err
    }
}



module.exports={getRecipesBySearch,userSignupAuth,userLoginAuth,getRecipesRandom, getRecipeInformationByID, saveRecipes}
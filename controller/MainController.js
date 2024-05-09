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


getRecipesBySearch = async (searchQuery) =>{
    console.log("from main controller: ", searchQuery)
    console.log(api_key)
    try{
        const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${api_key}&query=${searchQuery}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json()
        return data;
        
    }catch(err){
        console.error(err)
        throw err;
    }
}

module.exports={getRecipesBySearch,userSignupAuth,userLoginAuth}
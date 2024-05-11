const {getRecipesBySearch,userSignupAuth,userLoginAuth,getRecipesRandom, getRecipeInformationByID, saveRecipes, getSavedRecipeIDs, getSavedRecipes} = require('../controller/MainController')

const express = require('express')

const router = express.Router()

router.get('/random', async(req, res)=>{
    try{
        const data = await getRecipesRandom()
        // console.log("from route", data)
        res.status(200).json({data})
    }catch(err){
        console.log(err)
        res.status(500).json({message: 'internal server error'})
    }
})

router.get('/search', async(req, res)=>{
    const searchQuery = req.query.searchQuery
    const cuisine = req.query.cuisine
    const diet=req.query.diet
    // console.log(req.query)
    try{
        const data = await getRecipesBySearch(searchQuery, cuisine, diet)
        res.status(200).json({data})
    }catch(err){
        console.log(err)
        res.status(500).json({message: 'internal server error'})
    }
})

router.get('/displayrecipe', async(req, res)=>{
    const id = req.query.id
    console.log(id)
    console.log(req.query)
    try{
        const data = await getRecipeInformationByID(id)
        res.status(200).json({data})
    }catch(err){
        console.log(err)
        res.status(500).json({message: 'internal server error'})
    }
})

router.post('/save', async(request, response)=>{
    try{
        const username = request.body.username;
        const id = request.body.id;
        console.log(request.body)
        console.log("from main route: ", username, id)
        data = await saveRecipes(username, id);
        if(data==='saved successfully'){
            response.status(200).json({message: data})
        }
        else{
            throw new Error()
        }
    }catch(err){
        console.error(err)
        response.status(500).json({message: 'internal server error'})
    }
})

router.post('/signup',async(request,response)=>{
    var data;
    try{
        if(!request.body.username || !request.body.password || !request.body.name){
            return response.status(400).send({message:'Send all required fields'});
        }
        data = await userSignupAuth(request.body.name,request.body.username, request.body.password)
        // console.log(data)
        if(data==='signup successful'){
            response.status(200).json({message: data})
        }
        else{
            throw new Error()
        }
    }catch(err){
        console.log(err)
        response.status(500).json({message: data})
    }
});


router.post('/login', async(request,response)=>{
    const { username, password } = request.body;
    var data;
    try{
        if(!request.body.username || !request.body.password){
            return response.status(400).send({message:'Send all required fields'});
        }
        data = await userLoginAuth(username, password)
        // console.log(data)
        if(data==='login successful'){
            response.status(200).json({message: data})
        }
        else {
            throw new Error()
        }

    }catch(err){
        console.log(err)
        response.status(500).json({message: data})
    }
});

router.get('/getSavedIDs', async(req, res)=>{
    try{
        const username = req.query.username
        const data = await getSavedRecipeIDs(username)
        // console.log("from route", data)
        res.status(200).json({data})
    }catch(err){
        console.log(err)
        res.status(500).json({message: 'internal server error'})
    }
})

router.get('/getSavedRecipes', async(req,res)=>{
    try{
        const queryString = req.query.queryString
        const data = await getSavedRecipes(queryString)
        // console.log("from route", data)
        res.status(200).json({data})
    }catch(err){
        console.log(err)
        res.status(500).json({message: 'internal server error'})
    }
})


module.exports = router
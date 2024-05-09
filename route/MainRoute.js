const {getRecipesBySearch,userSignupAuth,userLoginAuth} = require('../controller/MainController')

const express = require('express')

const router = express.Router()

router.get('/search', async(req, res)=>{
    const searchQuery = req.query.searchQuery
    console.log(req.query)
    console.log("from route", searchQuery)
    try{
        const data = await getRecipesBySearch(searchQuery)
        res.status(200).json({data})
    }catch(err){
        console.log(err)
        res.status(500).json({message: 'internal server error'})
    }
})

router.post('/signup',async(request,response)=>{
    var data;
    try{
        if(!request.body.username || !request.body.password || !request.body.name){
            return response.status(400).send({message:'Send all required fields'});
        }
        data = await userSignupAuth(request.body.name,request.body.username, request.body.password)
        console.log(data)
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
        console.log(data)
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

module.exports = router
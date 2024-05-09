const {getRecipesBySearch} = require('../controller/MainController')

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

module.exports = router
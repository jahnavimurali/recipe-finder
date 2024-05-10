import React, {useEffect} from 'react'
import { useUser } from './UserContext'

export default function SavedRecipes(){
    const {userName} = useUser();
    console.log(userName)
    useEffect(()=>{
        getSavedRecipes()
    },[])
    const getSavedRecipes=async()=>{
        try{
            const dataStream = await fetch(`http://127.0.0.1:5000/getSaved?username=${userName}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await dataStream.json()

            console.log(data)

        }catch(err){
            console.log(err)
        }
    }
    return(
        <div>
            <h1>Saved</h1>
        </div>
    )


}
import React, { useState, useEffect } from 'react';
import { useUser } from './UserContext';
import DisplayRecipeCards from './DisplayRecipeCards';

export default function SavedRecipes() {
    const { userName } = useUser();
    const [savedRecipeIDs, setSavedRecipeIDs] = useState([]);
    const [savedRecipes, setSavedRecipes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const savedIDs = await getSavedRecipeIDs();
                const recipes = await getSavedRecipes(savedIDs);
                setSavedRecipes(recipes);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    const getSavedRecipeIDs = async () => {
        try {
            const dataStream = await fetch(`http://127.0.0.1:5000/getSavedIDs?username=jahnavimur`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await dataStream.json();
            setSavedRecipeIDs(data.data.saved);
            return data.data.saved; 
        } catch (err) {
            console.log(err);
            return []; 
        }
    };

    const getSavedRecipes = async (ids) => {
        try {
            const queryString = ids.join();

            console.log(queryString)
            const dataStream = await fetch(`http://127.0.0.1:5000/getSavedRecipes?queryString=${queryString}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await dataStream.json();
            console.log(data.data)
            return data.data; 
        } catch (err) {
            console.log(err);
            return []; 
        }
    };

    return (
        <div className='save-container'>
            <h1>Let's get cooking!</h1>
            <h2>Here are some of your favourites</h2>
            <br></br>
            {savedRecipes.length === 0 ? (
                <p>No saved recipes yet!</p>
            ) : (
                <DisplayRecipeCards props={savedRecipes} />
            )}
        <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Amatic+SC:wght@400;700&display=swap');
        .save-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
        h1,h2{
            font-family: "Amatic SC", sans-serif;
            font-weight: 800;
        }
        
        `}</style>
        </div>
    );
}

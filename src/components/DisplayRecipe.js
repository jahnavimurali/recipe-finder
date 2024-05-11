import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from './UserContext';
import axios from 'axios';

export default function DisplayRecipe() {
    const { id } = useParams(); 
    const [recipeInfo, setRecipeInfo] = useState({});
    const { userName } = useUser();

    useEffect(() => {
        const fetchInfo = async () => {
            try {
                const response = await fetch(`http://localhost:5000/displayrecipe?id=${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                setRecipeInfo(data.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchInfo();
    }, []);

    const handleSave = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/save`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "username": userName,
                    "id": id
                })
            });
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="recipe-container">
            <div className="recipe-header">
                <h1>{recipeInfo.title}</h1>
                <div className="recipe-info">
                    <p><strong>Prep Time:</strong> {recipeInfo.readyInMinutes} minutes</p>
                    <p><strong>Servings:</strong> {recipeInfo.servings}</p>
                </div>
            </div>
            <div className="recipe-content">
                <div className="recipe-details">
                    <div className="recipe-image">
                        <img src={recipeInfo.image} alt={recipeInfo.title} />
                    </div>
                    <h2>Ingredients Required:</h2>
                    <ul className="ingredients-list">
                        {recipeInfo.ingredients && recipeInfo.ingredients.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
                
            </div>
            <div className="recipe-instructions">
                <h2>Instructions:</h2>
                <ol className="instructions">
                    {recipeInfo.instructions && recipeInfo.instructions.map((instr, index) => (
                        <li key={index}>{instr}</li>
                    ))}
                </ol>
            </div>
            <button onClick={handleSave}>Save!</button>
            <p className="more-info">Click <a href={recipeInfo.sourceUrl} target="_blank" rel="noreferrer">here</a> for more info.</p>
            <style jsx>{`
                @import url('https://fonts.googleapis.com/css2?family=Amatic+SC:wght@400;700&display=swap');
                h1, h2{
                    font-family: "Amatic SC", sans-serif;
                    font-weight: bolder;
                }
                .recipe-container {
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #fff;
                    border-radius: 10px;
                    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
                    margin-top: 20px;
                    margin-bottom: 20px;
                }
                
                .recipe-header {
                    text-align: center;
                    margin-bottom: 20px;
                }
                
                .recipe-header h1 {
                    font-size: 32px;
                    margin-bottom: 10px;
                }
                
                .recipe-info {
                    display: flex;
                    justify-content: center;
                }
                
                .recipe-info p {
                    margin: 0 20px;
                }
                
                .recipe-content {
                    display: flex;
                    flex-direction: column;
                }
                
                .recipe-details {
                    margin-bottom: 20px;
                }
                
                .recipe-details h2 {
                    font-size: 24px;
                    margin-bottom: 10px;
                }
                
                .ingredients-list {
                    list-style-type: none;
                    padding-left: 0;
                }
                
                .ingredients-list li {
                    margin-bottom: 10px;
                }
                
                .recipe-image img {
                    width: 50%;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    margin-left: 210px;
                }
                
                .more-info {
                    text-align: center;
                    margin-top: 20px;
                    font-style: italic;
                }
                
                .more-info a {
                    color: #007bff;
                    text-decoration: none;
                }
                
                button {
                    color: #fff;
                    background-color: #fc8019;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 16px;
                    position: relative;
                    margin-top: 30px;
                    margin-left: 360px;
                }
                
                button:hover {
                    background-color: #ff9933;
                }
                
            `}</style>
        </div>
    );
}

// DisplayRecipe.js
import React, {useState, useEffect}from 'react';
import { useParams } from 'react-router-dom';

export default function DisplayRecipe() {
    const { id } = useParams(); // Access the 'id' parameter from the URL
    const [recipeInfo, setRecipeInfo] = useState({})

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
                // console.log(data.data)
                setRecipeInfo(data.data)
            } catch (err) {
                console.log(err);
            }
        };
    
        fetchInfo();
    
    }, []);

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
                <div className="recipe-image">
                    <img src={recipeInfo.image} alt={recipeInfo.title} />
                </div>
                <div className="recipe-details">
                    <h2>Ingredients Required:</h2>
                    <ul className="ingredients-list">
                        {recipeInfo.ingredients && recipeInfo.ingredients.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <p className="more-info">Click <a href={recipeInfo.sourceUrl} target="_blank" rel="noreferrer">here</a> for more info.</p>
            <style jsx>{`
                .recipe-container {
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #fff;
                    border-radius: 10px;
                    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
                    margin-top: 20px;
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
                }
                
                .recipe-image {
                    flex: 1;
                    margin-right: 20px;
                    margin-top: 20px;
                }
                
                .recipe-image img {
                    width: 100%;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                
                .recipe-details {
                    flex: 1;
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
                
                .more-info {
                    text-align: center;
                    margin-top: 20px;
                    font-style: italic;
                }
                
                .more-info a {
                    color: #007bff;
                    text-decoration: none;
                }
                
            `}</style>
        </div>
    );
}
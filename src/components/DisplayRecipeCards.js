import React from 'react';
import { Link } from 'react-router-dom';

export default function DisplayRecipeCards(props) {
    const recipes = props.props;

    if (!recipes) {
        return null;
    }

    return (
        <div className='recipe-cards'>
            {recipes.map((recipe, index) => (
                <Link to={`/displayrecipe/${recipe.id}`} key={recipe.id}>
                <div className='recipe-card' key={recipe.id}>
                    <>
                        <img className='recipe-image' src={recipe.image} alt={recipe.title} />
                        <p className='recipe-title'>{recipe.title}</p>
                    </>
                    <div className='icons'>
                        <img src="https://i.pinimg.com/474x/03/d4/ef/03d4ef3d56affe7f6a9280ceb1876e04.jpg"/>
                    </div>
                </div>
                </Link>
            ))}
        <style jsx>{`
            @import url('https://fonts.googleapis.com/css2?family=Amatic+SC:wght@400;700&display=swap');

            .recipe-cards{
                display: grid;
                grid-template-columns: repeat(4, 6fr);
                row-gap: 30px;
                column-gap: 30px;
              }
              
              .recipe-card {
                width: 200px;
                background-color: #f9f9f9;
                border-radius: 8px;
                padding: 10px;
                box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
                transition: transform 0.3s ease;
              }
              
              .recipe-card:hover {
                transform: translateY(-5px);
              }
              
              .recipe-image {
                width: 100%;
                border-radius: 8px;
                margin-bottom: 10px;
              }
              
              .recipe-title {
                font-size: 17px;
                margin: 0;
                font-weight: 700;
                font-family: "Amatic SC", sans-serif;
                height: 10vh;
              }

              .icons {
                display:flex;
                flex-direction:row;
              }

              .icons img{
                height: 20px;
                width: 20px;
              }
        `}</style>
        </div>
    );
}

import React from 'react';
export default function DisplayRecipeCards(props) {
    const recipes = props.props;

    if (!recipes) {
        return null;
    }

    return (
        <div className='recipe-cards'>
            {recipes.map((recipe, index) => (
                <div className='recipe-card' key={recipe.id}>
                    <img className='recipe-image' src={recipe.image} alt={recipe.title} />
                    <p className='recipe-title'>{recipe.title}</p>
                </div>
            ))}
        </div>
    );
}

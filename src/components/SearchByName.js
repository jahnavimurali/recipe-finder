import {useState} from 'react'
import DisplayRecipeCards from './DisplayRecipeCards';

export default function SearchByName(){
    const [recipes, setRecipes] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const handleChange = (event) => {
        setSearchQuery(event.target.value);
    };
    const handleSearchInput=async ()=>{
        if(searchQuery!==''){
            try{
                const response = await fetch(`http://localhost:5000/search?searchQuery=${searchQuery}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const data = await response.json()
                // console.log("from search component", data.data.results)
                setRecipes(data.data.results)

            }catch(err){
                console.log(err)
            }
        }
    }
    return (
        <div>
        <div className = 'search-bar'>
            <input id='search-query' type = 'text' placeholder='Search recipes...' onChange={handleChange} value={searchQuery}/>
            <br />
            <input type='button' value='search' onClick={handleSearchInput}/>
        </div>
        <DisplayRecipeCards props={recipes} />
        </div>
    )
}
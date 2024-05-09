import {useState} from 'react'
export default function SearchByName(){
    const [recipes, setRecipes] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const handleSearchInput=async (event)=>{
        setSearchQuery(event.target.value)
        console.log(searchQuery)
        if(searchQuery!==''){
            try{
                const response = await fetch(`http://localhost:5000/search?searchQuery=${searchQuery}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                console.log("from search component", response)
                setRecipes(response)

            }catch(err){
                console.log(err)
            }
        }
    }
    return (
        <div className = 'search-bar'>
            <input id='query' type = 'text' placeholder='Search recipes...' onChange={handleSearchInput}/>
        </div>
    )
}
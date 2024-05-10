import {useState,useEffect} from 'react'
import DisplayRecipeCards from './DisplayRecipeCards';
import { useUser } from './UserContext';
import { useNavigate } from 'react-router-dom';

export default function Home(){
    const [recipes, setRecipes] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [cuisine, setCuisine]=useState('')
    const [diet, setDiet]=useState('')
    const navigate = useNavigate()

    const {userName} = useUser()
    console.log("HOME!", userName)

    useEffect(() => {
        // const fetchRandom = async () => {
        //     try {
        //         const response = await fetch(`http://localhost:5000/random`, {
        //             method: 'GET',
        //             headers: {
        //                 'Content-Type': 'application/json'
        //             }
        //         });
        //         const data = await response.json();
        //         setRecipes(data.data);
        //     } catch (err) {
        //         console.log(err);
        //     }
        // };
    
        // fetchRandom();
    
    }, []);
    

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleCuisineFilter = (event) => {
        setCuisine(event.target.value);
    };

    const handleDietFilter = (event) => {
        setDiet(event.target.value);
    };

    const handleInput=async ()=>{
        try{
            const response = await fetch(`http://localhost:5000/search?searchQuery=${searchQuery}&cuisine=${cuisine}&diet=${diet}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()
            setRecipes(data.data.results)
        }catch(err){
            console.log(err)
        }
    }

    const handleSaveRetrieval = ()=>{
        navigate('/saved')
    }

    const cuisineOptions = ['African', 'Asian', 'American', 'British','Cajun','Caribbean','Chinese',
        'European','French','German','Greek','Indian','Irish','Italian','Japanese','Korean',
        'Mediterranean', 'Mexican','Southern','Spanish','Thai','Vietnamese'
    ]

    const dietOptions = ['Gluten Free', 'Ketogenic', 'Vegetarian', 'Lacto-Vegetarian','Ovo-Vegetarian','Vegan','Pescetarian','Paleo','Low FODMAP', 'Whole30']

 
    return (
        <div className='home-container'>
        <div className = 'search-bar'>
            <input id='search-query' type = 'text' placeholder='Search recipes...' onChange={handleSearchChange} value={searchQuery}/>
        </div>
        <div className='filters'>
            <select value={cuisine} onChange={handleCuisineFilter}>
                <option value=''>Cuisine</option>
                {
                    cuisineOptions.map((option)=>{
                        return(
                        <option value={option}>{option}</option>
                        )
                    })
                }

            </select>
            <select value={diet} onChange={handleDietFilter}>
                <option value=''>Diet</option>
                {
                    dietOptions.map((option)=>{
                        return(
                            <option value={option}>{option}</option>
                        )
                    })
                }
            </select>
        <input type='button' value='search' onClick={handleInput}/>
        <input type='button' value='search' onClick={handleSaveRetrieval}/>
        </div>
        <br></br>
        <br></br>
        <DisplayRecipeCards props={recipes} />
        <style jsx>{`
            .home-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 20px;
            }
            
            .search-bar {
                background-image: url('https://i.pinimg.com/564x/1b/c8/a4/1bc8a412179dd7e29a776cdf10a7811e.jpg');
                background-size: cover;
                background-position: center;
                width: 100%;
                padding: 20px;
                box-sizing: border-box;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            
            .search-bar input[type='text'] {
                width: 80%;
                padding: 10px;
                border: none;
                border-radius: 5px;
                font-size: 16px;
                outline: none;
            }
            
            .filters {
                margin-top: 20px;
                display: flex;
                justify-content: center;
            }
            
            .filters select {
                margin: 0 10px;
                padding: 10px;
                border-radius: 5px;
                border: none;
                font-size: 16px;
                outline: none;
            }
            
            input[type='button'] {
                margin-top: 3px;
                padding: 10px 20px;
                border-radius: 5px;
                border: none;
                background-color: #fc8019; /* Example color, you can change it */
                color: #fff;
                font-size: 16px;
                cursor: pointer;
                outline: none;
                margin-left: 30px;
            }
            
            input[type='button']:hover {
                background-color: #ff9933; /* Example color, you can change it */
            }
            
        
        
        `}</style>
        </div>
    )
}
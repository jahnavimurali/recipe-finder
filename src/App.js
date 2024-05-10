import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes,Route} from 'react-router-dom';

import Splash from './components/Splash'
import Signup from './components/Signup'
import Login from './components/Login';
import Home from './components/Home';
import DisplayRecipe from './components/DisplayRecipe';
import SavedRecipes from './components/SavedRecipes';

import { UserProvider } from './components/UserContext';

const App = () => {

  return (
    <UserProvider>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Splash />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/home' element={<Home />}/>
        <Route path="/displayrecipe/:id" element={<DisplayRecipe />} />
        <Route path="/saved" element={<SavedRecipes />} /> 
      </Routes> 
      </BrowserRouter>
    </UserProvider>
  )
}

export default App;


import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes,Route} from 'react-router-dom';

import Splash from './components/Splash'
import Signup from './components/Signup'
import Login from './components/Login';
import Home from './components/Home';

// import SearchByName from './components/SearchByName'
// function App() {
//   return (
//     <SearchByName />
//   );
// }

const App = () => {

  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Splash />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/home' element={<Home />}/>
        {/* <Route path="/saved" element={<Quiz />} />  */}
      </Routes> 
      </BrowserRouter>
      
    </div>
  )
}

export default App;


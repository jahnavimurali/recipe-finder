import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/signup', {
        name,
        username,
        password
      });
      console.log(response.data);
    //   navigate('/quiz');

    } catch (error) {
      console.error('Sign Up error:', error);
      setErrorMessage('Invalid username or password or name');
    }
  };

  return (
    <div className='signup-container'>
      <h1>Sign up!</h1>
      <div className='signup-box'>
            <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
            <br></br>
            <br></br>
            <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
            <br></br>
            <br></br>
            <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleSignUp}>Let's go!</button>
            <p style={{ color: 'red' }}>{errorMessage}</p>
      </div>
      <br></br>
      <div className='login'>
            <span>
            <p style={{ display: 'inline', paddingRight: '10px' }}>Already have an account? </p>
            <a href="/login" style={{ display: 'inline', paddingRight: '10px', color: '#fc8019', textDecoration: 'none'}}>Login</a>
            </span>
      </div>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Amatic+SC:wght@400;700&display=swap');
        body{
            background-image: url("https://i.pinimg.com/564x/1b/c8/a4/1bc8a412179dd7e29a776cdf10a7811e.jpg");
            background-size:cover;
            background-repeat:norepeat;
        }
        h1 {
            font-family: "Amatic SC", sans-serif;
            font-weight: 600;
            font-style: normal;
            font-size: 50px;
            padding-bottom: 0px;
            text-align: center;
        }
        .signup-container{
            display: flex;
            flex-direction: column;
            margin-left: 700px;
            margin-top: 50px;
            width: 400px;
        }
        
        input {
            width: 90%;
            padding: 10px;
            border: 1px solid #ccc;
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
            margin-top: 40px;
            margin-left: 145px;
        }
        button:hover {
            background-color: #ff9933;
        }

        .login{
            position: relative;
            margin-left: 80px;
        }
      `
      }</style>
     
    </div>
  );
};

export default Signup;

import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Splash() {
    const navigate = useNavigate();
    return(
        <div className='splash-screen'>
            <p id='initial-text'>Explore Endless Culinary Adventures here!</p>
            <p style={{textAlign: "center"}}>Hi y'all! Wanna explore recipes from all around the world? Well, here ya go! We present to you Flavour Quest, for the foodie in you!</p>
            <button className='button' onClick={()=>{navigate('/signup')}}>Let's get started!</button>
            <style jsx>{`
                @import url('https://fonts.googleapis.com/css2?family=Amatic+SC:wght@400;700&display=swap');
                body{
                    background-image: url("https://i.pinimg.com/564x/1b/c8/a4/1bc8a412179dd7e29a776cdf10a7811e.jpg");
                    background-size:cover;
                    background-repeat:norepeat;
                }
                .splash-screen{
                    margin-left: 700px;
                    margin-top: 120px;
                    width: 400px;
                }
                #initial-text{
                    font-family: "Amatic SC", sans-serif;
                    font-weight: 600;
                    font-style: normal;
                    font-size: 50px;
                    padding-bottom: 0px;
                    text-align: center;

                }
                .button {
                    color: #fff;
                    background-color: #fc8019;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 16px;
                    position: relative;
                    margin-top: 40px;
                    margin-left: 130px;
                }
                .button:hover {
                    background-color: #ff9933;
                }
            `
            }</style>
        </div>
    )
}

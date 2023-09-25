import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Home.css';

function Home() {
    const navigate = useNavigate();

    const [data, setData] = useState({ amount: 1, category: 9, difficulty: "easy", type: "boolean" });

    function handleClick() {
        navigate('/quiz', { state: { data } });
    }

    useEffect(() => {
        const diffElement = document.getElementById('diffSelection');

        diffElement.addEventListener('change', function () {
            data.difficulty = diffElement.value;
        });

        const typeElement = document.getElementById('typeSelection');

        typeElement.addEventListener('change', function () {
            data.type = typeElement.value;
        });

        const categoryElement = document.getElementById('categorySelection');

        categoryElement.addEventListener('change', function () {
            data.category = categoryElement.value;
        });

        const amountElement = document.getElementById('amountSelection');
        amountElement.addEventListener('change', function () {
            const parsedValue = parseInt(amountElement.value, 10);
            if (!isNaN(parsedValue) && parsedValue >= 1) {
                data.amount = amountElement.value;
            }
        });

        return () => {
            diffElement.removeEventListener('change', () => { });
            typeElement.removeEventListener('change', () => { });
            categoryElement.removeEventListener('change', () => { });
            amountElement.removeEventListener('change', () => { });
        }

    }, []);


    return (
        <div className="Home">
            <h1>WELCOME TO TRVIA</h1>
            <p>Select your quiz preferences below.</p>

            <form>

                <label for="quantity">Amount: </label>
                <input 
                    type="number" 
                    id="amountSelection" 
                    name="quantity" 
                    min="1"
                />

                <p>Category: </p>
                <select id="categorySelection">
                    <option value="9">General Knowledge</option>
                    <option value="10">Entertainment: Books</option>
                    <option value="any">Any Category</option>
                    <option value="11">Entertainment: Film</option>
                    <option value="12">Entertainment: Music</option>
                    <option value="13">Entertainment: Musicals &amp; Theatres</option>
                    <option value="14">Entertainment: Television</option>
                    <option value="15">Entertainment: Video Games</option>
                    <option value="16">Entertainment: Board Games</option>
                    <option value="17">Science &amp; Nature</option>
                    <option value="18">Science: Computers</option>
                    <option value="19">Science: Mathematics</option>
                    <option value="20">Mythology</option>
                    <option value="21">Sports</option>
                    <option value="22">Geography</option>
                    <option value="23">History</option>
                    <option value="24">Politics</option>
                    <option value="25">Art</option>
                    <option value="26">Celebrities</option
                    ><option value="27">Animals</option>
                    <option value="28">Vehicles</option>
                    <option value="29">Entertainment: Comics</option>
                    <option value="30">Science: Gadgets</option>
                    <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
                    <option value="32">Entertainment: Cartoon &amp; Animations</option>
                </select>

                <p>Difficulty: </p>
                <select id="diffSelection">
                    <option value="easy" defaultValue>Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>

                <p>Type: </p>
                <select id="typeSelection">
                    <option value="boolean" defaultValue>Boolean</option>
                    <option value="multiple">Multiple</option>
                </select>

            </form>

            <button onClick={handleClick}>Start Quiz</button>

        </div>
    );
}
export default Home;




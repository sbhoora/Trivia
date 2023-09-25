import React from 'react';
import { useEffect, useState } from 'react';
import './Quiz.css';
import { useLocation, useNavigate } from 'react-router-dom';
import heart from '../images/heart.png';
import he from 'he';

function Quiz(props) {
    const navigate = useNavigate();

    const location = useLocation();
    const data = location.state ? location.state.data : null;

    const amount = data.amount;
    const category = "&category=" + data.category;
    const difficulty = "&difficulty=" + data.difficulty;
    const type = "&type=" + data.type;


    //question number
    const [qNum, setQNum] = useState(0);

    //list of questions
    const [qList, setQList] = useState([]);

    const [question, setQuestion] = useState();
    const [options, setOptions] = useState([]);
    const [answer, setAnswer] = useState();

    //correct answer?
    const [isCorrect, setIsCorrect] = useState(null);

    //Give the user 2 extra lives instead of ending the game on the first failure
    const [lives, setLives] = useState(3);
    //Add a points system for different question difficulties
    //easy = 1, medium = 5, hard = 10
    const [points, setPoints] = useState(0);

    const addPoints = () => {
        if (data.difficulty == "easy") {
            setPoints(points + 1);
        } else if (data.difficulty == "medium") {
            setPoints(points + 5);
        } else if (data.difficulty == "hard") {
            setPoints(points + 10);
        }
    }

    const handleNextClick = () => {
        console.log(qNum + 2)
        setIsCorrect(null);
        if (qNum == qList.length - 1 && isCorrect) { //all questions are answered correctly
            console.log("finished");
            setQNum(0);
            setLives(3);
            setPoints(0);
        } else if (!isCorrect && lives == 0) { //answer was wrong and 0 lives left
            console.log("restart");
            setQNum(0);
            setLives(3);
            setPoints(0);
        } else if (!isCorrect && lives > 0 && qNum + 2 <= qList.length) { //answer was wrong and 1 or 2 lives left
            setQNum(qNum + 1);
            //setLives(lives-1);
        } else if (isCorrect && lives > 0 && qNum + 2 <= qList.length) {
            setQNum(qNum + 1);
        }
        //console.log(qNum);
    }

    const handleOptionSelect = (index) => {
        if (answer == index) {
            //console.log("correct");
            setIsCorrect(true);
            addPoints();
        } else {
            //console.log("wrong");
            setIsCorrect(false);
            setLives(lives - 1);
        }
    }

    useEffect(() => { //goes to the next question when qNum or qList is updated
        if (qList[qNum] != undefined) {
            const { question, answer, options } = qList[qNum];
            //console.log('qList has been updated:', question);
            setQuestion(question);
            setOptions(options);
            setAnswer(options.indexOf(answer));
        }
    }, [qNum, qList]);


    function GetQuestions(amount, category, difficulty, type) {
        useEffect(() => {
            fetch("https://opentdb.com/api.php?amount=" + amount + category + difficulty + type)
                .then(response => response.json())
                .then(data => {
                    console.log(data); //GOAL 1

                    const temp = [];

                    function Question(question, answer, options) {
                        this.question = he.decode(question);
                        this.answer = he.decode(answer);
                        this.options = options;
                    }

                    for (let i = 0; i < data.results.length; i++) {

                        const { question, incorrect_answers, correct_answer } = data.results[i];

                        let options = (
                            type == "&type=multiple" ? (incorrect_answers.concat(correct_answer).sort(() => Math.random() - 0.5)) :
                                ["True", "False"]
                        );

                        const q = new Question(question, correct_answer, options);

                        temp.push(q);

                    };

                    setQList(temp);


                });
        }, []);
    }

    GetQuestions(amount, category, difficulty, type);
    //style={{ display: showInfo ? "block" : "none" }
    return (
        <div className="quiz">

            <div className="heart">
                <img src={heart} alt="heartPic" width="100" height="100"
                    style={{ display: lives == 3 ? "" : "none" }} />
                <img src={heart} alt="heartPic" width="100" height="100"
                    style={{ display: lives >= 2 ? "" : "none" }} />
                <img src={heart} alt="heartPic" width="100" height="100"
                    style={{ display: lives >= 1 ? "" : "none" }} />
            </div>

            <div className='statsContainer'>
                <div className='questionNumberContainer'>
                    <p className='questionNum'>{qNum + 1}</p>
                    <p className='questionTotal'>/{qList.length}</p>
                </div>

                <p className="points">Points: {points}</p>
            </div>
            

            <h1 className='questionH1'>{question}</h1>

            <div id="options" >
                {options.map((option, index) => ( //GOAL 2
                    <button
                        key={index}
                        onClick={() => { handleOptionSelect(index); }}
                        disabled={isCorrect !== null}
                        id="optionBtns"
                    >{he.decode(option)}</button>
                ))}
            </div>

            <div className='msg' style={{ display: isCorrect != null ? "" : "none" }}>
                {isCorrect === true && (
                    <>
                        <p>Success! You chose the correct answer. 🙌🏼</p>
                        {qNum == qList.length - 1 ?
                            (<>
                                <p>YAYY UR DONE 🎉</p>
                                <button className='qChangeBtn' onClick={() => navigate('/congrats')}>DONE</button>
                            </>) :
                            (<button className='qChangeBtn' onClick={handleNextClick}>Next</button>)}
                    </>
                )}

                {isCorrect === false && (
                    <>
                        <p>Oops! You chose the wrong answer. 😭</p>
                        <p>Correct Answer: {options[answer]}</p>
                        {lives == 0 ?
                            (<>
                                <p>The quiz must be restarted now. 😔</p>
                                <button onClick={handleNextClick} className='qChangeBtn'>Restart</button>
                            </>) :
                            (<button onClick={handleNextClick} className='qChangeBtn'>Next</button>)
                        }
                    </>
                )}
            </div>

        </div>

    )
}

export default Quiz;


import React from 'react';
import { useEffect, useState } from 'react';
import './Quiz.css';
import { useLocation, useNavigate } from 'react-router-dom';

function Quiz(props) {
    const navigate = useNavigate();

    const location = useLocation();
    const data = location.state ? location.state.data : null;

    const amount = data.amount;
    const category = "&category=" + data.category;
    const difficulty = "&difficulty=" + data.difficulty;
    const type = "&type=" + data.type;

    console.log(difficulty);
    console.log(type);
    console.log(category);

    //question number
    const [qNum, setQNum] = useState(0);

    //list of questions
    const [qList, setQList] = useState([]);

    const [question, setQuestion] = useState();
    const [options, setOptions] = useState([]);
    const [answer, setAnswer] = useState();

    //correct answer?
    const [isCorrect, setIsCorrect] = useState(null);

    const handleNextClick = () => {
        setQNum(qNum + 1);
        setIsCorrect(null);
        if (qNum == qList.length - 1 && isCorrect) {
            console.log("finished");
            setQNum(0);
        } else if (!isCorrect){
            console.log("restart");
            setQNum(0);
        }
        //console.log(qNum);
    }

    const handleOptionSelect = (index) => {
        if (answer == index) {
            //console.log("correct");
            setIsCorrect(true);
        } else {
            //console.log("wrong");
            setIsCorrect(false);
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
                        this.question = question;
                        this.answer = answer;
                        this.options = options
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

    return (
        <div className="quiz">
            <p className='questionNum'>{qNum + 1}/{qList.length}</p>
            <h1>{question}</h1>
            <div id="options">
                {options.map((option, index) => ( //GOAL 2
                    <button
                        key={index}
                        onClick={() => { handleOptionSelect(index); }}
                        disabled={isCorrect !== null}
                    >{option}</button>
                ))}
            </div>
            {isCorrect === true && (
                <>
                    <p>Success! You chose the correct answer.</p>
                    {qNum == qList.length - 1 ? 
                    (<>
                        <p>YAYY UR DONE</p>
                        <button onClick={() => navigate('/congrats')}>DONE</button>
                    </>) : 
                    (<button onClick={handleNextClick}>Next</button>)}
                </>
            )}
            {isCorrect === false && (
                <>
                    <p>Oops! You chose the wrong answer.</p>
                    <p>Correct Answer: {options[answer]}</p>
                    <button onClick={handleNextClick}>Restart</button>
                </>
            )}

        </div>

    )
}

export default Quiz;


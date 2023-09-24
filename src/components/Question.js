import React from 'react';
import { useEffect, useState } from 'react';

function Question() {
    const amount = "4";
    const category = "&category=" + "9";
    const difficulty = "&difficulty=" + "easy";
    const type = "&type=" + "boolean";

    //const [API, setAPI] = useState("https://opentdb.com/api.php?amount=" + amount + category + difficulty + type);

    //question number
    const [qNum, setQNum] = useState(0);

    const [qList, setQList] = useState([]);

    const [question, setQuestion] = useState();
    const [options, setOptions] = useState([]);
    const [answer, setAnswer] = useState();

    const btnClick = () => {
        setQNum(qNum + 1);
        //console.log(qNum);
    }


    
    useEffect(() => { //goes to the next question when qNum or qList is updated
        if(qList[qNum] != undefined) {
        const { question, answer, options } = qList[qNum];
        //console.log('qList has been updated:', question);
        //console.log(answer + "   setAnswer:" + (options.indexOf(answer)));
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
        
        <>
            <h1>{question}</h1>
            <div>
                {options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            index == answer ? console.log("correct") : console.log("wrong");
                            btnClick();
                          }}
                    >{option}</button>
                ))}
            </div>
        </>
        
    )
}

export default Question;


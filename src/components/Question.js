import React from 'react';
import { useEffect, useState } from 'react';

function Question() {
    const amount = "4";
    const category = "&category=" + "9";
    const difficulty = "&difficulty=" + "easy";
    const type = "&type=" + "multiple";

    //const [API, setAPI] = useState("https://opentdb.com/api.php?amount=" + amount + category + difficulty + type);

    //question number
    const [qNum, setQNum] = useState(0);

    const [qList, setQList] = useState([]);

    const [question, setQuestion] = useState();
    const [options, setOptions] = useState([]);
    const [answer, setAnswer] = useState();

    const btnClick = () => {
        setQNum(qNum + 1);
        console.log(qNum);
    }

    
    useEffect(() => {
        if(qList[qNum] != undefined) {
        console.log('qList has been updated:', qList.length);
        
        const { question, answer, options } = qList[qNum];
        setQuestion(question);
        setOptions(options);
        setAnswer(answer);
        }
    }, [qNum, qList]); // Add qList to the dependency array
  
    

    function IDEK(amount, category, difficulty, type) {
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
    
    IDEK(amount, category, difficulty, type);

    return (  
        
        <>
            <h1>{question}</h1>
            <div>
                {options.map((answer, index) => (
                    <button
                        key={index}
                        onClick={btnClick}
                    >{answer}</button>
                ))}
            </div>
        </>
        
    )
}

export default Question;


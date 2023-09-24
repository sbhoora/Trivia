import React from 'react';
import { useEffect, useState } from 'react';

function Question() {
    var amount, category, difficulty, type;
    amount = "2";
    category = "&category=" + "9";
    difficulty = "&difficulty=" + "easy";
    type = "&type=" + "multiple";

    const [API, setAPI] = useState("https://opentdb.com/api.php?amount=" + amount + category + difficulty + type);

    //question number
    const [qNum, setQNum] = useState(0);

    const [qList,setQList] = useState([]);

    const btnClick = () => {
        setQNum(qNum + 1);
    }

    useEffect(() => {
        setQList([])
        fetch(API)
            .then(response => response.json())
            .then(data => {
                console.log(data); //GOAL 1

                for(let i = 0; i<data.results.length; i++){

                    const { question, incorrect_answers, correct_answer } = data.results[i];
                    
                    let options =  (
                    type == "&type=multiple" ? (incorrect_answers.concat(correct_answer).sort(() => Math.random() - 0.5)) :
                        ["True", "False"]
                    );

                    function Question(question,answer,options){
                        this.question = question;
                        this.answer = answer;
                        this.options = options
                    }
                    const q = new Question(question, correct_answer, options);
                    
                    qList.push(q);
                    
                };
                
                setQList(qList);

            });
            
    }, []); //should only rerender when ALL questions are answered

    console.log("Pass")
    

    //const { question, answer, options } = qList[qNum];
   
    

    return ( null
        /*
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
        */
    )
}

export default Question;


import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Congrats.css';

function Congrats() {
    const navigate = useNavigate();

    return(
        <button onClick={() => navigate('/')}>HOME</button>
    )
}

export default Congrats;

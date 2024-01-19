import * as React from 'react'
import {CalculatorMono} from "./normal/CalculatorMono.jsx";
import {CalculatorView} from "./engineered/CalculatorView.jsx";

export const Main: React.FC = () => {


    return (
        <div style={{padding: 10}}>
            <div>
                <h2>Monolythic Calculator</h2>
                <CalculatorMono/>
            </div>
            <div>
                <h2>Engineered Calculator</h2>
                <CalculatorView/>
            </div>
        </div>
    );
};




import * as React from 'react'
import {CalculatorNormal} from "./normal/CalculatorNormal.jsx";
import {CalculatorView} from "./engineered/CalculatorView.jsx";

export const Main: React.FC = () => {


    return (
        <div>
            <div style={{}}>
                <CalculatorNormal/>
            </div>
            <div>
                <CalculatorView/>
            </div>
        </div>
    );
};




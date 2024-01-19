import React, {useRef, useState} from "react";
import {useCalculator} from "./useCalculator.js";
import {MathOp, mathOps} from "./calculator.js";

export const CalculatorView: React.FC = () => {
    const [value, setValue] = useState(0);
    const inputting = useRef(false);
    const {calculate, pushOp, pushValue, clear} = useCalculator();

    const onNumberClick = (num: number) => () => {
        setValue((inputting.current ? value * 10 : 0) + num);
        inputting.current = true;
    };

    const onOpClick = (op: MathOp) => () => {
        pushValue(value);
        pushOp(op);
        inputting.current = false;
    };

    const onClear = () => {
        clear();
        setValue(0);
    };

    const total = () => {
        pushValue(value);
        setValue(calculate());
    };

    return (
        <div style={{display: "flex", width: 310, flexDirection: 'column', padding: 50}}>
            <div style={styles.value}>{value}</div>
            <div style={{display: 'flex'}}>
                <div style={{flex: 1}}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0].map(n => typeof n === 'number' ?
                        <button key={n} style={styles.numberBtn} onClick={onNumberClick(n)}>{n}</button> :
                        <button  key={'clear'} style={styles.numberBtn} onClick={onClear}>AC</button>)}
                </div>
                <div style={{width: 60}}>
                    {Object.keys(mathOps).map(op =>
                        <button key={op} style={styles.opBtn} onClick={onOpClick(op as MathOp)}>{op}</button>
                    )}
                    <button style={{...styles.opBtn, ...styles.equalBtn}} onClick={total}>=</button>
                </div>
            </div>
        </div>
    );

}

const styles = {
    opBtn: {
        fontSize: 20,
        width: 30
    },
    equalBtn: {
        width: 60
    },
    numberBtn: {
        width: 80
    },
    value: {
        border: '2px solid black'
    }
}
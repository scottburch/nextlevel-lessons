import React, {useRef, useState} from "react";
import {useCalculator} from "./useCalculator.js";
import {MathOp, mathOps} from "./calculator.js";

export const CalculatorView: React.FC = () => {
    const [value, setValue] = useState('');
    const inputting = useRef(false);
    const {calculate, pushOp, pushValue, clear} = useCalculator();

    const onOpClick = (op: MathOp) => () => {
        pushValue(parseFloat(value));
        pushOp(op);
        inputting.current = false;
    };


    const onNumberClick = (num: string) => () => {
        setValue(inputting.current ? value + num : num);
        inputting.current = true;
    };

    const onClear = () => {
        clear();
        setValue('');
    };


    const total = () => {
        pushValue(parseFloat(value));
        setValue(calculate().toString());
    };

    return (
        <div style={{display: "flex", width: 310, flexDirection: 'column', padding: 50}}>
            <div style={styles.value}>{value || '0'}</div>
            <div style={{display: 'flex'}}>
                <div style={{flex: 1}}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0].map(n => typeof n === 'number' ?
                        <button key={n} style={styles.numberBtn} onClick={onNumberClick(n.toString())}>{n}</button> :
                        <button key={'clear'} style={styles.numberBtn} onClick={onClear}>AC</button>)}
                    <button key={'.'} style={styles.numberBtn} onClick={onNumberClick('.')}>.</button>
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
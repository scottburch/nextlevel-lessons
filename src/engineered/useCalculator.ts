import {calculate, clear, MathOp, newCalculator, pushOp, pushValue} from "./calculator.js";
import {useRef} from "react";

export const useCalculator = () => {
    const calc = useRef(newCalculator());

    return {
        pushOp: (op: MathOp) => pushOp(calc.current, op),
        pushValue: (value: number) => pushValue(calc.current, value),
        calculate: () => calculate(calc.current),
        clear: () => clear(calc.current)
    }
}
import React, {useState, useRef} from 'react'

export const CalculatorNormal: React.FC = () => {
    type MathOp = keyof typeof mathOps;

    const [value, setValue] = useState(0);
    const inputting = useRef(false);
    const stack = useRef<(number | MathOp)[]>([]);

    const mathOps: Record<string, (a: number, b: number) => number> = {
        '+': (a: number, b: number) => a + b,
        '-': (a: number, b: number) => a - b,
        '*': (a: number, b: number) => a * b,
        '/': (a: number, b: number) => a / b
    } as const;


    const onOpClick = (op: MathOp) => () => {
        stack.current.push(value);
        stack.current.push(op);
        inputting.current = false;
    };

    const onNumberClick = (num: number) => () => {
        setValue((inputting.current ? value * 10 : 0) + num);
        inputting.current = true;
    };

    const total = () => {
        stack.current.push(value);
        const result = stack.current.reduce((acc: number, it, idx) => {
            return typeof it === 'number' && idx !== 0 ? (
                mathOps[stack.current[idx - 1] as MathOp](acc, it)
            ) : (
                acc
            )
        }, stack.current[0] as number)
        stack.current = [];
        setValue(result);
    }

    const clear = () => {
        stack.current = [];
        setValue(0);
    }

    return (
        <div style={{display: "flex", width: 310, flexDirection: 'column', padding: 50}}>
            <div style={styles.value}>{value}</div>
            <div style={{display: 'flex'}}>
                <div style={{flex: 1}}>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0].map(n => typeof n === 'number' ?
                            <button key={n} style={styles.numberBtn} onClick={onNumberClick(n)}>{n}</button> :
                            <button  key={'clear'} style={styles.numberBtn} onClick={() => clear()}>AC</button>)}
                </div>
                <div style={{width: 60}}>
                    {Object.keys(mathOps).map(op =>
                        <button key={op} style={styles.opBtn} onClick={onOpClick(op)}>{op}</button>
                    )}
                    <button style={{...styles.opBtn, ...styles.equalBtn}} onClick={() => total()}>=</button>
                </div>
            </div>
        </div>
    );
};

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
import React, {useState, useRef} from 'react'

export const CalculatorMono: React.FC = () => {
    type MathOp = keyof typeof mathOps;

    const [value, setValue] = useState('');
    const inputting = useRef(false);
    const queue = useRef<(number | MathOp)[]>([]);

    const mathOps: Record<'+' | '-' | '*' | '/', (a: number, b: number) => number> = {
        '+': (a: number, b: number) => a + b,
        '-': (a: number, b: number) => a - b,
        '*': (a: number, b: number) => a * b,
        '/': (a: number, b: number) => a / b
    } as const;


    const onOpClick = (op: MathOp) => () => {
        queue.current.push(parseFloat(value));
        queue.current.push(op);
        inputting.current = false;
    };

    const onNumberClick = (num: string) => () => {
        setValue(inputting.current ? value + num : num);
        inputting.current = true;
    };

    const clear = () => {
        queue.current = [];
        setValue('');
    }

    const total = () => {
        queue.current.push(parseFloat(value));
        const result = queue.current.reduce((acc: number, it, idx) => {
            return typeof it === 'number' && idx !== 0 ? (
                mathOps[queue.current[idx - 1] as MathOp](acc, it)
            ) : (
                acc
            )
        }, queue.current[0] as number)
        queue.current = [];
        setValue(result.toString());
    }


    return (
        <div style={{display: "flex", width: 310, flexDirection: 'column', padding: 50}}>
            <div style={styles.value}>{value || '0'}</div>
            <div style={{display: 'flex'}}>
                <div style={{flex: 1}}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0].map(n => typeof n === 'number' ?
                        <button key={n} style={styles.numberBtn} onClick={onNumberClick(n.toString())}>{n}</button> :
                        <button key={'clear'} style={styles.numberBtn} onClick={() => clear()}>AC</button>)}
                    <button key={'.'} style={styles.numberBtn} onClick={onNumberClick('.')}>.</button>
                </div>
                <div style={{width: 60}}>
                    {(Object.keys(mathOps) as MathOp[]).map(op =>
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
export type MathOp = keyof typeof mathOps;

export type Calculator = {
    stack: (number | MathOp)[]
    value: number
};


export const newCalculator = () => ({
    stack: [],
    value: 0
} satisfies Calculator as Calculator);


export const pushOp = (calc: Calculator, op: MathOp) => calc.stack.push(op);
export const pushValue = (calc: Calculator, value: number) => calc.stack.push(value);

export const calculate = (calc: Calculator) => {
    const result = calc.stack.reduce((acc: number, it, idx) => {
        return typeof it === 'number' && idx !== 0 ? (
            mathOps[calc.stack[idx - 1] as MathOp](acc, it)
        ) : (
            acc
        )
    }, calc.stack[0] as number)
    calc.stack = [];
    return calc.value = result;
};

export const clear = (calc: Calculator) => {
    calc.stack = [];
    calc.value = 0;
}

export const getValue = (calc: Calculator) => calc.value;

export const mathOps: Record<'+' | '-' | '*' | '/', (a: number, b: number) => number> = {
    '+': (a: number, b: number) => a + b,
    '-': (a: number, b: number) => a - b,
    '*': (a: number, b: number) => a * b,
    '/': (a: number, b: number) => a / b
} as const;

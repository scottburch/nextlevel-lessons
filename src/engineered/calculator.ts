export type MathOp = keyof typeof mathOps;

export type Calculator = {
    queue: (number | MathOp)[]
    value: number
};


export const newCalculator = () => ({
    queue: [],
    value: 0
} satisfies Calculator as Calculator);


export const pushOp = (calc: Calculator, op: MathOp) => calc.queue.push(op);
export const pushValue = (calc: Calculator, value: number) => calc.queue.push(value);

export const calculate = (calc: Calculator) => {
    const result = calc.queue.reduce((acc: number, it, idx) => {
        return typeof it === 'number' && idx !== 0 ? (
            mathOps[calc.queue[idx - 1] as MathOp](acc, it)
        ) : (
            acc
        )
    }, calc.queue[0] as number)
    calc.queue = [];
    return calc.value = result;
};

export const clear = (calc: Calculator) => {
    calc.queue = [];
    calc.value = 0;
}

export const getValue = (calc: Calculator) => calc.value;

export const mathOps: Record<'+' | '-' | '*' | '/', (a: number, b: number) => number> = {
    '+': (a: number, b: number) => a + b,
    '-': (a: number, b: number) => a - b,
    '*': (a: number, b: number) => a * b,
    '/': (a: number, b: number) => a / b
} as const;

import {expect} from 'chai';
import {pushOp, Calculator, newCalculator, pushValue, calculate, getValue, clear} from "./calculator.js";

describe('calculator', () => {

    describe('constructor', () => {
        it('should return a new calculator', () => {
            expect(newCalculator()).to.deep.equal({
                stack: [],
                value: 0
            } satisfies Calculator);
        });
    });

    describe('pushOp()', () => {
        it('should push an op to a calculator stack', () => {
            const calc = newCalculator();
            pushOp(calc, '+');
            expect(calc.stack).to.deep.equal(['+'])
        });
    });

    describe('pushValue()', () => {
        it('should push a value to a calculator stack', () => {
            const calc = newCalculator();
            pushValue(calc, 10);
            expect(calc.stack).to.deep.equal([10]);
        });
    });

    describe('calculate()', () => {
        it("should add two numbers", () => {
            const calc = newCalculator();
            pushValue(calc, 10);
            pushOp(calc, '+');
            pushValue(calc, 20);
            expect(calculate(calc)).to.equal(30);
            expect(getValue(calc)).to.equal(30);
        });

        it.skip('should handle a situation where someone inputs an operation first', () => {
            const calc = newCalculator();
            pushOp(calc, '+');
            pushValue(calc, 10);
            expect(calculate(calc)).to.equal(10);
        })
    });

    describe('clear()', () => {
        it('should clear the stack', () => {
            const calc = newCalculator();
            pushValue(calc, 10);
            pushOp(calc, '+');
            clear(calc);
            expect(calc.value).to.equal(0);
            expect(calc.stack).to.have.length(0);
        });
    });

});
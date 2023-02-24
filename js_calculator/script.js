(function () {
    "use strict";

    const get = (target) => {
        return document.querySelector(target);
    };

    const getAll = (target) => {
        return document.querySelectorAll(target);
    };

    class Calcurator {
        constructor(display) {
            this.display = display;
            this.value = 0;
            this.result = false;
            this.operation = null;
            this.cal = [];
        }

        appendNumber = (number) => {
            if (this.operation !== null) {
                this.cal.push(this.operation);
                this.operation = null;
            }

            if (this.result) {
                this.value = 0;
                this.result = false;
            }

            // 첫번째 입력인지 아닌지 판단
            if (this.value == 0 && number !== ".") {
                this.value = number;
                return;
            }

            // 소수점을 반복해서 입력하지 못하도록
            if (this.value[this.value.length - 1] === "." && number === ".") return;

            this.value = this.value + number;
        };

        setOperation = (operation) => {
            if (this.value !== 0) {
                if (this.value[this.value.length - 1] === ".") this.value.slice(0, this.value.length - 1);
                this.cal.push(this.value);
                this.display.value = 0;
                this.value = 0;
            }

            this.operation = operation === "÷" ? "/" : operation;
        };

        compute = () => {
            // 마지막 입력이 연산자인지 확인
            if (isNaN(Number(this.cal[this.cal.length - 1]))) {
                this.cal.push(this.value);
            }

            this.display.value = eval(this.cal.join(""));
            this.value = this.display.value;
            this.result = true;
            this.cal = [];
        };

        updateDisplay = () => {
            this.display.value = this.value;
        };

        clear = () => {
            this.value = 0;
            this.display.value = 0;
        };

        allClear = () => {
            this.display.value = 0;
            this.value = 0;
            this.operation = null;
            this.cal = [];
        };
    }

    const $numbers = getAll(".cell_button.number");
    const $operations = getAll(".cell_button.operation");
    const $clearBtn = get(".cell_button.clear");
    const $allClearBtn = get(".cell_button.all_clear");
    const $computeBtn = get(".cell_button.compute");

    const $display = get(".display");

    const calculator = new Calcurator($display);

    $numbers.forEach(
        (item) =>
            (item.onclick = () => {
                calculator.appendNumber(item.textContent);
                calculator.updateDisplay();
            })
    );

    $operations.forEach(
        (item) =>
            (item.onclick = () => {
                calculator.setOperation(item.textContent);
                calculator.updateDisplay();
            })
    );

    $clearBtn.onclick = () => calculator.clear();
    $allClearBtn.onclick = () => calculator.allClear();
    $computeBtn.onclick = () => calculator.compute();

    // 키프레스 이벤트 추가
    window.addEventListener("keydown", (e) => {
        const key = e.key;

        const operations = ["+", "-", "*", "/"];

        if (key === "." || !isNaN(Number(key))) {
            calculator.appendNumber(key);
            calculator.updateDisplay();
            return;
        }

        if (key === "Backspace") {
            calculator.clear();
            return;
        }

        if (operations.includes(key)) {
            calculator.setOperation(key);
            calculator.updateDisplay();
            return;
        }

        if (key === "=") calculator.compute();
    });
})();

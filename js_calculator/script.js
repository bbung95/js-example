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
            this.totalValue = 0;
            this.operation = null;
            this.cal = [];
        }

        appendNumber = (number) => {
            if (this.operation !== null) {
                this.cal.push(this.operation);
                this.operation = null;
            }

            if (this.value == 0) {
                this.value = number;
                return;
            }

            this.value = this.value + number;
            console.log(this.cal);
        };

        setOperation = (operation) => {
            if (this.value !== 0) {
                this.cal.push(this.value);
                this.display.value = 0;
                this.value = 0;
            }

            this.operation = operation === "÷" ? "/" : operation;
        };

        compute = () => {
            if (isNaN(Number(this.cal[this.cal.length - 1]))) {
                this.cal.push(this.value);
            }

            this.display.value = eval(this.cal.join(""));
            this.value = 0;
            this.cal = [this.display.value];
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
            this.totalValue = 0;
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
})();

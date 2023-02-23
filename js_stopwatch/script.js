(function () {
    "use strict";

    const get = (target) => {
        return document.querySelector(target);
    };

    class StopWatch {
        constructor(element) {
            this.timer = element;
            this.startTime = 0;
            this.stopTime = 0;
            this.timerID = "";
            this.time = "00:00:00";
        }

        print = (text) => {
            this.timer.innerHTML = text;
        };

        addZero = (time) => {
            if (time > 99) {
                time = String(time).slice(0, -1);
            }

            if (time < 10) {
                time = "0" + time;
            }

            return time;
        };

        setStartTime = () => {
            if (this.startTime === 0) {
                this.startTime = new Date();
            } else if (this.stopTime !== 0) {
                this.startTime = new Date(this.startTime.getTime() + new Date().getTime() - this.stopTime);
                this.stopTime = 0;
            }
        };

        startTimer = () => {
            const time = new Date(new Date().getTime() - this.startTime);
            const minute = this.addZero(time.getMinutes());
            const seconds = this.addZero(time.getSeconds());
            const milliseconds = this.addZero(time.getMilliseconds());

            this.time = `${minute}:${seconds}:${milliseconds}`;
            this.print(this.time);
        };

        start = () => {
            if (this.timerID !== "") return;
            this.setStartTime();
            this.timerID = setInterval(this.startTimer, 20);
        };

        // interval 종료, 멈춘 시간 기록
        stop = () => {
            clearInterval(this.timerID);
            this.stopTime = new Date();
            this.timerID = "";
        };

        // 생성자 값 초기화
        reset = () => {
            clearInterval(this.timerID);
            this.startTime = 0;
            this.stopTime = 0;
            this.timerID = "";
            this.time = "00:00:00";
            this.print(this.time);
        };
    }

    const $timer = get(".timer");
    const $startBtn = get(".timer_button.start");
    const $stopBtn = get(".timer_button.stop");
    const $resetBtn = get(".timer_button.reset");
    const time = new StopWatch($timer);

    $startBtn.onclick = () => time.start();
    $stopBtn.onclick = () => time.stop();
    $resetBtn.onclick = () => time.reset();
})();

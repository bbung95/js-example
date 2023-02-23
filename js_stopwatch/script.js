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
            this.timerID;
            this.time = "00:00:00";
            this.check = false;
        }

        addZero = (time) => {
            if (time > 99) {
                time = String(time).slice(0, -1);
            }

            if (time < 10) {
                time = "0" + time;
            }

            return time;
        };

        start = () => {
            if (this.check) return;

            let date = new Date();
            if (this.startTime === 0) {
                this.startTime = date;
            } else if (this.stopTime !== 0) {
                this.startTime = new Date(this.startTime.getTime() + new Date().getTime() - this.stopTime);
            }

            this.timerID = setInterval(() => {
                const time = new Date(new Date().getTime() - this.startTime);
                const minute = this.addZero(time.getMinutes());
                const seconds = this.addZero(time.getSeconds());
                const milliseconds = this.addZero(time.getMilliseconds());

                this.time = `${minute}:${seconds}:${milliseconds}`;
                this.timer.innerHTML = this.time;
            }, 20);

            this.stopTime = 0;
            this.check = true;
        };

        // interval 종료, 멈춘 시간 기록
        stop = () => {
            this.stopTime = new Date();
            clearInterval(this.timerID);
            this.check = false;
        };

        // 생성자 값 초기화
        reset = () => {
            this.startTime = 0;
            this.stopTime = 0;
            clearInterval(this.timerID);
            this.timerID = 0;
            this.time = "00:00:00";
            this.timer.innerHTML = this.time;
            this.check = false;
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

/*
dom : innerHTML이 갱신될 노드
target : 목표 숫자
second : 몇 초가 걸릴 지
term : 몇 초마다 함수 실행할 지
*/

export const countUp = (dom, target, second, term = 15) => {
    if (!dom || isNaN(Number(target)) || isNaN(Number(second)) || isNaN(Number(term))) return;

    let nowNumber = 0;

    // 주기마다 증가하는 값 = 최대값 / (총 걸리는 시간 / 함수실행 주기);
    const countTerm = Math.floor(target / (second / term));

    const timerID = setInterval(() => {
        nowNumber += countTerm;

        if (nowNumber > target) {
            nowNumber = target;
            clearInterval(timerID);
        }
        dom.innerHTML = nowNumber.toLocaleString();
    }, term);
};

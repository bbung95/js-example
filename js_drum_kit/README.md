# Drumkit

## 동작원리

-   Element의 각각 key에 해당하는 식별값을 넣어줍니다.
-   Element의 audio 태그를 넣어줍니다.
-   onClick, keyDown event가 발생했을 경우 해당 element의 audio를 play합니다.

## <audio\>

### play()

-   audio tag에 src로 들어있는 음성 파일을 실행시킵니다.

```js
document.querySelector("audio").play();
```

### currentTime

-   audio tag에 play 시간을 설정해줍니다.

```js
document.querySelector("audio").currentTime = 0;
```

## DOM Element

-   DOM Element를 Selector를 통해 불러와 배열에 저장할 수 있습니다.
-   배열에 저장한 Element를 통해 DOM 조작이 가능합니다.

### Array.from()

-   Selector로 불러온 배열은 유사 배열입니다.
-   Array.from()로 사용이 가능한 배열로 변경할 수 있습니다.

```js
const audioDOMList = document.querySelectorAll("audio");

const audioList = Array.form(audioDOMList);

audioList[0].play();
```

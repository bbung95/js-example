# Progress Bar

## 동작원리

-   document의 height와 현재 scrollTop의 위치를 구합니다
-   scroll event가 발생할떄마다 height와 scrolTop의 값을 비교하여 percent를 구합니다
-   percent를 prgress 요소에 height 또는 width로 초기화합니다

## Scroll 관련

### scrollTop

-   현재 스크롤의 위치를 알 수 있습니다.

```js
const currentScroll = document.documentElement.scrollTop;
```

### clientHeight

-   현재 보여지는 document의 높이를 알 수 있습니다.

```js
const viewHeigth = document.documentElement.clientHeight;
```

### scrollHeight

-   document의 총 높이를 알 수 있습니다.

```js
const documentHeigth = document.documentElement.scrollHeight;
```

### result

```js
const scrollPercent = (currentScroll / (documentHeigth - viewHeigth)) * 100;
```

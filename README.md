# 동기

- 개발자가 되기로 마음먹은 순간부터 slack이나 gitHub의 프로필에 사용할 이미지가 필요했습니다. 자신의 개성이 담겨 있으면서도 사생활을 보호받을 수 있는 그런 이미지를 희망했습니다. 팀 프로젝트 주제를 고르던 중 때마침 인터넷에 무료로 제공하는 image library가 있는 것을 발견했습니다.

- 우리 Team Project인 Hello, Sketch!는 인터넷의 무료 이미지를 조합해서 사용자가 원하는 근사한 이미지를 생성해 주는 웹 애플리케이션을 만들어 보는 게 어떨까? 하는 생각에서 시작했습니다. 사용자가 간단한 조작으로 이미지를 만들어 저장하고, 이미지를 내려 받는 것을 우리 팀 프로젝트 목표로 삼았습니다.

- 우리 팀의 첫 프로젝트인 만큼 `Hello, World!`에서 Hello를 가져오고 사용자가 자신만의 이미지를 생성하는 행위를 Sketch에 비유하여서 팀 프로젝트 프로덕트 네임을 Hello, Sketch!라고 이름지었습니다.

# 주요 기능 소개

- 프로필 이미지 선택 및 색상 변경

![selectProfileImage](https://github.com/team-desire/hello-sketch-client/assets/124029691/690370ed-bf75-4525-93ec-a543d63d21d8)

- 프로필 이미지 이동 및 다운로드

![imageMoveandDownload](https://github.com/team-desire/hello-sketch-client/assets/124029691/64ad7770-f3a1-44cf-9cc7-7b5e1394f9bc)

# 프로젝트 관심사

## 어떻게 하면 이미지를 그릴 수 있을까?

### png vs svg

- png (Portable Network Graphics)는 래스터 파일 유형으로 분류됩니다. 래스터 파일은 픽셀로 구성된 이미지를 뜻하며, 따라서 png는 작은 컬러 사각형인 픽셀이 무수히 많이 모여 사진처럼 세부 정보가 많은 이미지가 만들어진 파일입니다. 보통 래스터 이미지는 사이즈가 하나로 고정되어 있어서 크기를 변형하면 구성 요소인 픽셀이 변형되고 전체 이미지 역시 해상도에 따라 달라집니다. (이와 달리 밑에서 설명할 벡터 이미지는 래스터 이미지와 달리 화면이 달라져도 이미지가 변형되지 않습니다.) 래스터 파일의 유형은 대표적으로 png, JPEG, GIF 등이 있습니다. png 파일은 무손실 압축, 고해상도가 특징이며 그에 따라서 크기가 매우 큽니다.

- svg (Scalable Vector Graphics)는 png와 달리 수학 알고리즘을 기반으로 이미지를 표시하는 벡터 파일 유형입니다. 벡터 파일에는 컴퓨터가 도형, 테두리, 점, 선 등을 이용하여 이미지를 만들어 냅니다. 벡터 이미지는 픽셀을 사용하지 않기 때문에, 크기에 상관없이 이미지가 언제나 동일한 모습을 유지합니다. png에 비해 크기도 작아서 웹에서 빠르게 로딩될 수 있습니다. 또한 XML로 작성되서 텍스트 편집기로 편집할 수 있고 자바스크립트를 이용하여 svg 색상을 변경할 수 있습니다.

- svg는 IE 8 이하에서는 지원되지 않습니다. 반면 png는 표준 온라인 포맷으로 웹 브라우저와 운영 체제에서 폭넓게 지원하는 파일 로맷이어서 svg보다 더 익숙한 포맷 형태이기도 합니다. 프로젝트가 사용자의 액션에 의해 이미지의 색상, 위치, 사이즈 등을 변경하는 것이 핵심 기능이었습니다. 어떤 파일 포맷으로 렌더링 시킬지에 대한 고민을 하였고 그 결과, 프로그래밍 언어로 파일의 속성을 변경할 수 있는 svg를 이미지 파일 포맷으로 결정하게 되었습니다.

### React에서 svg 파일을 안전하고 효율적으로 렌더링하는 방법에 대한 고민

- 이제 svg 파일을 어떻게 React에서 렌더링할 수 있을지에 대해 고민하기 시작했습니다. React에서 직접 svg 태그를 렌더링하는 것도 가능하지만, 이 경우에는 svg의 동적 조작이 제한적일 수 있으며, XSS와 같은 보안 문제에 더 취약할 수 있습니다. svg 파일과 같은 이미지 파일을 사용할 때, 특히 인라인 svg의 경우, 이 파일 내에 자바스크립트 코드가 포함될 수 있어 XSS 공격의 위험이 존재합니다. React에서 svg를 직접 렌더링할 경우, 이러한 보안 문제가 더욱 심각해질 수 있습니다. 왜냐하면 React는 기본적으로 HTML 태그 내에서 자바스크립트를 실행하지 않도록 설계되어 있지만, svg는 이러한 보안 메커니즘을 우회할 수 있는 요소를 포함할 수 있기 때문입니다.
  따라서, 안전한 svg 처리를 위해서는 svg 파일을 문자열로 변환하고, 이를 React의 JSX 내에서 렌더링하게 되었습니다.

- svg 파일을 프로젝트 내에서 문자열로 관리하기 위해서 우선, 사용자가 선택할 svg 파일을 S3에 저장하고 이미지가 저장된 S3 주소를 DB에 저장하였습니다. 클라이언트가 해당 주소로 S3에 직접 요청을 보내 문자열화된 svg파일을 얻는 `getSvgDataArray` 함수를 만들었습니다. 클라이언트가 S3 리소스에 직접 접근하도록 함으로써, 클라이언트 성능을 향상시키고 서버 부하를 줄일 수 있었습니다. `getSvgDataArray`의 반환한 각 unit들을 Carousel에 props로 전달하여 사용자가 이미지를 선택할 수 있도록 하였습니다.

- 사용자에 의해 svg 파일을 조회 및 수정해야만 했습니다. 이를 위해 svg 파일을 Amazon S3에 저장하고, 이 파일들의 URI를 데이터베이스에 보관하는 아키텍처를 구현하고 사용자 인터페이스에서 동적으로 이미지 콘텐츠를 제공할 수 있도록 코드를 구현하였습니다. 클라이언트가 데이터베이스에서 URI를 검색하고 S3 리소스에 직접 접근하도록 함으로써, 클라이언트 성능을 향상시키고 서버 부하를 줄일 수 있었습니다.

### Canvas API 도입한 이유

- POC 기간에 svg 방식과 canvas 방식의 장단점을 비교하면서 자연스레 두 방식이 함께 사용할 수 없는 것이라고 생각했습니다.`div` 방식으로 SVG를 래핑하는 방식으로 조작하고 이동시키는 것이 성공 하였지만, 이후 이미지를 다운받는 기능을 개발하고자 할 때 이 방식으로는 라이브러리 없이 이미지를 다운로드 받을 수 없다는 것을 알게 되었습니다. 핵심 기능인 이미지 다운로드를 구현하기 위해, 프로젝트 막바지 무렵에 기능 개발을 멈추고 다시 팀원 간 POC 기간을 가지기로 하였습니다. 결론적으로 SVG를 감싸는 Wrapper역할을 div 대신 canvas 태그를 이용하기로 하였습니다. Canvas API를 이용하면 내장 메서드를 이용하여 찾고자 하는 요소의 좌표 및 이동이 더 용이해졌고 다운로드 기능이 가능하게 되었습니다.

- svg를 직접 렌더링 하는 대신 Image 객체를 이용하여 canvas에 그리는 방식을 프로젝트에 적용했습니다. 이와 같은 방식은 보안 문제, 동적 조작이 용이성, 크로스 플랫폼 호환성 등의 이유에서 svg를 직접 렌더링하는 방식보다 좋은 점이 있습니다.

- svg 파일을 직접 렌더링할 경우, 내장된 JavaScript 객체가 실행되어 XSS(크로스 사이트 스크립팅) 공격에 취약할 수 있습니다. 반면에 Image 객체를 통해 svg data를 로드하면 내장된 스크립트가 실행되지 않기 때문에 보안 문제에 대응할 수 있습니다.

- canvas에서 Image 객체를 그려내는 방식은 Canvas API의 내장 메서드를 이용하여 이미지의 크기, 위치를 변경하는게 훨씬 수월합니다.

- 모든 웹 브라우저가 svg를 동일하게 렌더링하지 않을 수 있습니다. svg data를 canvas를 이용하면 이와 같은 크로스 플랫폼 호환성 문제에 대응할 수 있습니다. 브라우저가 자체적으로 이미지를 처리하고 canvas에는 최종 결과물만 렌더링되기 때문에 브라우저 간의 일관성 문제를 줄일 수 있습니다.

### 문자열화된 svg 파일이 어떻게 렌더링되는지?

- Canvas API는 HTML5의 일부로, 웹 브라우저에서 2D 그래픽을 그리는 데 사용됩니다. 이 API는 **`<canvas>`** 요소를 통해 제공되며, **`<canvas>`** 요소는 웹 페이지에 그래픽을 그릴 수 있는 영역을 제공합니다. **`<canvas>`** 비트맵 canvas로, 픽셀 단위로 그림을 그립니다.

- **`CanvasUnit`** 컴포넌트에서는 React 내에서 canvas를 사용하여 업데이트된 svg 데이터를 렌더링하는 과정을 수행합니다. 먼저, **`updateSvgData`** 함수를 호출하여 주어진 svg 데이터(**`svgData`**)와 채우기 색상(**`fillColor`**)을 기반으로 새로운 svg 데이터를 생성합니다. 이 업데이트된 svg 데이터는 **`encodeURIComponent`**를 통해 URI 안전 문자열로 인코딩되고, 이를 Data URL 형식으로 변환합니다. ChildCanvas에서 updatedSvgData로 svgData를 동적으로 수정하고 인코딩 후 Image 객체로 변환하여 Data URL을 이미지 소스(**`src`**)로 설정합니다. 이 이미지를 렌더링할 때 Canvas API를 이용하였습니다. Canvas API(**`getContext("2d")`**, **`drawImage`**)를 사용하여 이미지를 canvas에 렌더링하였습니다.

<p align="center">
  <img src="./src/assets/canvasrenderingExample.png", height="200px", width="400px">
</p>

- 이미지가 로드되면, **`canvas.getContext("2d")`**를 사용하여 canvas의 2D 렌더링 컨텍스트에 접근하고, **`drawImage`** 메서드를 통해 이미지를 canvas에 그립니다.

### 사용자 입력에 따라 동적으로 svg 조작하기

<p align="center">
  <img src="./src/assets/updateSVGDataExaple.png", height="200px", width="400px">
</p>

- **`updateSvgData`** 함수는 svg 데이터 문자열과 채우기 색상을 인자로 받아, svg 내의 특정 요소들의 채우기 색상을 변경하는 기능을 수행합니다. 함수는 먼저 **`DOMParser`** 객체를 생성하여 svg 데이터 문자열을 DOM 형태로 파싱합니다. 이 파싱 과정은 문자열 형태의 svg 데이터를 DOM(Document Object Model)으로 변환하여, JavaScript가 이를 조작할 수 있게 합니다.

- 함수는 DOM 내에서 클래스 이름이 **`.target`**인 모든 요소를 **`querySelectorAll`** 메서드를 통해 찾습니다. 이 메서드는 해당 조건에 부합하는 모든 요소를 NodeList 형태로 반환합니다. 찾아진 각 요소에 대해, **`forEach`** 반복문을 사용하여 해당 요소의 **`fill`** 속성을 입력받은 채우기 색상(**`fillColor`**)으로 설정합니다. 이러한 과정을 통해 해당 클래스를 가진 모든 svg 요소들의 색상이 변경됩니다.

- 마지막으로, **`XMLSerializer`** 객체를 사용하여 수정된 DOM을 다시 svg 데이터 문자열로 직렬화하고, 이 문자열을 반환합니다. 이렇게 반환된 문자열은 원본 svg 데이터에 적용된 색상 변경 사항을 포함하고 있어, 클라이언트 측에서 동적으로 svg 콘텐츠의 스타일을 변경하는 데 사용될 수 있습니다.

## 어떻게 해야 사용자가 만든 스케치를 이미지 파일로 저장할 수 있을까?

### 기존 접근 방식

처음에는 세 개의 하위 canvas(`ChildCanvas`)를 포함하는 상위 canvas(`ParentCanvas`) 컴포넌트에 아래와 같은 작업을 해보았습니다.

- `ParentCanvas` 내부에 “다운로드” 버튼을 추가한다.
- “다운로드” 버튼이 눌리면, `ParentCanvas` 의 canvas 요소들을 PNG 이미지로 변환해서 내려받도록 해준다.

### 문제점

“다운로드” 버튼을 눌렀을 때, 하위 canvas의 요소들은 포함되지 않은 흰 화면만 다운로드 되는 현상이 발생했습니다.

### 원인

하위 canvas의 요소들이 상위 canvas에 그려지기 이전에 이미지로 변환하고, 다운로드를 했기 때문에 발생한 문제였습니다.
`ParentCanvas` 가 `ChildCanvas` 의 요소들을 담기 위해서 가지고 있던 틀에 해당되는 흰색 사각형만 그려진 채로 이미지가 만들어진 것입니다.

### 해결 방법

“다운로드” 버튼이 눌리면, 새로운 canvas를 만들고, 그 위에 `ChildCanvas` 의 요소들을 그린 뒤에 다운로드 하는 방식으로 수정하였습니다.

```jsx
// 세 개의 canvas 요소들을 새로운 canvas 위에 그리고, 이미지 데이터로 변환하는 함수
const mergeCanvas = () => {
  const headCanvas = canvasRefs.headCanvas.current;
  const faceCanvas = canvasRefs.faceCanvas.current;
  const bodyCanvas = canvasRefs.bodyCanvas.current;
  const mergedCanvas = document.createElement("canvas");
  mergedCanvas.width = 700;
  mergedCanvas.height = 700;
  const mergedContext = mergedCanvas.getContext("2d");
  mergedContext.fillStyle = "white";
  mergedContext.fillRect(0, 0, mergedCanvas.width, mergedCanvas.height);
  mergedContext.drawImage(bodyCanvas, bodyUnit.x, bodyUnit.y);
  mergedContext.drawImage(headCanvas, headUnit.x, headUnit.y);
  mergedContext.drawImage(faceCanvas, faceUnit.x, faceUnit.y);
  const mergedDataURL = mergedCanvas.toDataURL("image/png");
  return mergedDataURL;
};
// 이미지 다운로드 관련 함수들
const handleImageDownload = () => {
  const mergedDataURL = mergeCanvas();
  downloadImage(mergedDataURL);
};
const downloadImage = (dataURL) => {
  const link = document.createElement("a");
  link.download = "merged_image.png";
  link.href = dataURL;
  link.click();
};
```

## 어떻게 컴포넌트를 일관된 기준으로 테스트할 수 있을까?

- 테스트를 작성한다는 것은 앱이 제대로 작동하는지 테스트하는 것입니다. 이번 팀 프로젝트에서 unit test 위주로 테스트하기로 논의를 하였습니다. unit test에서 테스트해야할 것은 **각각의 컴포넌트들의 기능 및 렌더링이 예상대로 이루어지고 있는지 확인하는 것입니다.**

- 이번 프로젝트에서 테스트코드를 처음으로 작성해보게되었습니다. 테스트코드 강의도 듣고 여기저기서 수집한 레퍼런스를 토대로 이거저것 테스트코드를 테스트해보면서 느꼈던 점은 **다음 프로젝트에서도 사용할 수 있도록 어떤 기준으로 테스트할지에 대한 자신만의 체크리스트가 필요하다는 것이었습니다.** 따라서 체크리스트를 만들었고 테스트코드를 작성할 때 일관되게 적용해보려고 노력했습니다.

### 어떻게 테스트할 것인가?

- 다음은 테스트코드 체크리스트 세부사항입니다.
  1. test rendering
     1. 컴포넌트가 기본 Props와 함께 정상적으로 렌더링되는지 확인합니다. 일반적인 조건 하에서 컴포넌트의 동작을 파악해야 하며 또한 테스트의 대상의 예외적인 상황 즉 edge case도 테스트하는 것이 좋습니다.
     2. 실제 DOM 요소와 속성을 테스트
        - 특정 텍스트가 페이지에 존재?
        - 버튼이 클릭 가능한가?
        - 이미지가 올바른 src로 렌더링 되었는가?
     3. 렌더링 시 error가 없어야 합니다. (no JSX syntax error)
     4. 모든 변수들이 선언되어 있어야 합니다.
  2. test the output
     1. 각 JSX 엘리먼트들이 적절한 Props 값을 가지고 정확하게 렌더링되는지 확인합니다.
  3. test the events
     1. 이벤트(버튼클릭, 입력 변경 등)가 예상대로 함수를 호출하고, 필요한 경우 적절한 인수와 함께 호출하는지 확인합니다.
  4. test data fetching
     1. Fetch 성공
        1. Loading state
           1. 데이터 로드하는 동안 loading 표시가 올바르게 나타나는지 확인합니다.
        2. 비동기 작업 후 UI 변화가 예상된다면, 올바르게 데이터가 로드되었을 때 UI 가 정확하게 업데이트되는지 확인합니다.
     2. Fetch 실패
        1. 에러 상황을 시뮬레이션하여, 에러 발생 시 UI가 적절한 에러 상태를 표시하는지 확인합니다.

### 실제 테스트 코드에서 중요하게 확인했던 것

사용자 이벤트를 통해서 UI 변화를 테스트

- `fireEvent.change` 는 사용자의 액션 (input filed의 색 변경)을 시뮬레이트합니다. 이 액션 자체가 React 컴포넌트의 상태나 props를 직접 변경하지 않습니다. 따라서 사용자 액션을 시뮬레이트하고 UI 업데이트 방식을 테스트하기 위해서는 추가적인 작업이 필요합니다. 그 방식은 아래처럼 두 가지 방식을 고민해볼 수 있었습니다.

<aside>
💡 1.  사용자 액션 발생 시 해당 컴포넌트의 **이벤트 핸들러가 단순히 호출되는지 테스트**하는 방식

2. 해당 컴포넌트의 **이벤트 핸들러 호출하여 `rerender` 로 props를 변경을 확인**하는 방식

</aside>

- 첫 번째 방식: 이벤트 핸들러 호출

<p align="center">
  <img src="./src/assets/testcodeexampleeventhandler.png", height="100px", width="400px">
</p>

- 이벤트 핸들러 호출 방식은 비교적 간단합니다. 사용자 액션에 의해서 해당 요소의 이벤트 핸들러 함수가 호출되는지를 테스트하면 되고, 위의 예시에서는 사용자 액션에 의해 이벤트 핸들러 함수가 1회 호출되는지를 테스트하였습니다.
- 두 번째 방식은 이벤트 핸들러 호출의 결과로 컴포넌트의 props가 올바르게 업데이트가 되었는지를 테스트합니다. `rerender` 를 사용하여 컴포넌트의 Props를 업데이트를 확인하고 컴포넌트가 어떻게 반응하는지 검사합니다. **`rerender`**를 사용하여 컴포넌트를 업데이트하는 것은, 컴포넌트가 새 props를 받아서 리렌더링되는 과정을 시뮬레이션합니다. 이를 통해 컴포넌트가 새 props를 올바르게 처리하는지 테스트할 수 있습니다.

 <p align="center">
  <img src="./src/assets/testcodeexamplererender.png", height="300px", width="400px">
</p>

mocking fetch를 왜 하는걸까?

- mocking Fetch는 왜 하는걸까요? 우선 Mocking은 테스트 하려는 코드가 의존하는 외부 코드가 있는 경우, 테스트하기 위해 외부코드를 가짜로 대체하는 방법입니다. **그렇다면 왜 또 fetch를 Mocking하는걸까요? 그 이유는 테스트에서 실제 네트워크 요청과 같은 side Effect을 포함하는 기능을 실행하지 않기 위해서 입니다.** 기존 테스트할 함수가 있고, 함수 내부에 DB에 저장하는 로직이 있다면, 실제로 DB 트랜잭션이 일어나지 않았지만 마치 트랜젝션이 일어난 것처럼 동작하여 테스트 환경에서 실제 구현을 대체하기 위해 사용합니다. mock 함수를 호출했을 때 반환 받기 원하는 값을 사용자가 직접 지정하고, 이 리턴값을 사용해서 테스트하고자 하는 코드를 테스트하게 됩니다.

<p align="center">
  <img src="./src/assets/testcodeexampleglobalfetch.png", height="200px", width="400px">
</p>

- **`global.fetch`**는 JavaScript에서 비동기 네트워크 요청을 수행하는 데 사용되는 함수입니다. 여기서는 vi를 사용하여 모킹(mocking)하였고 이렇게 하면 실제 API 엔드포인트에 요청을 보낼 필요 없이 **`fetch`** 호출을 시뮬레이션할 수 있습니다. **`expect.stringContaining("units?unitType=someType")`**는 **`fetch`**가 호출될 때 전달된 URL이 **`"units?unitType=someType"`** 문자열을 포함하고 있는지 확인합니다. **`<UnitSelector />`** 컴포넌트가 마운트될 때 **`global.fetch`**가 올바른 인수로 한 번 호출되는지 확인합니다

<p align="center">
  <img src="./src/assets/testcodexampleconsolespy.png", height="200px", width="400px">
</p>

테스트는 **`<UnitSelector />`** 컴포넌트가 **`fetch`** 요청 에러를 올바르게 핸들링하는지 확인하는 것입니다. 여기서 주로 **`console.error`**가 예상대로 호출되는지 검사하고 있습니다. **`vi.fn(() => Promise.reject(new Error("fetch error")));`** 코드는 **`fetch`** 호출이 실패하고 "fetch error"라는 메시지를 가진 에러를 반환하도록 합니다. **`console.error`**를 스파이로 설정하여 **`console.error`** 호출을 가로채고 기록합니다. **`expect(consoleSpy).toHaveBeenCalledWith("Error");`** 코드는 **`console.error`**가 "Error"라는 인자로 호출되었는지 확인하여 에러 핸들링이 제대로 작동하는지 검사합니다.

# 기술스택

- Front

  - JavaScript, React, Tailwind CSS

- Back

  - JavaScript, Node.js, Express.js

- Test

  - React Dom Testing Library, vitest

- Deployment
  - Netlify, AWS Elastic Beanstalk

# 프로젝트 Ground Rule

- [협업규칙](https://mirage-ceres-274.notion.site/bb8110834c074152be6d89b216fcd120)

# 팀원

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/donghyukkil">
        <img src="https://avatars.githubusercontent.com/u/124029691?v=4" alt="길동혁 프로필" width="100px" height="100px" />
      </a>
    </td>
     <td align="center">
      <a href="https://github.com/jongwoobaek">
	      <img src="https://avatars.githubusercontent.com/u/112931368?v=4" alt="백종우 프로필" width="100px" height="100px" />
    </td>
    <td align="center">
      <a href="https://github.com/mangodm-web">
	      <img src="https://avatars.githubusercontent.com/u/123475341?v=4" alt="허다미 프로필" width="100px" height="100px" />
    </td>
  </tr>
  <tr>
    <td>
    <ul>
      <li><a href="https://github.com/donghyukkil">길동혁</a></li>
		<li>asterism90@gmail.com</li>
	</ul>
    </td>
    <td>
    <ul>
      <li><a href="https://github.com/jongwoobaek">백종우</a></li>
		<li>qorwhddn1234@gmail.com</li>
	</ul>
    </td>
       <td>
    <ul>
      <li><a href="https://github.com/mangodm-web">허다미</a></li>
		<li>dmhuh.data@gmail.com</li>
	</ul>
    </td>
  </tr>
</table>

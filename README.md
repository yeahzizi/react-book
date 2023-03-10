# 리액트를 다루는 기술

### render 함수

컴포넌트가 어떻게 생겼는 지 정의하는 역할을 한다.

뷰가 어떻게 생겼고 어떻게 작동하는지 객체를 반환

컴포넌트는 데이터를 업데이트 했을 때 이전에 render 함수가 만들었던 컴포넌트 정보와 현재 render 함수가 만든 컴포넌트 정보를 비교한다

### Virtual DOM

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/512d2c38-79a4-4e2c-ba60-1f206811a545/Untitled.png)

실제 DOM에 접근하여 조작하는 대신, 이를 추상화한 자바스크립트 객체를 구성하여 사용

\*기타 특징

리액트는 뷰만 담당하므로 다른 기타 기능은 직접 구현해서 사용해야 한다.

라우팅은 axios나 fetch, 상태 관리는 redux를 사용해서 빈 자리를 채운다

### JSX

- 자바스크립트 확장 문법
- ex)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7b8a9d68-3c23-44fc-bc73-807fcd125529/Untitled.png)

이게

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d7a4723f-77ef-4cd9-b244-ab1ef17e52f3/Untitled.png)

로 변환된다. 아래와 같은 코드는 바닐라 자바스크립트 코드로 불편하다.

### JSX 문법

- 컴포넌트에 여러 요소가 있다면 반드시 부모 요소 하나로 감싸야 한다.
- 16 버전 이후로는 Fragment를 사용한다.
- Fragment는 축약 가능

```jsx
import React, { Fragment } from 'react

function App() {
  return (
    <>
      <h1>리액트 안녕!</h1>
      <h2>잘 작동하니?</h2>
    </>
  );
}

export default App;
```

- 자바스크립트 표현식은 JSX 내부에서 코드를 {}로 감싼다

```jsx
import React, { Fragment } from "react";

function App() {
  const name = "리액트";
  return (
    <>
      <h1>{name} 안녕!</h1>
      <h2>잘 작동하니?</h2>
    </>
  );
}

export default App;
```

- if 문 대신 조건부 연산자 사용 가능

```jsx
import React, { Fragment } from "react";

function App() {
  const name = "리액트";
  return <>{name === "뤼액트" ? <h1>리액트입니다!</h1> : <h2>겠냐?</h2>}</>;
}

export default App;
```

- AND 연산자(&&)를 사용한 조건부 렌더링

> 특정 조건을 만족할 때 내용을 보여주고, 만족하지 않을 때 아예 아무것도 랜더링 하지 않음

```jsx
import React, { Fragment } from "react";

function App() {
  const name = "뤼액트";
  return <>{name === "리액트" ? <h1>리액트입니다!</h1> : null}</>;
}

export default App;

import React, { Fragment } from "react";

function App() {
  const name = "뤼액트";
  return <>{name === "리액트" && <h1>리액트입니다!</h1>}</>;
}

export default App;
```

- undefined만 반환하여 렌더링 하는 상황을 만들면 안된다.

> OR 연산자를 사용하면 해당 값이 undefined일 때 사용할 값을 지정할 수 있다.

```jsx
import React from 'react'

function App() {
	const name = undefined;
	return name || '값이 undefined입니다'
}

export default App

// undefined 일 때 보여주고 싶은 문구가 있다면

import React from 'react'

function App() {
	const name = undefined;
	return <div>{name || '리액트'}</div>
}

export default App

```

- 인라인 스타일링
  - 스타일 적용 시 객체 형태로 넣어줌
  - 카멜표기법으로 작성 ex) backgroundColor
  - <div style={{ }}>{name}</div>로 적으면 style 값 바로 지정 가능

## 컴포넌트

### props

- 컴포넌트 속성을 설정할 때 사용하는 요소
- 부모 컴포넌트에서 설정
- props 기본 값 설정: defaultprops

```jsx
import React from "react";

const MyComponent = (props) => {
  return <div>안녕하세요, 제 이름은 {props.name} 입니다.</div>;
};

MyComponent.defaultProps = {
  name: "기본 이름",
};

export default MyComponent;
```

- 태그 사이의 내용을 보여주는 children이 있다.

```jsx
//App.js (부모)
import React from "react";
import MyComponent from './MyComponent'

const App = () => {
  return (
    <MyComponent>리액트</MyComponent>
  );
}

export default App;

//component.js (자식)
//부모에 쓰여진 글자를 내려 받기 위해 props.children을 썼다.

import React from 'react'

const MyComponent = props => {
  return <div>안녕하세요, 제 이름은 {props.name} 입니다. <br/>
        children 값은 {props.children} 입니다.

  </div>
}

MyComponent.defaultProps = {
  name: '기본 이름'
}

export default MyComponent
```

- 비 구조화 할당 문법을 통해 props 내부 값 추출하기(구조 분해 문법)

> 함수의 파라미터가 객체라면 그 값을 바로 비구조화 해서 사용

```sql
import React from 'react'

const MyComponent = props => {
  const { name, children } = props
  return <div>안녕하세요, 제 이름은 {name} 입니다. <br/>
        children 값은 {children} 입니다.

  </div>
}

MyComponent.defaultProps = {
  name: '기본 이름'
}

export default MyComponent
```

- propsTypes를 통한 props 검증
  - 컴포넌트의 필수 props를 지정하거나 props의 타입을 지정할 때 사용

```jsx
import React from 'react'
import PropTypes from 'prop-types'

const MyComponent = props => {
  const { name, children } = props
  return <div>안녕하세요, 제 이름은 {name} 입니다. <br/>
        children 값은 {children} 입니다.

  </div>
}

MyComponent.defaultProps = {
  name: '기본 이름'
}

MyComponent.propsTypes = {
  name: PropTypes.string //무조건 문자열 형태로 전달 됨
}

export default MyComponent

import React from "react";
import MyComponent from './MyComponent'

const App = () => {
  return (
    <MyComponent name="React">리액트</MyComponent> // name과 children 값
  );
}

export default App;

//결과
안녕하세요, 제 이름은 React 입니다.
children 값은 리액트 입니다.
```

- isRequired를 사용하여 필수 propTypes 설정(은 더 많다)

```jsx

import React from 'react'
import PropTypes from 'prop-types'

const MyComponent = props => {
  const { name, children, favoriteNumber } = props
  return <div>안녕하세요, 제 이름은 {name} 입니다. <br/>
        children 값은 {children} 입니다. <br/>
        제가 좋아하는 숫자는 {favoriteNumber} 입니다.
  </div>
}

MyComponent.defaultProps = {
  name: '기본 이름'
}

MyComponent.propsTypes = {
  name: PropTypes.string, //무조건 문자열 형태로 전달 됨
  favoriteNumber: PropTypes.number.isRequired //favoriteNumber가 필수로 있어야 함
}

export default MyComponent

import React from "react";
import MyComponent from './MyComponent'

const App = () => {
  return (
    <MyComponent name="React" favoriteNumber={1}>리액트</MyComponent>
  );
}

export default App;
```

- array, arryOf, bool, func, number, object, string, symbol, node, instanceOf, oneOf, oneOfType, objectOf, shape, any

### state

: 컴포넌트 내부에서 바뀔 수 있는 값을 의미

- 배열 비구조화 할당: 배열 안에 들어 있는 값을 쉽게 추출할 수 있도록 해주는 문법

```jsx
// array 안에 있는 값을 one과 two에 담아 주는 코드
const array = [1, 2];
const [one, tow] = array;
```

- **useState** 사용하기

```jsx
import React, { useState } from "react";

const Say = () => {
  const [message, setMessage] = useState("");
  // [ 현재 상태, 상태를 바꾸어 주는 함수(세터함수) ]
  const onClickEnter = () => setMessage("안녕하세요!");
  const onClickLeave = () => setMessage("안녕히 가세요!");

  return (
    <>
      <button onClick={onClickEnter}>입장</button>
      <button onClick={onClickLeave}>퇴장</button>
      <h1>{message}</h1>
    </>
  );
};

export default Say;
```

```jsx
//한 페이지에서 여러번 사용해도 상관 없다.

import React, { useState } from "react";

const Say = () => {
  const [message, setMessage] = useState("");
  const onClickEnter = () => setMessage("안녕하세요!");
  const onClickLeave = () => setMessage("안녕히 가세요!");

  const [color, setColor] = useState("black"); //현재 상태는 black 임

  return (
    <>
      <button onClick={onClickEnter}>입장</button>
      <button onClick={onClickLeave}>퇴장</button>
      <h1 style={{ color }}>{message}</h1>
      <button style={{ color: "red" }} onClick={() => setColor("red")}>
        빨간색
      </button>
      <button style={{ color: "green" }} onClick={() => setColor("green")}>
        초록색
      </button>
      <button style={{ color: "blue" }} onClick={() => setColor("blue")}>
        파란색
      </button>
    </>
  );
};

export default Say;
```

- 주의할 점
  - state 값을 바꾸어야 할 때는 setState 혹dms useState를 통해 전달 받은 세터 함수를 사용해야함
  - 배열이나 객체를 업데이트 해야 할 때는 배열이나 객체 사본을 만들고 그 사본 값을 업데이트 한 후, 그 사본의 상태를 setState 혹은 세터 함수를 통해 업데이트
  - 사본을 만들 때는 spread 연산자인 …을 사용하여 처리

### Props와 state

- props는 부모 컴포넌트가 설정하고, state는 컴포넌트 자체적으로 지닌 값으로 컴포넌트 내부에서 값을 업데이트

## 이벤트 핸들링

### event

- 사용자가 웹 브라우저에서 DOM 요소들과 상호 작용하는 것

### 리액트의 이벤트 시스템

- 카멜 표기법으로 작성 ex) onClick
- 이벤트에 함수 형태의 값을 전달
- DOM 요소에만 이벤트 설정 가능 ( div, button, input, form, span 등의 DOM 요소에는 이벤트 설정 > 우리가 직접 만든 컴포넌트에는 이벤트를 자체적으로 설정할 수 없음 > 그냥 이름이 onClick인 props를 MyComponent에 전달

- **이벤트 종류**

ex) Clipboard, Composition, Keyboard, Focus, Form, Mouse, Selection, Touch, UI, Wheel, Media, Image, Animation, Transition

### 이벤트 핸들링 순서

- 컴포넌트 생성 및 불러오기
- onChange 이벤트 핸들링하기
- 임의 메서드 만들기
- input 여러개 다루기
- onKeyPress 이벤트 핸들링 하기

- 비동기적으로 이벤트 객체를 참조할 일이 있다면 e.persist() 함수를 호출해야 한다

```jsx
onChange={
	(e) => {
		console.log(e.target.value)
//여기서 log(e)를 하면 출력 후 값이 사라지지만
//e.target.value를 하면 값이 바뀔 때마다 기록한다.
	}
}
```

- input이 여러개 일 때 > event 객체를 활용
- 객체 안에서 key를 []로 감싸면 그 안에 넣은 레퍼런스가 가리키는 실제 값이 key 값으로 사용

```jsx
const name = 'variantKey'
const object = {
	[name]: 'value'
}

이거는
{
	'variantKey': 'value'
} 이다.
```

```jsx
import React, { useState } from "react";

const EventPractice = () => {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const onChangeUsername = (e) => setUsername(e.target.value);
  const onChangeMessage = (e) => setMessage(e.target.value);
  const onClick = () => {
    alert(username + ": " + message);
    setUsername("");
    setMessage("");
  };
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      onclick();
    }
  };
  return (
    <div>
      <h1>이벤트 연습</h1>
      <input
        type="text"
        name="username"
        placeholder="사용자명"
        value={username}
        onChange={onChangeUsername}
      />
      <input
        type="text"
        name="message"
        placeholder="아무거나 입력해 보세요"
        value={message}
        onChange={onChangeMessage}
        onKeyPress={onKeyPress}
      />
      <button onClick={onClick}>확인</button>
    </div>
  );
};

export default EventPractice;

//혹은

import React, { useState } from "react";

const EventPractice = () => {
  const [form, setForm] = useState({
    username: "",
    message: "",
  });
  const { username, message } = form;
  const onChange = (e) => {
    const nextForm = {
      ...form, // 기존의 form 내용을 이 자리에 복사한 뒤
      [e.target.name]: e.target.value,
    };
    setForm(nextForm);
  };

  const onClick = () => {
    alert(username + ": " + message);
    setForm({
      username: "",
      message: "",
    });
  };
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      onclick();
    }
  };
  return (
    <div>
      <h1>이벤트 연습</h1>
      <input
        type="text"
        name="username"
        placeholder="사용자명"
        value={username}
        onChange={onChange}
      />
      <input
        type="text"
        name="message"
        placeholder="아무거나 입력해 보세요"
        value={message}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
      <button onClick={onClick}>확인</button>
    </div>
  );
};

export default EventPractice;
```

## DOM에 이름 달기

- DOM 요소에 id를 달면 css에서 특정 id에 특정 스타일을 적용하거나, 자바 스크립트에서 해당 id를 가진 요소를 찾아서 작업하기
- DOM을 직접적으로 건드려야 할 때 ref를 사용
- 컴포넌트끼리 데이터를 교류할 때 사용하면 안됨

## 컴포넌트 반복

### map() 함수 사용

- 문법

  - arr.map(callback, [thisArg])
  - callback: 새로운 배열의 요소를 생성하는 함수로 파라미터는 아래 세 가지다.
    - currentValue: 현재 처리하고 있는 요소
    - index: 현재 처리하고 있는 요소의 index 값
    - array: 현재 처리하고 있는 원본 배열
  - thisArg(선택 항목): callback 함수 내부에서 사용할 this 레퍼런스
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/62315464-6ac7-408d-88e2-0b5a44d516e4/Untitled.png)
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e39869d4-9ac2-4db9-bcf5-a9369b22aff0/Untitled.png)
    ES6 문법

  ```jsx
  import React from "react";

  const IterationSample = () => {
    const names = ["눈사람", "얼음", "눈", "바람"];
    const nameList = names.map((name) => <li>{name}</li>);
    return <ul>{nameList}</ul>;
  };

  export default IterationSample;
  ```

  ### key

  - 컴포넌트 배열을 렌더링 했을 때 어떤 원소에 변동이 있었는지 알아내려고 사용
  - key 값을 설정할 때는 함수 내부에서 컴포넌트 props를 설정하듯이 설정하면 됨

```jsx
import React from "react";

const IterationSample = () => {
  const names = ["눈사람", "얼음", "눈", "바람"];
  const nameList = names.map((name, index) => <li key={index}>{name}</li>);
  // index라는 고유 번호 사용
  return <ul>{nameList}</ul>;
};

export default IterationSample;
```

- 근데 이러면 비효율적임

### 응용(동적인 배열 렌더링)

- 순서

  - 초기 상태 설정하기

  ```jsx
  // useState를 사용하여 상태 설정
  // 1. 데이터 배열 2. input 상태
  // 3. 데이터 배열에서 새로운 항목을 추가할 때 사용할 고유 id 상태

  import React, { useState } from "react";

  const IterationSample = () => {
    const [names, setNames] = useState([
      { id: 1, text: "눈사람" },
      { id: 2, text: "얼음" },
      { id: 3, text: "눈" },
      { id: 4, text: "바람" },
    ]);
    const [inputText, setInputText] = useState("");
    const [nextId, setNextId] = useState(5);
    //새로운 항목을 추가할 때 사용할 id

    const nameList = names.map((name) => <li key={name.id}>{name.text}</li>);
    // index라는 고유 번호 사용
    return <ul>{nameList}</ul>;
  };

  export default IterationSample;
  ```

  - 데이터 추가 기능 구현하기

  ```jsx
  // 새로운 이름을 등록

  import React, { useState } from "react";

  const IterationSample = () => {
    const [names, setNames] = useState([
      { id: 1, text: "눈사람" },
      { id: 2, text: "얼음" },
      { id: 3, text: "눈" },
      { id: 4, text: "바람" },
    ]);
    const [inputText, setInputText] = useState("");
    const [nextId, setNextId] = useState(5);
    //새로운 항목을 추가할 때 사용할 id

    const onChange = (e) => setInputText(e.target.value);
    const onClick = () => {
      const nextNames = names.concat({
        id: nextId, //nextId 값을 id로 설정하고
        text: inputText,
      });
      setNextId(nextId + 1); // nextId 값에 1을 더해 준다.
    };

    const nameList = names.map((name) => <li key={name.id}>{name.text}</li>);
    // index라는 고유 번호 사용
    return (
      <>
        <input value={inputText} onChange={onChange} />
        <button>추가</button>
        <ul>{nameList}</ul>
      </>
    );
  };

  export default IterationSample;
  ```

  push 함수는 기존 배열 자체를 변경해주는 반면, concat 은 새로운 배열을 만들어 준다.

  > 리액트에서 상태를 업데이트 할 때는 기존 상태를 그대로 두면서 새로운 값을 상태로 설정해야 한다. (불변성 유지)

  불변성을 유지 해야 나중에 리액트 컴포넌트의 성능을 최적화 할 수 있다.

  - 데이터 제거 기능 구현하기

    - 특정 항목을 지울 때는 배열의 내장 함수 filter을 사용한다.

    ```jsx
    const numbers = [1, 2, 3, 4, 5, 6];
    const biggerThanThree = numbers.filter((number) => number > 3);

    //결과: [4, 5, 6]
    ```

  ```jsx
  import React, { useState } from "react";

  const IterationSample = () => {
    const [names, setNames] = useState([
      { id: 1, text: "눈사람" },
      { id: 2, text: "얼음" },
      { id: 3, text: "눈" },
      { id: 4, text: "바람" },
    ]);
    const [inputText, setInputText] = useState("");
    const [nextId, setNextId] = useState(5);
    //새로운 항목을 추가할 때 사용할 id

    const onChange = (e) => setInputText(e.target.value);
    const onClick = () => {
      const nextNames = names.concat({
        id: nextId, //nextId 값을 id로 설정하고
        text: inputText,
      });
      setNextId(nextId + 1); // nextId 값에 1을 더해 준다.
      setNames(nextNames); // names 값을 업데이트 한다.
      setInputText(""); // inputText 값을 바꾼다.
    };
    const onRemove = (id) => {
      const nextNames = names.filter((name) => name.id !== id);
      setNames(nextNames);
    };

    const nameList = names.map((name) => (
      <li key={name.id} onDoubleClick={() => onRemove(name.id)}>
        {name.text}
      </li>
    ));
    // index라는 고유 번호 사용
    return (
      <>
        <input value={inputText} onChange={onChange} />
        <button onClick={onClick}>추가</button>
        <ul>{nameList}</ul>
      </>
    );
  };

  export default IterationSample;
  ```

  key 값이 중복된다면 렌더링 과정에서 오류 발생

  상태 안에서 배열을 변형할 때는 concat, filter 등의 배열 내장 함수를 사용하여 새로운 배열을 만든 후 이를 새로운 상태로 설정한다.

- 데이터 추가 기능 구현하기

```jsx
// 새로운 이름을 등록

import React, { useState } from "react";

const IterationSample = () => {
  const [names, setNames] = useState([
    { id: 1, text: "눈사람" },
    { id: 2, text: "얼음" },
    { id: 3, text: "눈" },
    { id: 4, text: "바람" },
  ]);
  const [inputText, setInputText] = useState("");
  const [nextId, setNextId] = useState(5);
  //새로운 항목을 추가할 때 사용할 id

  const onChange = (e) => setInputText(e.target.value);
  const onClick = () => {
    const nextNames = names.concat({
      id: nextId, //nextId 값을 id로 설정하고
      text: inputText,
    });
    setNextId(nextId + 1); // nextId 값에 1을 더해 준다.
  };

  const nameList = names.map((name) => <li key={name.id}>{name.text}</li>);
  // index라는 고유 번호 사용
  return (
    <>
      <input value={inputText} onChange={onChange} />
      <button>추가</button>
      <ul>{nameList}</ul>
    </>
  );
};

export default IterationSample;
```

push 함수는 기존 배열 자체를 변경해주는 반면, concat 은 새로운 배열을 만들어 준다.

> 리액트에서 상태를 업데이트 할 때는 기존 상태를 그대로 두면서 새로운 값을 상태로 설정해야 한다. (불변성 유지)

불변성을 유지 해야 나중에 리액트 컴포넌트의 성능을 최적화 할 수 있다.

- 데이터 제거 기능 구현하기

  - 특정 항목을 지울 때는 배열의 내장 함수 filter을 사용한다.

  ```jsx
  const numbers = [1, 2, 3, 4, 5, 6];
  const biggerThanThree = numbers.filter((number) => number > 3);

  //결과: [4, 5, 6]
  ```

```jsx
import React, { useState } from "react";

const IterationSample = () => {
  const [names, setNames] = useState([
    { id: 1, text: "눈사람" },
    { id: 2, text: "얼음" },
    { id: 3, text: "눈" },
    { id: 4, text: "바람" },
  ]);
  const [inputText, setInputText] = useState("");
  const [nextId, setNextId] = useState(5);
  //새로운 항목을 추가할 때 사용할 id

  const onChange = (e) => setInputText(e.target.value);
  const onClick = () => {
    const nextNames = names.concat({
      id: nextId, //nextId 값을 id로 설정하고
      text: inputText,
    });
    setNextId(nextId + 1); // nextId 값에 1을 더해 준다.
    setNames(nextNames); // names 값을 업데이트 한다.
    setInputText(""); // inputText 값을 바꾼다.
  };
  const onRemove = (id) => {
    const nextNames = names.filter((name) => name.id !== id);
    setNames(nextNames);
  };

  const nameList = names.map((name) => (
    <li key={name.id} onDoubleClick={() => onRemove(name.id)}>
      {name.text}
    </li>
  ));
  // index라는 고유 번호 사용
  return (
    <>
      <input value={inputText} onChange={onChange} />
      <button onClick={onClick}>추가</button>
      <ul>{nameList}</ul>
    </>
  );
};

export default IterationSample;
```

key 값이 중복된다면 렌더링 과정에서 오류 발생

상태 안에서 배열을 변형할 때는 concat, filter 등의 배열 내장 함수를 사용하여 새로운 배열을 만든 후 이를 새로운 상태로 설정한다.

## Hooks

### useState

```jsx
import React, { useState } from "react";

const Counter = () => {
  const [value, setValue] = useState(0); //카운터의 기본 값이 0이라는 뜻

  return (
    <div>
      <p>
        현재 카운터 값은 <b>{value}</b>입니다.
      </p>
      <button onClick={() => setValue(value + 1)}>+1</button>
      <button onClick={() => setValue(value - 1)}>-1</button>
    </div>
  );
};

export default Counter;
```

- useState 여러 번 사용하기
  - 그냥 여러번 사용하면 된다..

```jsx
import React, { useState } from "react";

const Info = () => {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeNickname = (e) => {
    setNickname(e.target.value);
  };

  return (
    <div>
      <div>
        <input value={name} onChange={onChangeName} />
        <input value={nickname} onChange={onChangeNickname} />
      </div>
      <div>
        <div>
          <b>이름:</b> {name}
        </div>
        <b>닉네임:</b> {nickname}
      </div>
    </div>
  );
};

export default Info;
```

### useEffect

- 리액트 **컴포넌트가 렌더링 될 때마다 특정 작업을 수행**하도록 설정할 수 있는 Hook
  - 마운트 될 때만 실행하고 싶을 때
    > 맨 처음 렌더링 될 때만 실행하고, 업데이트 될 때는 실행하지 않으려면 함수의 두 번째 파라미터로 비어 있는 배열을 넣어준다.

```jsx
useEffect(() => {
  console.log("마운트 될 때만 실행합니다");
}, []);
```

- **특정 값이 업데이트 될 때만 실행**하고 싶을 때

> useEffect의 **두 번째 파라미터로 전달되는 배열 안에 검사하고 싶은 값을 넣**어주면 된다. (배열 안에는 useState를 통해 관리하고 있는 상태를 넣어 주어도 되고, props로 전달 받은 값을 넣어 주어도 된다.)

```jsx
useEffect(() => {
  console.log(name);
}, [name]);
```

- 컴포넌트가 **언마운트 되기 전이나 업데이트 되기 직전에 어떠한 작업을 수행하고 싶다면 useEffect에서 뒷정리 함수를 반환**해야 한다.
  - 뒷정리 함수가 호출될 때는 업데이트 되기 직전의 값을 보여준다.
    > 오직 언마운트 될 때만 뒷정리 함수를 호출하고 싶다면 useEffect 함수의 두 번째 파라미터에 비어 있는 배열을 넣으면 된다.

```jsx
import React, { useState, useEffect } from 'react'

const Info = () => {
  const [name, setName] = useState('')
  const [nickname, setNickname] = useState('')
  useEffect(() => {
    console.log('effect')
    console.log(name)
    return () => {
      console.log('cleanup')
      console.log(name)
      }
    }, [name])

  const onChangeName = e => {
    setName(e.target.value)
  }

  const onChangeNickname = e => {
    setNickname(e.target.value)
  }

  return (
    <div>
      <div>
        <input value={name} onChange={onChangeName}/>
        <input value={nickname} onChange={onChangeNickname}/>
      </div>
    <div>
      <div>
        <b>이름:</b> {name}
      </div>
        <b>닉네임:</b> {nickname}
      </div>
    </div>
  )
}

export default Info

import React, { useState } from "react";
// import EventPractice from "./EventPractice";
import Info from "./Info";
// import MyComponent from "./MyComponent";
// import Say from "./Say";

const App = () => {
  const [visible, setVisible] = useState(false)
  return (
    // <MyComponent name="React" favoriteNumber={1}>리액트</MyComponent>
    <div>
      <button
        onClick = {() => {
          setVisible(!visible)
        }}
      >
        {visible ? '숨기기' : '보이기'}
      </button>
      <hr/>
        { visible && <Info /> }
    </div>

  );
};

export default App;
```

### useReducer

- useState보다 더 다양한 컴포넌트 상황에 따라 다양한 상태를 다른 값으로 업데이트 해 주고 싶을 때 사용하는 Hook
- **리듀서는 현재 상태, 그리고 업데이트를 위해 필요한 정보를 담은 액션 값을 전달 받아 새로운 상태를 반환 > 반드시 불변성을 지켜야 한다.**
- 가장 큰 장점은 컴포넌트 업데이트 로직을 바깥으로 뺴낼 수 있다는 것이다.

```jsx
import React, { useReducer } from "react";

function reducer(state, action) {
  // action.type에 따라 다른 작업 수행
  switch (action.type) {
    case "INCREMENT":
      return { value: state.value + 1 };
    case "DECREMENT":
      return { value: state.value - 1 };
    default:
      return state;
  }
}

const Counter = () => {
  const [state, dispatch] = useReducer(reducer, { value: 0 });
  // 첫번째 파라미터에는 리듀서 함수를 넣고, 두번째에는 기본값을 넣어준다.
  // state는 현재 가리키고 있는 상태, dispatch는 액션을 발생시키는 함수
  return (
    <div>
      <p>
        현재 카운터 값은 <b>{state.value}</b>입니다.
      </p>
      {/* dispatch(action)과 같은 형태로 액션 값을 넣어주면 리듀서 함수가 호출 */}
      <button onClick={() => dispatch({ type: "INCREMENT" })}>+1</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>-1</button>
    </div>
  );
};

export default Counter;
```

- 인풋 상태 관리하기(여기 모르겠음)

```jsx
import React, { useReducer } from "react";

function reducer(state, action) {
  return {
    ...state,
    [action.name]: action.value,
  };
}

const Info = () => {
  const [state, dispatch] = useReducer(reducer, {
    name: "",
    nickName: "",
  });
  const { name, nickname } = state;
  const onChange = (e) => {
    dispatch(e.target);
    // 이벤트 객체가 지니고 있는 e.target 값 자체를 액션 값으로 사용
  };

  return (
    <div>
      <div>
        <input value={name} onChange={onChange} />
        <input value={nickname} onChange={onChange} />
      </div>
      <div>
        <div>
          <b>이름:</b> {name}
        </div>
        <b>닉네임:</b> {nickname}
      </div>
    </div>
  );
};

export default Info;
```

### useMemo

- 함수형 컴포넌트 내부에서 발생하는 연산을 최적화 할 수 있음
- 렌더링하는 과정에서 특정 값이 바뀌었을 때만 연산을 실행하고, 원하는 값이 바뀌지 않았다면 이전에 연산했던 결과를 다시 사용

```jsx
import React, { useState, useMemo } from "react";

const getAverage = (numbers) => {
  console.log("평균 값 계산 중..");
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((a, b) => a + b);
  return sum / numbers.length;
};

const Average = () => {
  const [list, setList] = useState([]);
  const [number, setNumber] = useState("");

  const onChange = (e) => {
    setNumber(e.target.value);
  };
  const onInsert = () => {
    const nextList = list.concat(parseInt(number));
    setList(nextList);
    setNumber("");
  };

  const avg = useMemo(() => getAverage(list), [list]);

  return (
    <div>
      <input value={number} onChange={onChange} />
      <button onClick={onInsert}>등록</button>
      <ul>
        {list.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
      <div>
        <b>평균값:</b> {avg}
      </div>
    </div>
  );
};

export default Average;
```

### useCallback

- 주로 렌더링 성능을 최적화 해야 하는 상황에서 사용 > Hook을 사용하면 만들어 놨던 함수를 재사용 할 수 있음 > useMemo에서 늘어난 컴포넌트의 개수를 최적화해줌

```jsx
import React, { useState, useMemo, useCallback } from "react";

const getAverage = (numbers) => {
  console.log("평균 값 계산 중..");
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((a, b) => a + b);
  return sum / numbers.length;
};

const Average = () => {
  const [list, setList] = useState([]);
  const [number, setNumber] = useState("");

  const onChange = useCallback((e) => {
    setNumber(e.target.value);
  }, []); // 컴포넌트가 처음 렌더링 될 떄만 함수 생성 > 렌더링 될 때 함수를 계속해서 재사용
  const onInsert = useCallback(() => {
    const nextList = list.concat(parseInt(number));
    setList(nextList);
    setNumber("");
  }, [number, list]); //number 혹은 list가 바뀌었을 때만 함수 생성 > 이 때만 새로 만들어진 함수 사용
  // 함수가 number와 list 에 의존하므로 꼭 값이 있어야 함

  const avg = useMemo(() => getAverage(list), [list]);

  return (
    <div>
      <input value={number} onChange={onChange} />
      <button onClick={onInsert}>등록</button>
      <ul>
        {list.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
      <div>
        <b>평균값:</b> {avg}
      </div>
    </div>
  );
};

export default Average;
```

### useRef

- 함수형 컴포넌트에서 ref를 쉽게 사용할 수 있도록 함

```jsx
import React, { useState, useMemo, useCallback, useRef } from "react";

const getAverage = (numbers) => {
  console.log("평균 값 계산 중..");
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((a, b) => a + b);
  return sum / numbers.length;
};

const Average = () => {
  const [list, setList] = useState([]);
  const [number, setNumber] = useState("");
  const inputEl = useRef(null);

  const onChange = useCallback((e) => {
    setNumber(e.target.value);
  }, []);
  // 컴포넌트가 처음 렌더링 될 떄만 함수 생성 > 렌더링 될 때 함수를 계속해서 재사용
  const onInsert = useCallback(() => {
    const nextList = list.concat(parseInt(number));
    setList(nextList);
    setNumber("");
    inputEl.current.focus();
  }, [number, list]);
  //number 혹은 list가 바뀌었을 때만 함수 생성 > 이 때만 새로 만들어진 함수 사용
  // 함수가 number와 list 에 의존하므로 꼭 값이 있어야 함

  const avg = useMemo(() => getAverage(list), [list]);

  return (
    <div>
      <input value={number} onChange={onChange} />
      <button onClick={onInsert}>등록</button>
      <ul>
        {list.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
      <div>
        <b>평균값:</b> {avg}
      </div>
    </div>
  );
};

export default Average;
```

- 로컬 변수 사용하기
  - 로컬 변수: 렌더링과 상관 없이 바뀔 수 있는 값을 의미

### 커스텀 Hooks 만들기

(아래 방식도 가능하다는데 어렵다..)

```jsx
import { useReducer } from "react";

function reducer(state, action) {
  return {
    ...state,
    [action.name]: action.value
  }
}
export default function useInputs(initialForm) {
  const [state, dispatch] = useReducer(reducer, initialForm)
  const onChange = e => {
    dispatch(e.target)
  }
  return [state, onChange]
}

import React from 'react'
import useInputs from './useInputs'

const Info = () => {
  const [state, onChange] = useInputs({
    name: '',
    nickName: ''
  })
  const { name, nickname } = state

  return (
    <div>
      <div>
        <input name="name" value={name} onChange={onChange}/>
        <input name="nickname" value={nickname} onChange={onChange}/>
      </div>
    <div>
      <div>
        <b>이름:</b> {name}
      </div>
        <b>닉네임:</b> {nickname}
      </div>
    </div>
  )
}

export default Info
```

## 컴포넌트 스타일링

### styled-components

```jsx
// StyledComponent.js

import React from "react";
import styled, { css } from "styled-components";

const Box = styled.div`
  /* props 로 넣어준 값을 직접 전달해줄 수 있습니다. */
  background: ${(props) => props.color || "blue"};
  padding: 1rem;
  display: flex;
  width: 1024px;
  margin: 0 auto;
`;

const Button = styled.button`
  background: white;
  color: black;
  border-radius: 4px;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  font-size: 1rem;
  font-weight: 600;
  /* & 문자를 사용하여 Sass 처럼 자기 자신 선택 가능 */
  &:hover {
    background: rgba(255, 255, 255, 0.9);
  }
  /* 다음 코드는 inverted 값이 true 일 때 특정 스타일을 부여해줍니다. */
  ${(props) =>
    props.inverted &&
    css`
      background: none;
      border: 2px solid white;
      color: white;
      &:hover {
        background: white;
        color: black;
      }
    `};
  & + button {
    margin-left: 1rem;
  }
`;

const StyledComponent = () => (
  <Box color="black">
    <Button>안녕하세요</Button>
    <Button inverted={true}>테두리만</Button>
  </Box>
);

export default StyledComponent;
```

- Tagged 템플릿 리터럴(``)
  - 스타일을 작성할 때 `을 사용하여 만든 문자열에 스타일 정보를 넣어줌 > 일반 템플릿 리터럴과 다른 점은 템플릿 안에 자바스크립트 객체나 함수를 전달 할 때 온전히 추출 가능
  - media 쿼리를 사용하면 브라우저의 가로 크기에 따라 다른 스타일 적용 가능

# Todo 만들기

## 컴포넌트 소개

- TodoTemplate: 화면 가운데 정렬, 앱 타이틀을 보여줌, children으로 내부 JSX를 props로 받아와서 렌더링 함
- TodoInsert: 새로운 항목을 입력하고 추가할 수 있는 컴포넌트, state를 통해 인풋 상태 관리
- TodoListItem: 각 할 일 항목에 대한 정보를 보여 주는 컴포넌트, todo 객체를 props로 받아 와서 상태에 따라 다른 스타일의 UI를 보여줌
- TodoList: todos 배열을 props로 받아 온 후, 이를 배열 내장 함수 map을 사용해서 여러개의 TodoListItem 컴포넌트로 변환하여 보여줌

팁

- 단순히 새로운 항목을 만들 때 참조되는 값 - useRef

### 컴포넌트가 리렌더링 할 때

- 자신이 전달 받은 props가 변경될 때
- 자신의 state가 바뀔 때
- 부모 컴포넌트가 리렌더링될 때
- forceUpdate 함수가 실행될 때

## 리액트 라우터로 SPA 개발하기

### 라우팅

- 다른 주소에 다른 화면을 보여주는 것을 라우팅이라고 한다.
- 앱의 규모가 커지면 자바스크립트 파일이 너무 커져서 실제 방문하지 않는 페이지 까지 불러옴

> 코드 스플리팅을 사용하면 라우트 별로 파일들을 나누어서 트래픽과 로딩 속도 개선

### 리액트 라우터 적용

- { BrowserRouter } 라는 컴포넌트를 사용하여 감싼다.
- 페이지 만들기
- Route 컴포넌트로 특정 주소에 컴포넌트 연결

```jsx
<Route path="주소규칙" component={보여 줄 컴포넌트} exact={true} />
```

```jsx
import "./App.css";
import React from "react";
import { Route } from "react-router-dom";
import About from "./About";
import Home from "./Home";

const App = () => {
  return (
    <div>
      <Route path="/" component={Home} exact={true} />
      <Route path="/about" component={About} />
    </div>
  );
};

export default App;
```

- Link 컴포넌트를 사용하여 다른 주소로 이동

  - a태그를 사용하면 안됨 > 페이지를 새로 불러오기 때문에
  - Like 컴포넌트를 사용하여 전환하면, 페이지를 새로 불러오지 않고 app을 그대로 유지

  ```jsx
  import "./App.css";
  import React from "react";
  import { Route, Link } from "react-router-dom";
  import About from "./About";
  import Home from "./Home";

  const App = () => {
    return (
      <div>
        <ul>
          <li>
            <Link to="/">홈</Link>
          </li>
          <li>
            <Link to="/about">소개</Link>
          </li>
        </ul>
        <hr />
        <Route path="/" component={Home} exact={true} />
        <Route path="/about" component={About} />
      </div>
    );
  };

  export default App;
  ```

### Route 하나에 여러 개의 path 설정하기

```jsx
import "./App.css";
import React from "react";
import { Route } from "react-router-dom";
import About from "./About";
import Home from "./Home";

const App = () => {
  return (
    <div>
      <Route path="/" component={Home} exact={true} />
      <Route path={["/about", "/info"]} component={About} />
    </div>
  );
};

export default App;
```

### URL 파라미터와 쿼리

- 파라미터: 특정 아이디 혹은 이름을 조회할 때 사용
- 쿼리: 어떤 키워드를 검색하거나 페이지에 필요한 옵션을 전달할 때 사용
- **URL 파라미터**

```jsx
import React from "react";

const data = {
  velopert: {
    name: "김민준",
    description: "리액트를 좋아하는 개발자",
  },
  gildong: {
    name: "홍길동",
    description: "고전 소설 홍길동전의 주인공",
  },
};

const Profile = ({ match }) => {
  const { username } = match.params;
  const profile = data[username];
  if (!profile) {
    return <div>존재하지 않는 사용자입니다.</div>;
  }
  return (
    <div>
      <h3>
        {username}({profile.name})
      </h3>
      <p>{profile.description}</p>
    </div>
  );
};

export default Profile;
```

```jsx
// import logo from './logo.svg';
import "./App.css";
import React from "react";
import { Route, Link } from "react-router-dom";
import About from "./About";
import Home from "./Home";
import Profile from "./Profile";

const App = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/about">소개</Link>
        </li>
        <li>
          <Link to="/profile/velopert">velopert 프로필</Link>
        </li>
        <li>
          <Link to="/profile/gildong">gildong 프로필</Link>
        </li>
      </ul>
      <hr />
      <Route path="/" component={Home} exact={true} />
      <Route path={["/about", "/info"]} component={About} />
      <Route path="/profile/:username" component={Profile} />
    </div>
  );
};

export default App;
```

- **URL 쿼리**
  - URL 쿼리를 읽을 때는 위 객체가 지닌 값 중에서 search 값을 확인해야 한다.
  - search 값에서 특정 값을 읽어 오기 위해서는 이 문자열을 객체 형태로 변환해야 한다.
  - 쿼리를 사용할 때는 쿼리 문자열을 객체로 파싱하는 과정에서 결과 값은 언제나 문자열이라는 점 주의
  - 숫자를 받아 와야 하면 parseInt 함수를 통해 꼭 숫자로 변환, 논리 자료형 값을 사용해야 하면 정확히 true 문자열이랑 일치하는지 비교

### 서브 라우트

- 라우트 내부에 또 라우트를 정의하는 것
- 라우트로 사용되고 있는 컴포넌트의 내부에 Route 컴포넌트를 또 사용

```jsx
import React from "react";
import { Link, Route } from "react-router-dom";
import Profile from "./Profile";

const Profiles = () => {
  return (
    <div>
      <h3>사용자 목록:</h3>
      <ul>
        <li>
          <Link to="/profiles/velopert">velopert</Link>
        </li>
        <li>
          <Link to="/profiles/gildong">gildong</Link>
        </li>
      </ul>
      <Route
        path="/profiles"
        exact
        render={() => <div>사용자를 선택해 주세요.</div>}
        // render를 쓰면 보여 주고 싶은 JSX를 넣어 줄 수 있다.
      />
      <Route path="/profiles/:username" component={Profile} />
    </div>
  );
};

export default Profiles;
```

```jsx
// import logo from './logo.svg';
import "./App.css";
import React from "react";
import { Route, Link } from "react-router-dom";
import About from "./About";
import Home from "./Home";
// import Profile from "./Profile";
import Profiles from "./Profiles";

const App = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/about">소개</Link>
        </li>
        {/* <li>
          <Link to="/profile/velopert">velopert 프로필</Link>
        </li>
        <li>
          <Link to="/profile/gildong">gildong 프로필</Link>
        </li> */}
        <li>
          <Link to="/profiles">프로필</Link>
        </li>
      </ul>
      <hr />
      <Route path="/" component={Home} exact={true} />
      <Route path={["/about", "/info"]} component={About} />
      {/* <Route path="/profile/:username" component={Profile} /> */}
      <Route path="/profiles" component={Profiles} />
    </div>
  );
};

export default App;
```

### 리액트 라우터 부가 기능

- history

  - 특정 버튼을 눌렀을 때 뒤로 가거나, 로그인 후 화면을 전환하거나, 다른 페이지로 이탈하는 것을 방지해야 할 때 history 활용

  ```jsx
  import React, { Component } from "react";

  class HistorySample extends Component {
    handleGoBack = () => {
      // 뒤로 가기
      this.props.history.goBack();
    };
    handleGoHome = () => {
      // 홈으로 이동
      this.props.history.push("/");
    };

    componentDidMount() {
      // 이것을 설정하고 나면 페이지에 변화가 생기려고 할 때마다 정말 나갈 것인지 질문
      this.unblock = this.props.history.block("정말 떠나실 건가요?");
    }
    componentWillUnmount() {
      // 컴포넌트가 언마운트되면 질문을 멈춤
      if (this.unblock) {
        this.unblock();
      }
    }
    render() {
      return (
        <div>
          <button onClick={this.handleGoBack}>뒤로</button>
          <button onClick={this.handleGoBack}>홈으로</button>
        </div>
      );
    }
  }

  export default HistorySample;
  ```

  ```jsx
  // import logo from './logo.svg';
  import "./App.css";
  import React from "react";
  import { Route, Link } from "react-router-dom";
  import About from "./About";
  import Home from "./Home";
  // import Profile from "./Profile";
  import Profiles from "./Profiles";
  import HistorySample from "./HistorySample";

  const App = () => {
    return (
      <div>
        <ul>
          <li>
            <Link to="/">홈</Link>
          </li>
          <li>
            <Link to="/about">소개</Link>
          </li>
          {/* <li>
            <Link to="/profile/velopert">velopert 프로필</Link>
          </li>
          <li>
            <Link to="/profile/gildong">gildong 프로필</Link>
          </li> */}
          <li>
            <Link to="/profiles">프로필</Link>
          </li>
          <li>
            <Link to="/history">History 예제</Link>
          </li>
        </ul>
        <hr />
        <Route path="/" component={Home} exact={true} />
        <Route path={["/about", "/info"]} component={About} />
        {/* <Route path="/profile/:username" component={Profile} /> */}
        <Route path="/profiles" component={Profiles} />
        <Route path="/history" component={HistorySample} />
      </div>
    );
  };

  export default App;
  ```

- withRouter
  - HoC, 라우트로 사용된 컴포넌트가 아니어도 match, location, history 객체를 접근할 수 있게 해줌

```jsx
import React from "react";
import { withRouter } from "react-router-dom";
const WithRouterSample = ({ location, match, history }) => {
  return (
    <div>
      <h4>location</h4>
      <textarea
        value={JSON.stringify(location, null, 2)}
        // 제이슨에 들여쓰기가 적용된 상태로 문자열이 만들어진다.
        rows={7}
        readOnly={true}
      />
      <h4>match</h4>
      <textarea
        value={JSON.stringify(match, null, 2)}
        rows={7}
        readOnly={true}
      />
      <button onClick={() => history.push("//")}>홈으로</button>
    </div>
  );
};

export default withRouter(WithRouterSample);
```

- Switch

  - 여러 Route를 감싸서 그 중 일치하는 단 하나의 라우트만을 렌더링
  - 이걸 사용하면 Not Found 페이지도 구현할 수 있음

  ```jsx
  // import logo from './logo.svg';
  import "./App.css";
  import React from "react";
  import { Route, Link, Switch } from "react-router-dom";
  import About from "./About";
  import Home from "./Home";
  // import Profile from "./Profile";
  import Profiles from "./Profiles";
  import HistorySample from "./HistorySample";

  const App = () => {
    return (
      <div>
        <ul>
          <li>
            <Link to="/">홈</Link>
          </li>
          <li>
            <Link to="/about">소개</Link>
          </li>
          {/* <li>
            <Link to="/profile/velopert">velopert 프로필</Link>
          </li>
          <li>
            <Link to="/profile/gildong">gildong 프로필</Link>
          </li> */}
          <li>
            <Link to="/profiles">프로필</Link>
          </li>
          <li>
            <Link to="/history">History 예제</Link>
          </li>
        </ul>
        <hr />
        <Switch>
          <Route path="/" component={Home} exact={true} />
          <Route path={["/about", "/info"]} component={About} />
          {/* <Route path="/profile/:username" component={Profile} /> */}
          <Route path="/profiles" component={Profiles} />
          <Route path="/history" component={HistorySample} />
          <Route
            render={({ location }) => (
              <div>
                <h2>이 페이지는 존재하지 않습니다:</h2>
                <p>{location.pathname}</p>
              </div>
            )}
          />
        </Switch>
      </div>
    );
  };

  export default App;
  ```

- NavLink
  - 현재 경로와 Link에서 사용하는 경로가 일치하는 경우 특정 스타일 혹은 CSS 클래스를 적용할 수 있는 컴포넌트

```jsx
import React from "react";
import { NavLink, Route } from "react-router-dom";
import Profile from "./Profile";

const Profiles = () => {
  const activeStyle = {
    background: "red",
    color: "white",
  };
  return (
    <div>
      <h3>사용자 목록:</h3>
      <ul>
        <li>
          <NavLink activeStyle={activeStyle} to="/profiles/velopert">
            velopert
          </NavLink>
        </li>
        <li>
          <NavLink activeStyle={activeStyle} to="/profiles/gildong">
            gildong
          </NavLink>
        </li>
        {/* <li>
          <Link to="/profiles/velopert">velopert</Link>
        </li>
        <li>
          <Link to="/profiles/gildong">gildong</Link>
        </li> */}
      </ul>
      <Route
        path="/profiles"
        exact
        render={() => <div>사용자를 선택해 주세요.</div>}
      />
      <Route path="/profiles/:username" component={Profile} />
      {/* <WithRouterSample /> */}
    </div>
  );
};

export default Profiles;
```

## 외부 API를 연동하여 뉴스 뷰어 만들기

### 비동기 작업의 이해

- 동시에 여러 가지 요청을 처리할 수 있고, 기다리는 과정에서 다른 함수 호출 가능

### 콜백 함수

```jsx
function increase(number, callback) {
  setTimeout(() => {
    const result = number + 10;
    if (callback) {
      callback(result);
    }
  }, 1000);
}

increase(0, (result) => {
  console.log(result);
});
```

하지만 콜백을 많이 쓰다보면 콜백 지옥에 빠질 수도 있다.

그러면 promise 혹은 async/await를 사용하자!

### async/await

- 함수의 앞부분에 async 키워드를 추가하고, 해당 함수 내부에서 promise의 앞부분에 await 키워드를 사용한다.

```jsx
function increase(number) {
  const promise = new Promise((resolve, reject) => {
    // resolve는 성공, reject는 실패
    setTimeout(() => {
      const result = number + 10;
      if (result > 50) {
        const e = new Error("NumberTooBig");
        return reject(e);
      }
      resolve(result);
    }, 1000);
  });
  return promise;
}

async function runTasts() {
  try {
    //try/catch 구문을 사용하여 에러 처리
    let result = await increase(0);
    console.log(result);
    result = await increase(result);
    console.log(result);
    result = await increase(result);
    console.log(result);
    result = await increase(result);
    console.log(result);
    result = await increase(result);
    console.log(result);
    result = await increase(result);
    console.log(result);
  } catch (e) {
    console.log(e);
  }
}
```

## axios로 APi 호출해서 데이터 받아오기

```jsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NewsItem from "./NewsItem";
import axios from "axios";

const NewsListBlock = styled.div`
  box-sizing: border-box
  padding-bottom: 3rem
  width: 768px
  margin: 0 auto
  margin-top: 2rem
  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const NewsList = () => {
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://newsapi.org/v2/top-headlines?country=kr&category=technology&apiKey=52f4c0e2265e4dd59f5e20280c4539c9"
        );
        setArticles(response.data.articles);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchData();
  }, []);
  if (loading) {
    return <NewsListBlock>대기 중...</NewsListBlock>;
  }
  if (!articles) {
    return null;
  }
  // articles 값이 유효할 때
  return (
    <NewsListBlock>
      {articles.map((article) => (
        <NewsItem key={article.url} article={article} />
      ))}
    </NewsListBlock>
  );
};

export default NewsList;
```

```jsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NewsItem from "./NewsItem";
import axios from "axios";

const NewsListBlock = styled.div`
  box-sizing: border-box
  padding-bottom: 3rem
  width: 768px
  margin: 0 auto
  margin-top: 2rem
  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const NewsList = ({ category }) => {
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const query = category === "all" ? "" : `&category=${category}`;
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=0a8c4202385d4ec1bb93b7e277b3c51f`
        );
        setArticles(response.data.articles);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchData();
  }, [category]);
  if (loading) {
    return <NewsListBlock>대기 중...</NewsListBlock>;
  }
  if (!articles) {
    return null;
  }
  // articles 값이 유효할 때
  return (
    <NewsListBlock>
      {articles.map((article) => (
        <NewsItem key={article.url} article={article} />
      ))}
    </NewsListBlock>
  );
};

export default NewsList;
```

## Context API

### consumer 사용하기

```jsx
import React from "react";
import ColorContext from "../contexts/color";

const ColorBox = () => {
  return (
    <ColorContext.Consumer>
      {(value) => (
        <div
          style={{
            width: "64px",
            height: "64px",
            background: value.color,
          }}
          //render props > 컴포넌트의 children이 있어야 할 자리에 일반 JSX 혹은 함수를 전달
        />
      )}
    </ColorContext.Consumer>
  );
};

export default ColorBox;
```

- 색상을 props로 받아 오는 것이 아니라 Consumer라는 컴포넌트를 통해 색상을 조회한다.

### Provider

- context의 value를 변경할 수 있다.(반드시 value 값을 명시해야 한다.)

```jsx
import React from "react";
// import { Route } from 'react-router-dom';
// import NewsPage from './pages/NewsPage';
import ColorBox from "./components/ColorBox";
import ColorContext from "./contexts/color";

const App = () => {
  // return <Route path="/:category?" component={NewsPage} />;
  <ColorContext.Provider value={{ color: "red " }}>
    <div>
      <ColorBox />
    </div>
    ;
  </ColorContext.Provider>;
};

export default App;
```

> 할 필요 없음 바로 redux로

## 리덕스 라이브러리 이해하기

### 액션

- 상태에 어떠한 변화가 필요하면 액션이란 것이 발생
- 액션 객체는 type 필드를 가지고 있어야 한다.

```jsx
{
	type: 'ADD_TODO',
	data: {
		id: 1,
		text: '리덕스 배우기'
	}
}
{
	type: 'CHANGE_INPUT',
	text: '안녕하세요'
}

```

### 액션 생성 함수

- 액션 객체를 만들어 주는 함수

```jsx
function addTodo(data) {
  return {
    type: "ADD_TODO",
    data,
  };
}

// 화살표 함수도 가능
const changeInput = (text) => ({
  type: "CHANGE_INPUT",
  text,
});
```

### 리듀서

- 변화를 일으키는 함수
- 액션을 만들어서 발생 > 리듀서가 현재 상태와 전달받은 액션 객체를 파라미터로 받아 옴 > 두 값으로 새로운 상태를 만들어서 반환

```jsx
const initialState = {
  counter: 1,
};
function reducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      return {
        counter: state.counter + 1,
      };
    default:
      return state;
  }
}
```

### 스토어

- 한 개의 프로젝트는 단 하나의 스토어만 가질 수 있음

### 디스패치

- 스토어의 내장 함수
- 액션을 발생시키는 것
- dispatch(action)과 같은 형태로 액션 객체를 파라미터로 넣어서 호출

### 구독

- 스토어의 내장 함수 중 하나
- subscribe 함수 안에 리스너 함수를 파라미터로 넣어서 호출

```jsx
const listener = () => {
  console.log("상태가 업데이트됨");
};
const unsubscribe = store.subscribe(listener);

unsubscribe();
```

### 리덕스의 세 가지 규칙

1. 단일 스토어

2. 읽기 전용 상태

- 불변성을 유지해야 하기 때문에

3. 리듀서는 순수한 함수

- 리듀서 함수는 이전 상태와 액션 객체를 파라미터를 받는다.
- 파라미터 외의 값에는 의존하면 안됨
- 이전 상태는 절대로 건드리지 않고, 변화를 준 새로운 상태 객체를 만들어 반환
- 똑같은 파라미터로 호출된 리듀서 함수는 언제나 똑같은 결과 값을 반환
- 주로 네트워크 요청과 같은 비동기 작업은 미들웨어를 통해 관리

## 리덕스를 사용하여 리액트 애플리케이션 상태 관리하기

### UI 준비하기

- 프레젠테이셔널 컴포넌트와 컨테이너 컴포넌트 분리
- 컨테이너 컴포넌트는 리덕스와 연동되어 있는 컴포넌트로, 리덕스로부터 상태를 받아 오기도 하고 리덕스 스토어에 액션을 디스패치 하기도 한다.
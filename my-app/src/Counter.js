import React, { useReducer } 
from 'react'

function reducer(state, action) {
  // action.type에 따라 다른 작업 수행
  switch (action.type) {
    case 'INCREMENT':
      return { value: state.value + 1 }
    case 'DECREMENT':
      return { value: state.value - 1 }
    default:
      return state 
  }
}

const Counter = () => {
  const [state, dispatch] = useReducer(reducer, { value: 0})
  // 첫번째 파라미터에는 리듀서 함수를 넣고, 두번째에는 기본값을 넣어준다.
  // state는 현재 가리키고 있는 상태, dispatch는 액션을 발생시키는 함수
  return (
    <div>
      <p>
        현재 카운터 값은 <b>{state.value}</b>입니다.
      </p>
    {/* dispatch(action)과 같은 형태로 액션 값을 넣어주면 리듀서 함수가 호출 */}
      <button onClick={() => dispatch({ type: 'INCREMENT'})}>+1</button>
      <button onClick={() => dispatch({ type: 'DECREMENT'})}>-1</button>
    </div>
  )
}

export default Counter
import React, { useReducer } from 'react'

function reducer(state, action) {
  return {
    ...state,
    [action.name]: action.value
  }
}

const Info = () => {
  const [state, dispatch] = useReducer(reducer, {
    name: '',
    nickName: ''
  })
  const { name, nickname } = state
  const onChange = e => {
    dispatch(e.target)
    // 이벤트 객체가 지니고 있는 e.target 값 자체를 액션 값으로 사용
  }

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
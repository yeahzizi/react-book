import React, { useState, useMemo, useCallback } from 'react'

const getAverage = numbers => {
  console.log('평균 값 계산 중..')
  if (numbers.length === 0) return 0
  const sum = numbers.reduce((a, b) => a + b)
  return sum / numbers.length
}

const Average = () => {
  const [list, setList] = useState([])
  const [number, setNumber] = useState('')

  const onChange = useCallback(e => {
    setNumber(e.target.value)
  }, []) 
  // 컴포넌트가 처음 렌더링 될 떄만 함수 생성 > 렌더링 될 때 함수를 계속해서 재사용
  const onInsert = useCallback(() => {
    const nextList = list.concat(parseInt(number))
    setList(nextList)
    setNumber('')
  }, [number, list] ) 
  //number 혹은 list가 바뀌었을 때만 함수 생성 > 이 때만 새로 만들어진 함수 사용
  // 함수가 number와 list 에 의존하므로 꼭 값이 있어야 함

  const avg = useMemo(() => getAverage(list), [list])

  return (
    <div>
      <input value={number} onChange={onChange}/>
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
  )
}

export default Average
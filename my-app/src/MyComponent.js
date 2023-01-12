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


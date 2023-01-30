import React from 'react'
import styled from 'styled-components'

const Alert = (props) => {
    
  return (
    <Wrapper>
      <div>
      {props.alert && <div className={`alert alert-${props.alert.type}`} role="alert">
        {props.alert.type === "danger" ? "Warning" : "Success"} : {props.alert.msg}
      </div>}
    </div>
    </Wrapper>
  )
}

export default Alert

const Wrapper = styled.div`
     .alert{
        position: absolute;
        transform: translate(50);
        bottom: 3rem;
        left: 1rem;
        width: 20rem;
        z-index: 9999;
       
     }
     
`

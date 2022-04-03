import React from 'react'
import styled from 'styled-components'

function Error({ children = "Ooops! Niečo sa pokazilo, skúste znovu neskôr." }) {
  return (
    <ErrorContainer>{children}</ErrorContainer>
  )
}

export default Error

const ErrorContainer = styled.div`
  border-radius: 5px;
  margin-bottom: 10px;
  text-align: center;
  color: black;
  font-size: 28px;
  font-weight: 600;
`;

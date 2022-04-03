import React from 'react'
import styled from 'styled-components';

export default function FormError(props) {
  return (
    <ErrorContainer>{props.children}</ErrorContainer>
  )
}
const ErrorContainer = styled.div`
  border-radius: 5px;
  margin-top: 20px;
  text-align: center;
  color: #f57c77;
  font-size: 1em;
  font-weight: 600;
  padding: 5px 10px;
  border: #f57c77 1px solid;
`;
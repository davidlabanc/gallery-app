import React from 'react'
import styled, { keyframes } from 'styled-components';

import CheckIcon from '@mui/icons-material/Check';

export default function Success({ message }) {
  return (
    <Wrapper>
      <Container>
        <CheckIcon sx={{ color: "white", marginRight: "5px;" }} />
        <Text>{message}</Text>
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const FadeIn = keyframes`
  0%{
    top: -50%;
  }
  10% {
    top: 88px;
  }
  80%{
    top: 88px;
  }
  100% {
    top: -100%;
  } 
`;

const Text = styled.div`
  text-align: center;
  font-size: 1.125em;
  font-weight: 600;
  color: white;
  width: max-content;
`;

const Container = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  margin: 0 auto;
  background-color: #4CAF50;
  width: max-content;
  border-radius: 40px;
  animation: ${FadeIn} 2.5s;
  animation-fill-mode: forwards;
  padding: 5px 15px;
  z-index: 5;
  &:hover {
    animation-play-state: paused;
  }
`;


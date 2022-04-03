import React from "react";
import { Routes, Route } from "react-router-dom";
import styled from 'styled-components'

import Categories from './views/Categories/containers/Categories'
import Photos from './views/Photos/containers/Photos'

function App() {
  let routes = (
    <Routes>
      <Route path="/gallery/:id" element={<Photos />} />
      <Route path="/" element={<Categories />} />
    </Routes>
  )

  return (
    <Container>
      {routes}
    </Container>
  );
}

export default App

const Container = styled.div`
  width: 70%;
  margin: 100px auto;
  @media (max-width: 920px) {
    box-sizing: border-box;
    width: 100%;
    max-width:100%;
    padding: 40px;
  }
`;
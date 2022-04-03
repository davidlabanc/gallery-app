import React from "react";
import { Routes, Route } from "react-router-dom";
import styled from 'styled-components'

import { UIContext } from './shared/context/ui-context'
import { useUI } from './shared/hooks/ui-hook'

import Categories from './views/Categories/containers/Categories'
import Photos from './views/Photos/containers/Photos'

function App() {
  const { overlay, showOverlay } = useUI()

  let routes = (
    <Routes>
      <Route path="/gallery/:id" element={<Photos />} />
      <Route path="/" element={<Categories />} />
    </Routes>
  )

  return (
    <UIContext.Provider value={{
      overlay, showOverlay
    }}>
      <Container>
        {routes}
      </Container>
    </UIContext.Provider>
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
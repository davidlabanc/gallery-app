import React from 'react'
import styled from "styled-components";

import { useProgressiveImage } from "../shared/hooks/gallery-image-hook";

const GalleryImage = ({ src, placeholder }) => {
  const { image, place } = useProgressiveImage(src, placeholder)

  return (
    <Container >
      <StyledImage src={place || image} blur={!image ? true : false}>
      </StyledImage>
    </Container>
  )
}

export default React.memo(GalleryImage)

const Container = styled.div`
  width: 100%;
  max-height: 100%;
  max-width: 100%;
  overflow: hidden;
  border-radius: 10px;
`;

const StyledImage = styled.div`

  ${props => props.src && `background: url(` + props.src + `)`};
  background-size: cover;
  background-position: center;
  width: 100%;
  aspect-ratio: 16/9;
  ${props => props.blur && `filter: blur(15px); `};
  transition: filter 200ms ease-out; 
  will-change: background;
  z-index: 1;
`;
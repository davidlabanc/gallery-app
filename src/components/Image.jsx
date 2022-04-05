import React from 'react'
import styled from 'styled-components'

import CircularProgress from '@mui/material/CircularProgress';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';

import { useProgressiveImage } from "../shared/hooks/image-hook";

function Image({ src = undefined, aspect_ratio = "1/1" }) {
  const { image } = useProgressiveImage(src)

  if (src === undefined || image === undefined) {
    return (
      <LoadingContainer aspect_ratio={aspect_ratio}>
        <ImageNotSupportedIcon style={{ fontSize: "96px" }} />
      </LoadingContainer>
    )
  }

  if (image) {
    return (<Container src={src} aspect_ratio={aspect_ratio}></Container>)
  } else {
    return (
      <LoadingContainer aspect_ratio={aspect_ratio}><CircularProgress color="inherit" /></LoadingContainer>
    )
  }
}

export default React.memo(Image)

const LoadingContainer = styled.div`
  width: 100%;
  max-height: 100%;
  display: flex;
  ${props => `aspect-ratio: ${props.aspect_ratio}`};
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  background-color: black;
  width: 100%;
  ${props => `aspect-ratio: ${props.aspect_ratio}`};
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
`;
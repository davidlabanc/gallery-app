import React from 'react'
import styled from 'styled-components'
import { Link } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';

import { url } from "../../../shared/constants/api";

import Image from '../../../components/Image';


function Category({ image, name, path, photos = [] }) {

  let index, count

  if (photos.length > 0) {
    index = photos?.findIndex((photo) => photo.gallery.name === name)
    if (index > -1)
      count = photos[index]?.images?.length
    else
      count = undefined
  }

  const countText = (count) => {
    if (count === undefined) {
      return <LoadingContainer><CircularProgress color="inherit" size="10px" sx={{ marginRight: "5px" }} />fotiek</LoadingContainer>
    }
    if (count === 1) {
      return "1 fotka"
    }
    if (count === 0 || count > 6) {
      return `${count} fotiek`
    } else {
      return `${count} fotky`
    }
  }

  return (
    <Container to={`/gallery/${path}`}>
      <ItemContainer>
        <ImageContainer>
          <Count>{countText(count)}</Count>
          <AnimContainer>
            <Image src={image ? `${url}/images/480x480/${image?.fullpath}` : undefined} aspect_ratio="4/3"></Image>
          </AnimContainer>
        </ImageContainer>
        <Header>{name}</Header>
      </ItemContainer>
    </Container>
  )
}

export default Category

const LoadingContainer = styled.div`
display: flex;
align-items: center;
`;

const Count = styled.div`
  color: white;
  background-color: #000000ab;
  padding: 2px 10px;
  border-radius: 40px;
  width: max-content;
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 3;
  min-height: 1em;
  display: flex;
`;

export const ItemContainer = styled.div`
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0px 0px 20px 5px rgba(0,0,0,0.15);
  background: white;
  width: 96%;
  margin: 2%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  cursor: pointer;
  box-sizing: border-box;
  flex-grow: 1;
`;

const ImageContainer = styled.div`
  overflow: hidden;
  width: 100%;
  min-width: 200px;
  aspect-ratio: 4/3;
  position: relative;
`;

const AnimContainer = styled.div`
  transition: transform .3s ease;
`;

const Container = styled(Link)`
  box-sizing: border-box;
  width: 100%;
  min-width: 200px;
  text-decoration: none;
  color: black;
  display: flex;
  align-items: stretch;

  &:hover  ${AnimContainer}{
    transform: scale(1.25);
  }
`;

const Header = styled.div`
  font-size: 1.05em;
  padding: 20px;
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
  max-height: 1.05em;
  white-space: nowrap;

  &::first-letter{
    text-transform: uppercase;
  }
`;
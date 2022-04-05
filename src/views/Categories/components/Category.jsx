import React from 'react'
import styled from 'styled-components'
import { Link } from "react-router-dom";

import { url } from "../../../shared/constants/api";

import Image from '../../../components/Image';


function Category({ image, name, path }) {
  return (
    <Container to={`/gallery/${path}`}>
      <ItemContainer>
        <ImageContainer>
          <AnimContainer>
            <Image src={image ? `${url}/images/480x480/${image?.fullpath}` : undefined} aspect_ratio = "4/3"></Image>
          </AnimContainer>
        </ImageContainer>
        <Header>{name}</Header>
      </ItemContainer>
    </Container>
  )
}

export default Category

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
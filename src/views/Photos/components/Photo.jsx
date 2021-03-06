import React, { useCallback } from 'react'
import styled from 'styled-components'
import DeleteIcon from '@mui/icons-material/Delete';

import { useUI } from '../../../shared/hooks/ui-hook';
import { StyledForm } from "../../../shared/styles/styles";
import { url } from "../../../shared/constants/api";

import Image from '../../../components/Image';
import Overlay from '../../../components/Overlay'
import FormError from '../../../components/FormError'
import Button from '../../../components/Button'

function Photo({ image, deleteMode = false, setStartImage = () => { }, index, onDelete, error, isLoading }) {
  const { overlay, showOverlay } = useUI()

  const onSubmit = useCallback(
    (event) => {
      onDelete(event, image)
    },
    [onDelete, image],
  )

  return (
    <Container>
      <ContainerHelper>
        {
          deleteMode && (
            <CloseContainerHelper>
              <CloseContainer onClick={() => showOverlay()} >
                <StyledDeleteIcon />
              </CloseContainer>
            </CloseContainerHelper>
          )
        }
        <ImageContainer onClick={() => !deleteMode ? setStartImage(index) : null} deleteMode={deleteMode}>
          <Image src={`${url}/images/640x360/${image}`}></Image>
        </ImageContainer>
      </ContainerHelper>

      <Overlay header="Odstraniť fotku" overlay={overlay} showOverlay={showOverlay}>
        Naozaj chcete odstránit túto fotku?
        <StyledForm onSubmit={(event) => onSubmit(event, image)}>

          {error?.status === 400 && <FormError>Nenašiel sa žiaden súbor.</FormError>}
          {error?.status === 404 && <FormError>Galéria sa nenašla.</FormError>}
          <ButtonContainer>
            <SecondaryButton onClick={() => showOverlay()}>Zrušiť</SecondaryButton>
            <Button isLoading={isLoading}>Odstrániť</Button>
          </ButtonContainer>

        </StyledForm>
      </Overlay>
    </Container>
  )
}

export default Photo

const CloseContainerHelper = styled.div`
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SecondaryButton = styled.div`
  width: max-content;
  color: black;
  text-transform: uppercase;
  display: block;
  font-size: 0.875rem;
  line-height: 1.75;
  border: 2px solid black;
  background: white;
  border-radius: 10px;
  padding: 10px 20px;
  text-align: center;
  font-weight: 600;
  cursor: pointer;
  margin-top: 20px;
  transition: all ease-in-out 250ms;
  &:hover {
    background-color: black;
    color: white;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: flex-end;
  align-items: center;
`;

const ImageContainer = styled.div`
  ${props => !props.deleteMode ? `cursor: pointer;` : `cursor: default;`};
`;

const StyledDeleteIcon = styled(DeleteIcon)({
  fontSize: "3rem!important",
  color: "white"
});


const CloseContainer = styled.div`

  height: 5.5em;
  width: 5.5em;
  background:#931b16e0;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 2;
  color: white;
  transition: transform ease .3s;

  &:hover {
    transform: scale(1.2)
  }
  
`;
const ContainerHelper = styled.div`
  border-radius: 5px;
  overflow: hidden;
  background: white;
  width: 100%;
  aspect-ratio: 1/1;
  position: relative;
  box-sizing: border-box;
`;

const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  min-width: 200px;
  text-decoration: none;
  color: black;
  aspect-ratio: 1/1;
  padding: 2%;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-grow: 1;
`;

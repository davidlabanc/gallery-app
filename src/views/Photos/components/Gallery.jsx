import React, { useEffect, useState, useCallback } from 'react'
import { get } from 'lodash'
import styled from 'styled-components'
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import GalleryImage from '../../../components/GalleryImage';

function Gallery({ startImage = null, images = [], setStartImage }) {
  const [show, setShow] = useState(false)
  const [imageNumber, setImageNumber] = useState(null)

  useEffect(() => {
    if (startImage !== null) {
      setImageNumber(startImage)
      setShow(true)
    }
  }, [startImage])

  const handleHide = useCallback(
    () => {
      setStartImage(null)
      setShow(false)
      setImageNumber(null)
    },
    [],
  )

  const handleMoveLeft = useCallback(
    () => {
      if (imageNumber - 1 >= 0) {
        setImageNumber(imageNumber - 1)
      } else {
        setImageNumber(images.length - 1)
      }
    },
    [imageNumber, images]
  )

  const handleMoveRight = useCallback(
    () => {
      if (imageNumber + 1 < images.length) {
        setImageNumber(imageNumber + 1)
      } else {
        setImageNumber(0)
      }
    },
    [imageNumber, images]
  )


  if (show) {
    return (
      <>
        <OverlayClose onClick={() => handleHide()}></OverlayClose>
        <OverlayBackground>
          <Container>
            <CloseContainer onClick={() => handleHide()} >
              <StyledCloseIcon />
            </CloseContainer>
            <ArrowContainer left={true} onClick={() => handleMoveLeft()} >
              <StyledArrowBackIcon />
            </ArrowContainer>
            <ArrowContainer left={false} onClick={() => handleMoveRight()} >
              <StyledArrowForwardIcon />
            </ArrowContainer>
            <GalleryImage
              src={`http://api.programator.sk/images/1600x900/${get(images, `[${imageNumber}].fullpath`, undefined)}`}
              placeholder={`http://api.programator.sk/images/640x360/${get(images, `[${imageNumber}].fullpath`, undefined)}`}
              imgHtml={true} />
          </Container>
        </OverlayBackground>
      </>
    )
  } else {
    return null
  }
}

export default Gallery

const CloseContainer = styled.div`
  height: 64px;
  width: 64px;
  position: absolute;
  top: 20px;
  right: 20px;
  background: #000000a1;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 3;
`;

const ArrowContainer = styled.div`
  position: absolute;
  height: 64px;
  width: 64px;
  background: white;
  border-radius: 50%;
  cursor: pointer;
  ${props => props.left ? `left: -24px` : `right: -24px`};
  top: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 3;
`;

const StyledArrowBackIcon = styled(ArrowBackIcon)({
  fontSize: "1.05em",
});

const StyledArrowForwardIcon = styled(ArrowForwardIcon)({
  fontSize: "1.05em",
});

const StyledCloseIcon = styled(CloseIcon)({
  fontSize: "1.05em",
  color: "white"
});

const OverlayClose = styled.div`
  position: fixed;
  top: 0px;
  bottom: 0px;
  right: 0px;
  left: 0px;
  background: #00000080;
`;

const OverlayBackground = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  width: 80%;
`;

const Container = styled.div`
  width: 100%;
  z-index: 3;
  display: flex;
`;
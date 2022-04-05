import React from 'react'
import styled from 'styled-components'
import CloseIcon from '@mui/icons-material/Close';

function Overlay(props) {
  if (props.overlay) {
    return (
      <>
        <OverlayClose onClick={() => props.showOverlay()}></OverlayClose>
        <OverlayBackground>
          <Container>
            <HeaderContainer>
              <Header>{props.header}</Header>
              <StyledCloseIcon onClick={() => props.showOverlay()} />
            </HeaderContainer>
            {props.children}
          </Container>
        </OverlayBackground>
      </>
    )
  } else {
    return null
  }
}

export default Overlay

const StyledCloseIcon = styled(CloseIcon)({
  cursor: "pointer",
  fontSize: "1.05em"
});

const HeaderContainer = styled.div`
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Header = styled.div`
  font-weight: 600;
  font-size: 1.15em;
`;
const OverlayClose = styled.div`
  position: fixed;
  top: 0px;
  bottom: 0px;
  right: 0px;
  left: 0px;
  background: #00000080;
  z-index: 4;
`;
const OverlayBackground = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40%;
  z-index: 5;

  @media (max-width: 920px) {
    width: 80%;
  }
`;

const Container = styled.div`
  border-radius: 20px;
  background: white;
  width: 100%;
  padding: 40px;
  z-index: 5;
`;
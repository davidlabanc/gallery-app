import styled from 'styled-components'

export const LoadingText = styled.div`
  font-size: 1.5em;
  text-align: center;
`;

export const LoadingContainer = styled.div`
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  font-size: 1.75em;
  font-weight: 600;
  padding: 30px 0px;
  &::first-letter{
    text-transform: uppercase;
  }
`;

export const Description = styled.div`
  font-size: 1.15em;
  padding-bottom: 45px;
  &::first-letter{
    text-transform: uppercase;
  }
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
  ${props => props.last ? `aspect-ratio: 1/1` : null};
`;

export const Grid = styled.div`
  display: grid; 
  grid-template-columns: repeat(4,minmax(23%, 1fr)) ; 
  grid-template-rows: 1fr 1fr 1fr 1fr; 
  grid-auto-rows: 1fr;
  grid-template-areas: ". . . ."; 
  gap: 1vw 1vw;
  width: 100%;
  @media (max-width: 1200px) {
    grid-template-columns: 1fr 1fr 1fr; 
    grid-template-rows: 1fr 1fr 1fr; 
    grid-template-areas: ". . ."; 
  }
  @media (max-width: 750px) {
    grid-template-columns: 1fr 1fr; 
    grid-template-rows: 1fr 1fr; 
    grid-template-areas: ". ."; 
  }
  @media (max-width: 500px) {
    grid-template-columns: 1fr; 
    grid-template-rows: 1fr; 
    grid-template-areas: "."; 
  }
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

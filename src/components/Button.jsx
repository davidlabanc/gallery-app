import React from 'react'
import styled from 'styled-components'
import LoadingButton from '@mui/lab/LoadingButton';

function Button({ children, isLoading = false }) {
  return (
    <BootstrapButton
      type="submit"
      loading={isLoading}
      onSubmit={(event) => event.preventDefault()}
      loadingIndicator="Loading..."
    >
      {!isLoading && children}
    </BootstrapButton>
  )
}

export default Button

const BootstrapButton = styled(LoadingButton)`
  border-radius: 10px!important;
  background-color: black !important;
  color: white !important;
  padding: 10px 20px !important; 
  min-height: calc(2em + 20px)!important;
  font-weight: 600 !important;
  display: flex;
  align-items: center;
  margin-top: 20px!important;
  border: 2px solid black!important;
  position: relative;

  & .MuiLoadingButton-loadingIndicator{
    transform: none;
    position: relative;
    left: 0px;
    color: white;
    &:hover  {
      background-color: white !important;
      color: black!important
    };
  }
  &:hover  {
    background-color: white !important;
    color: black!important
  };
`

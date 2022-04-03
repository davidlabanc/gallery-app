import React, { useEffect, useCallback, useState } from 'react'
import styled from 'styled-components'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TextField from '@mui/material/TextField';

import { useFetch } from '../../../shared/hooks/fetch-hook';
import { useUI } from '../../../shared/hooks/ui-hook';

import { Header, Description, Grid, StyledForm, ItemContainer } from '../../../shared/styles/styles'
import Overlay from '../../../components/Overlay'
import Button from '../../../components/Button'
import Category from '../components/Category';
import Error from '../../../components/Error'
import FormError from '../../../components/FormError';
import Success from '../../../components/Success';

function Categories() {
  const { response, error, sendRequest, appendToResponse } = useFetch()
  const { response: addCategoryResponse, error: addCategoryError, isLoading: addCategoryLoading, sendRequest: addCategoryRequest } = useFetch()
  const { overlay, showOverlay } = useUI()
  const [formText, setFormText] = useState("")

  useEffect(() => {
    sendRequest({ url: "http://api.programator.sk/gallery", method: "GET" })
  }, [sendRequest])

  const onSubmit = useCallback(
    async (event) => {
      event.preventDefault()

      const text = formText.replace('/', '');

      const res = await addCategoryRequest({
        url: "http://api.programator.sk/gallery",
        method: "POST",
        data: { name: text }
      })
      if (res) {
        appendToResponse({ path: "galleries", data: [res] })
        setFormText('')
        showOverlay()
      }
    },
    [formText, addCategoryRequest, appendToResponse, showOverlay]
  )

  if (error) {
    return (<Error></Error>)
  }

  return (
    <>
      {addCategoryResponse && <Success message="Categória bola pridaná"></Success>}
      <Header>Fotogaléria</Header>
      <Description>Kategórie</Description>
      <Grid>
        {
          response?.galleries.map(({ image = undefined, name, path }) => (
            <Category key={name} image={image} name={name} path={path} />
          ))
        }
        <ItemContainer onClick={() => showOverlay()} last={response?.galleries.length > 0 ? false : true}>
          <StyledAddCircleOutlineIcon></StyledAddCircleOutlineIcon>
          <ItemContinerText>Pridať kategóriu</ItemContinerText>
        </ItemContainer>
      </Grid>
      <Overlay header="Pridať kategóriu" overlay={overlay} showOverlay={showOverlay} >
        <StyledForm onSubmit={onSubmit}>
          <StyledTextField
            required
            id="outlined-required"
            label="Required"
            defaultValue="Hello World"
            value={formText}
            onChange={(event) => setFormText(event.target.value)}
          />
          {addCategoryError?.status === 409 && <FormError>Zadaný názov sa už používa.</FormError>}
          {(addCategoryError?.status === 400 || addCategoryError?.status === 500) && <FormError>Ooops! Niečo sa pokazilo, skúste znovu neskôr.</FormError>}
          <Button isLoading={addCategoryLoading}>Pridať</Button>
        </StyledForm>
      </Overlay>
    </>
  )
}

export default Categories

const ItemContinerText = styled.div`
  font-size: 1em;
  text-align: center;
  padding: 10px;
`;

const StyledTextField = styled(TextField)({
  width: "100%!important",
});

const StyledAddCircleOutlineIcon = styled(AddCircleOutlineIcon)({
  fontSize: "4em!important",
  textAlign: "center",
  display: "block!important",
  width: "100%!important"
});


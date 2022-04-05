import React, { useEffect, useCallback, useContext, useState } from 'react'
import styled from 'styled-components'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";

import { useFetch } from '../../../shared/hooks/fetch-hook';
import { CategoriesContext } from '../../../shared/context/categories-context';
import { useUI } from '../../../shared/hooks/ui-hook';
import { url } from '../../../shared/constants/api';

import { Header, Description, Grid, StyledForm, ItemContainer } from '../../../shared/styles/styles'
import Overlay from '../../../components/Overlay'
import Button from '../../../components/Button'
import Category from '../components/Category';
import Error from '../../../components/Error'
import FormError from '../../../components/FormError';

function Categories() {
  const { error, sendRequest, appendToResponse } = useFetch()
  const { error: addCategoryError, isLoading: addCategoryLoading, sendRequest: addCategoryRequest } = useFetch()
  const { overlay, showOverlay } = useUI()
  const [formText, setFormText] = useState("")
  const { response: contextResponse, setResponse } = useContext(CategoriesContext)
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      if (!contextResponse) {
        const data = await sendRequest({ url: `${url}/gallery`, method: "GET" })
        setResponse(data)
      }
    }
    fetchData()
  }, [sendRequest, contextResponse, setResponse])

  const onSubmit = useCallback(
    async (event) => {
      event.preventDefault()

      const text = formText.replace('/', '');

      const res = await addCategoryRequest({
        url: `${url}/gallery`,
        method: "POST",
        data: { name: text }
      })
      if (res) {
        appendToResponse({ path: "galleries", data: [res] })
        setFormText('')
        showOverlay()
        navigate(`/gallery/${text}`)
      }
    },
    [formText, addCategoryRequest, appendToResponse, showOverlay, navigate]
  )

  if (error) {
    return (<Error></Error>)
  }

  return (
    <>
      <Header>Fotogaléria</Header>
      <Description>Kategórie</Description>
      <Grid>
        {
          contextResponse?.galleries?.map(({ image = undefined, name, path }) => (
            <Category key={name} image={image} name={name} path={path} />
          ))
        }
        <ItemContainer onClick={() => showOverlay()} last={contextResponse?.galleries?.length > 0 ? false : true}>
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


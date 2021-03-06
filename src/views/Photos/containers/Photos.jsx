import React, { useEffect, useCallback, useState } from 'react'
import styled from 'styled-components'
import { useParams, Link } from "react-router-dom";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Chip from '@mui/material/Chip';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import CircularProgress from '@mui/material/CircularProgress';

import { useFetch } from '../../../shared/hooks/fetch-hook';
import { useUI } from '../../../shared/hooks/ui-hook';
import { url } from '../../../shared/constants/api';

import { Header, ItemContainer, Grid, StyledForm, LoadingText, LoadingContainer } from '../../../shared/styles/styles'
import Overlay from '../../../components/Overlay'
import Button from '../../../components/Button'
import FormError from '../../../components/FormError'
import Error from '../../../components/Error'
import FileInput from '../../../components/FileInput'
import Success from '../../../components/Success'
import Photo from '../components/Photo'
import Gallery from '../components/Gallery'

function Photos() {
  const { response, isLoading, error, sendRequest, appendToResponse, deleteFromResponse } = useFetch()
  const { response: addPhotoResponse, error: addPhotoError, isLoading: addPhotoLoading, sendRequest: addPhotoRequest } = useFetch()
  const { response: deletePhotoResponse, error: deletePhotoError, isLoading: deletePhotoLoading, sendRequest: deletePhotoRequest } = useFetch()
  const { overlay, showOverlay } = useUI()
  const [files, setFiles] = useState([])
  const [startImage, setStartImage] = useState(null)
  const [deleteMode, setDeleteMode] = useState(false)

  const params = useParams()

  useEffect(() => {
    sendRequest({ url: `${url}/gallery/${params.id}`, method: "GET" })
  }, [params.id, sendRequest])

  const onSubmit = useCallback(
    async (event) => {
      event.preventDefault()

      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        const data = new FormData()
        data.append("image", file)

        const res = await addPhotoRequest({
          url: `${url}/gallery/${params.id}`,
          method: "POST",
          data: data,
          headers: {
            'Content-Type': "multipart/form-data"
          }
        })

        if (res) {
          appendToResponse({ path: "images", data: res.uploaded })
          setFiles([])
          showOverlay()
        }
      }
    },
    [files, params.id, addPhotoRequest, appendToResponse, showOverlay]
  )

  const onDelete = useCallback(
    async (event, image) => {
      event.preventDefault()

      const res = await deletePhotoRequest({
        url: `${url}/gallery/${image}`,
        method: "DELETE",
        headers: {
          'Content-Type': "multipart/form-data"
        }
      })

      if (res) {
        deleteFromResponse({ path: "images", item: image })
      }
    },
    [deleteFromResponse, deletePhotoRequest]
  )


  const handleDelete = useCallback(
    (name) => {
      const new_files = [...files]
      setFiles(new_files.filter((file) => file.name !== name))
    },
    [files]
  )

  if (isLoading) {
    return (
      <LoadingContainer>
        <CircularProgress color="inherit" />
        <LoadingText>Gal??ria sa na????tava...</LoadingText>
      </LoadingContainer>

    )
  }

  if (error && error.status === 404) {
    return (
      <>
        <StyledLink to="/">
          <ArrowBackIcon sx={{ paddingRight: "10px" }}></ArrowBackIcon>
          <Description>Hlavn?? str??nka</Description>
        </StyledLink>
        <Error>Ooops! H??adan?? stranka sa nena??la.</Error>
      </>
    )
  }

  if (error && error.status !== 404) {
    return (
      <>
        <StyledLink to="/">
          <ArrowBackIcon sx={{ paddingRight: "10px" }}></ArrowBackIcon>
          <Description>Hlavn?? str??nka</Description>
        </StyledLink>
        <Error></Error>
      </>
    )
  }

  return (
    <>
      {addPhotoResponse && <Success message="Obr??zky boli ??spe??ne pridan??."></Success>}
      {deletePhotoResponse && <Success message="Obr??zok bol ??spe??ne odstr??nen??."></Success>}
      <Header>Fotogal??ria</Header>
      <HeaderContainer>
        <StyledLink to="/">
          <ArrowBackIcon sx={{ paddingRight: "10px" }}></ArrowBackIcon>
          <Description>{response?.gallery?.name}</Description>
        </StyledLink>
        <FormControlLabel
          control={
            <Switch checked={deleteMode} label="M??d mazania" onChange={(event) => setDeleteMode(event.target.checked)} />
          }
          label="M??d mazanie"
        />
      </HeaderContainer>
      <Grid>
        {
          response?.images.map(({ fullpath, name }, index) => (
            <Photo
              key={name}
              index={index}
              image={fullpath}
              deleteMode={deleteMode}
              setStartImage={setStartImage}
              onDelete={onDelete}
              error={deletePhotoError}
              isLoading={deletePhotoLoading}
            />
          ))
        }
        <ItemContainer onClick={() => showOverlay()} last={response?.image?.length > 0 ? false : true}>
          <StyledAddCircleOutlineIcon ></StyledAddCircleOutlineIcon>
          <ItemContinerText>Prida?? fotky</ItemContinerText>
        </ItemContainer>
      </Grid>
      <Overlay header="Prida?? fotky" overlay={overlay} showOverlay={showOverlay}>
        <ChipContainer>
          {
            files.map((file) => (
              <Chip key={file.name} label={file.name} variant="outlined" onDelete={(() => handleDelete(file.name))} />
            ))
          }
        </ChipContainer>
        <StyledForm onSubmit={(event) => onSubmit(event)}>
          <FileInput files={files} setFiles={setFiles} />
          {addPhotoError?.status === 400 && <FormError>Nena??li sa ??iadne obr??zky.</FormError>}
          {addPhotoError?.status === 404 && <FormError>Gal??ria sa nena??la.</FormError>}
          {addPhotoError?.status === 500 && <FormError>Ooops! Nie??o sa pokazilo, sk??ste znovu nesk??r.</FormError>}
          <Button isLoading={addPhotoLoading}>Prida??</Button>
        </StyledForm>
      </Overlay>
      <Gallery startImage={startImage} setStartImage={setStartImage} images={response?.images}></Gallery>
    </>
  )
}

export default Photos

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 45px;
`;

const ChipContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  & div{
    margin: 6px;
  }
`;

const ItemContinerText = styled.div`
  font-size: 1em;
  text-align: center;
`;

const StyledAddCircleOutlineIcon = styled(AddCircleOutlineIcon)({
  fontSize: "4em!important",
  textAlign: "center",
  display: "block!important",
  width: "100%!important"
});

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  display: flex;
  align-items: center;
  width: max-content;
`;

const Description = styled.div`
  font-size: 1.15em;
  padding-left: 10px;
  &::first-letter{
    text-transform: uppercase;
  }
`;
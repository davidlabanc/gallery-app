import React, { useEffect, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import styled from 'styled-components'

import { DataContext } from './shared/context/data-context';
import { useFetch } from './shared/hooks/fetch-hook';
import { useData } from './shared/hooks/data-hook';
import { url } from './shared/constants/api';

import Categories from './views/Categories/containers/Categories'
import Photos from './views/Photos/containers/Photos'

function App() {
  const { sendRequest } = useFetch()
  const { sendRequest: getPhotos } = useFetch()
  const { setPhotos, setCategories, appendToResponse, deleteFromResponse, data } = useData()

  const addPhotos = useCallback(
    (gallery) => {
      let unmounted = false
      if (!unmounted)
        setPhotos(gallery)


    },
    [setPhotos]
  )

  useEffect(() => {
    const categories = data.categories
    let unmounted = false

    async function fetchData() {

      let res = await sendRequest({ url: `${url}/gallery`, method: "GET" })
      if (!unmounted) {
        setCategories(res.galleries)
      }
    }

    if (!categories && !unmounted) {
      fetchData()
    }

    return () => {
      unmounted = true;
    }

  }, [sendRequest, getPhotos, data, setCategories])

  useEffect(() => {
    const categories = data.categories

    if (categories && data.photos.length === 0) {

      async function fetchPhotos() {
        if (data.photos.length === 0) {

          let new_data = []

          for (let index = 0; index < categories.length; index++) {


            const element = categories[index];
            let res = await getPhotos({ url: `${url}/gallery/${element.name}`, method: "GET" })
            new_data = [...new_data, res]
            addPhotos(new_data)
          }
        }
      }

      fetchPhotos()
    }
  }, [data, addPhotos, getPhotos])

  let routes = (
    <Routes>
      <Route path="/gallery/:id" element={<Photos />} />
      <Route path="/" element={<Categories />} />
    </Routes>
  )

  return (
    <DataContext.Provider value={{
      appendToResponse, deleteFromResponse, data
    }}>
      <Container>
        {routes}
      </Container>
    </DataContext.Provider>
  );
}

export default App

const Container = styled.div`
  width: 70%;
  margin: 100px auto;
  @media (max-width: 920px) {
    box-sizing: border-box;
    width: 100%;
    max-width:100%;
    padding: 40px;
  }
`;
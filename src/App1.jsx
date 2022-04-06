import React, { Component } from 'react'
import { Routes, Route } from "react-router-dom";
import styled from 'styled-components'
import axios from 'axios'

import { url } from "./shared/constants/api";

export class App1 extends Component {
  constructor(props) {
    super(props)

    this.state = {
      categories: null,
      photos: null,
      isLoading: false,
      isLoadingPhotos: false,
      error: null
    }
  }

  fetch = async ({ url = undefined, method = "get", data = {} }) => {
    try {
      const res = await axios({ url, method, data });
      return res.data
    } catch (error) {
      this.setState({ error })
    }
  }

  shouldComponentUpdate(nextProps, nextState) {

  }

  componentDidMount() {
    if (!this.state.categories) {
      this.setState({ isLoading: true })
      const categories = fetch({ url: `${url}/gallery`, method: "GET" })
      this.setState({ categories })
    }


    for (let index = 0; index < categories.length; index++) {
      const element = categories[index];

      const photos = fetch({ url: `${url}/gallery/${element.name}`, method: "GET" })
      this.setState((prevState) => {
        return {
          ...prevState,
          photos: [...prevState.photos, photos]
        }
      })
    }
  }

  render() {
    let routes = (
      <Routes>
        <Route path="/gallery/:id" element={<Photos />} />
        <Route path="/" element={<Categories />} />
      </Routes>
    )

    return (
      <Container>
        {routes}
      </Container>
    )
  }
}

export default App1

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
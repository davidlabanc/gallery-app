import { useCallback, useState } from 'react'
import axios from 'axios'

export const useFetch = () => {
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const sendRequest = useCallback(
    async ({ url = undefined, method = "get", data = {} }) => {
      let unmounted = false, source = axios.CancelToken.source();

      if (!unmounted) {

        setError(null)
        setResponse(null)
        setIsLoading(true)

        try {
          const res = await axios({
            url,
            method,
            data,
            cancelToken: source.token,
            timeout: 5000
          });
          if (!unmounted) {
            setResponse(res.data)
            setIsLoading(false)
          }

          return res.data
        } catch (error) {
          if (!unmounted) {
            setError(error.response)
            setIsLoading(false)
          }
        }
      }

      return () => {
        unmounted = true;
        source.cancel("Cancelling in cleanup");
      }
    },
    [],
  )

  const appendToResponse = useCallback(
    ({ path, data }) => {
      if (data && path) {
        const new_response = { ...response }
        new_response[path].push(...data)
        setResponse(new_response)
      }
    },
    [response],
  )

  const deleteFromResponse = useCallback(
    ({ path, item }) => {
      if (item && path) {
        let new_array = response[path].filter((image) => image.fullpath !== item)

        setResponse({ ...response, [path]: new_array })
      }
    },
    [response, setResponse],
  )

  return { sendRequest, response, error, isLoading, appendToResponse, deleteFromResponse }
}
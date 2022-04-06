import { useCallback, useState } from 'react'

export const useData = () => {
  const [data, setData] = useState({
    categories: null,
    photos: []
  })

  const setCategories = useCallback(
    (categories) => {
      setData({ ...data, categories })
    },
    [data]
  )

  const setPhotos = useCallback(
    (photos) => {
      setData({ ...data, photos: [...photos]})
    },
    [data]
  )

  const appendToResponse = useCallback(
    ({ path, item }) => {
      if (item && path) {
        const new_response = { ...data }
        new_response[path].push(...item)
        setData(new_response)
      }
    },
    [data],
  )

  const deleteFromResponse = useCallback(
    ({ path, item }) => {
      if (item && path) {
        let new_array = data[path].filter((image) => image.fullpath !== item)

        setData({ ...data, [path]: new_array })
      }
    },
    [data],
  )

  return { setPhotos, setCategories, appendToResponse, deleteFromResponse, data}
}
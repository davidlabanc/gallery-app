import { useState, useEffect } from 'react';

import { loadImage } from '../utils/loadImage'

export const useProgressiveImage = (src, placeholder) => {
  const [image, setImage] = useState(null)
  const [place, setPlace] = useState(null)

  useEffect(() => {
    if (!src && !placeholder) {
      return
    }

    async function fetchPlaceholder() {
      try {
        const placeholder1 = await loadImage(placeholder)
        setPlace(placeholder1)
        setImage(null)
      } catch (error) {
        setPlace(error)
      }
    }

    async function fetchImage() {
      try {
        const img = await loadImage(src)
        setImage(img)
        setPlace(null)
      } catch (error) {
        setImage(error)
      }
    }

    let unmounted = false

    if (!unmounted) {
      fetchPlaceholder()
      fetchImage()
    }

    return () => {
      unmounted = true;
    }
  }, [src, placeholder])

  return { image, place }
}

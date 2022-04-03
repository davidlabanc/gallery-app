import { useState, useEffect } from 'react';

import { loadImage } from '../utils/loadImage'

export const useProgressiveImage = (src, placeholder) => {
  const [image, setImage] = useState(null)
  const [place, setPlace] = useState(null)

  useEffect(async () => {
    if (!src && !placeholder) {
      return
    }
    let unmounted = false

    if (!unmounted) {
      try {
        const placeholder1 = await loadImage(placeholder)
        setPlace(placeholder1)
        setImage(null)
      } catch (error) {
        setPlace(error)
      }

      try {
        const img = await loadImage(src)
        setImage(img)
        setPlace(null)
      } catch (error) {
        setImage(error)
      }
    }

    return () => {
      unmounted = true;
    }
  }, [src, placeholder])

  return { image, place }
}

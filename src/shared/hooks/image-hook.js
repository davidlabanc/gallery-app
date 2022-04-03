import { useState, useEffect } from 'react';

import { loadImage } from '../utils/loadImage'

export const useProgressiveImage = (src) => {
  const [image, setImage] = useState(null)

  useEffect(async() => {
    if (!src) {
      return
    }
    let unmounted = false

    if (!unmounted) {
      try {
        const img = await loadImage(src)
        setImage(img)
      } catch (error) {
        setImage(error)
      }

    }

    return () => {
      unmounted = true;
    }
  }, [src, image])

  return { image }
}

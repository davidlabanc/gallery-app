import { useState, useEffect } from 'react';

import { loadImage } from '../utils/loadImage'

export const useProgressiveImage = (src) => {
  const [image, setImage] = useState(null)

  useEffect(() => {
    if (!src) {
      return
    }

    async function fetchImage() {
      try {
        const img = await loadImage(src)
        setImage(img)
      } catch (error) {
        setImage(error)
      }
    }

    let unmounted = false

    if (!unmounted) {
      fetchImage()
    }

    return () => {
      unmounted = true;
    }
  }, [src, image])

  return { image }
}

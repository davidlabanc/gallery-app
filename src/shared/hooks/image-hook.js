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
        let unmounted = false

        const img = await loadImage(src)

        if (!unmounted) {
          setImage(img)
        }

        return () => {
          unmounted = true;
          img.cancel()
        }
      } catch (error) {
        if (!unmounted) {
          setImage(error)
        }
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

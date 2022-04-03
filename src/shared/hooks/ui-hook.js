import { useCallback, useState } from 'react'

export const useUI = () => {
  const [overlay, setOverlay] = useState(false)

  const showOverlay = useCallback(
    () => {
      setOverlay(!overlay)
    },
    [overlay],
  )

  return { overlay, showOverlay }
}
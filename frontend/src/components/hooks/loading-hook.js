import { useState } from 'react'

const useLoading = () => {
  const [loading, setLoading] = useState(false)

  function setLoad() {
    setLoading(true)
  }

  function unsetLoad() {
    setLoading(false)
  }

  return [loading, setLoad, unsetLoad]
}
export default useLoading

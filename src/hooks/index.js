import { useState } from "react"

const useField = (id, type) => {
  const [value, setValue] = useState("")

  return {
    id,
    type,
    value,
    onChange: ({ target }) => {
      setValue(target.value)
    },
  }
}

export default useField

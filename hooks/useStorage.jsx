//more info: https://youtu.be/vrIxu-kfAUo?si=9_2i6c0-osMc-or7&t=401

import { useCallback, useState, useEffect } from "react"


// export function useLocalStorage(key, defaultValue) {
//   return useStorage(key, defaultValue, window.localStorage)
// }

export function useLocalStorage(key, defaultValue) {
  return typeof window !== 'undefined' 
    ? useStorage(key, defaultValue, window.localStorage)
    : [defaultValue, () => {}, () => {}];
}

export function useSessionStorage(key, defaultValue) {
  return useStorage(key, defaultValue, window.sessionStorage)
}

function useStorage(key, defaultValue, storageObject) {
  const [value, setValue] = useState(() => {
    const jsonValue = storageObject.getItem(key)
    if (jsonValue != null) return JSON.parse(jsonValue)

    if (typeof defaultValue === "function") {
      return defaultValue()
    } else {
      return defaultValue
    }
  })

  useEffect(() => {
    if (value === undefined) return storageObject.removeItem(key)
    storageObject.setItem(key, JSON.stringify(value))
  }, [key, value, storageObject])

  const remove = useCallback(() => {
    setValue(undefined)
  }, [])

  return [value, setValue, remove]
}
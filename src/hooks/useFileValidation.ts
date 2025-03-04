import { useMemo } from 'react'

export const useFileValidation = (acceptedTypes: string[]) => {
  const validator = useMemo(() => {
    return {
      isValid: (file: File) => acceptedTypes.includes(file.type),
      getErrors: (file: File) => 
        !acceptedTypes.includes(file.type) ? ['Invalid file type'] : []
    }
  }, [acceptedTypes])

  return validator
}

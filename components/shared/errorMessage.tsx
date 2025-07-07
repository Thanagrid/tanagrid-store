import React from 'react'

const ErrorMessage = ({errors}: {errors: string}) => {
  return (
    <span className="text-sm text-red-500">{errors}</span>
  )
}

export default ErrorMessage

import React from 'react'

function ErrorComponent(prop) {
  const { error = 'Some error occured' } = prop
  return (
    <div>
      <h1>{error}</h1>
    </div>
  )
}

export default ErrorComponent

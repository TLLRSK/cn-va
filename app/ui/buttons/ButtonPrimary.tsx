import React from 'react'

function ButtonPrimary({text}: {text: string}) {
  return (
    <button className='bg-foreground  text-inverse text-sm font-regular py-sm px-md rounded-md uppercase'>{text}</button>
  )
}

export default ButtonPrimary
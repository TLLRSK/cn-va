import React, { Component } from 'react'

function ButtonSecondary({text = undefined, icon = undefined}: {text?: string; icon?: Component}) {
  return (
    <button className='w-fit bg-muted text-inverse text-sm font-regular py-sm px-md rounded-md uppercase'>{text}</button>
  )
}

export default ButtonSecondary;
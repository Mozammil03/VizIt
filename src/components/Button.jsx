import React from 'react'

const Button = ({name}) => {
  return (
    <div className='p-2 h-fit w-fit bg-green-950 text-white font-semibold shadow-2xl shadow-[#000000] rounded-lg hover:cursor-pointer select-none'>{name}</div>
  )
}

export default Button
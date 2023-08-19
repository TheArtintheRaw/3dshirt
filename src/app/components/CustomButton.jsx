'use client'

import React from 'react'
import { useSnapshot } from 'valtio'
import { useRouter } from 'next/navigation'

import state from '%/store'
import { getContrastingColor } from '%/config/helpers'

const CustomButton = ({ type, title, customStyles, handleClick, ...props }) => {
  const snap = useSnapshot(state)

  const generateStyle = (type) => {
    if (type === 'filled') {
      return {
        backgroundColor: snap.color,
        color: getContrastingColor(snap.color),
      }
    } else if (type === 'outline') {
      return {
        borderWidth: '1px',
        borderColor: snap.color,
        color: snap.color,
      }
    }
  }

  return (
    <button
      className={`flex-1 rounded-md px-2 py-1.5 ${customStyles}`}
      style={generateStyle(type)}
      onClick={handleClick}
      {...props}
    >
      {title}
    </button>
  )
}

export default CustomButton

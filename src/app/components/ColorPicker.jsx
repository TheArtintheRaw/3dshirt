import React from 'react'
import { useSnapshot } from 'valtio'
import state from '%/store'

export const colors = {
  '#111111': 'Black',

  '#4169E1': 'Royal',

  '#0D2241': 'Navy',

  '#B2BEB5': 'Ash',

  '#F4E4D6': 'Sand',

  '#FFB6C1': 'Light Pink',

  '#36454F': 'Charcoal',

  '#ee0717': 'Red',

  '#ffffff': 'White',

  '#E0D8C0': 'Natural',
}

const colorOptions = [
  { name: 'Black', color: '#111111' },
  { name: 'Royal', color: '#4169E1' },
  { name: 'Navy', color: '#0D2241' },
  { name: 'Ash', color: '#B2BEB5' },
  { name: 'Sand', color: '#F4E4D6' },
  { name: 'Light Pink', color: '#FFB6C1' },
  { name: 'Charcoal', color: '#36454F' },
  { name: 'Red', color: '#ee0717' },
  { name: 'White', color: '#ffffff' },
  { name: 'Natural', color: '#E0D8C0' },
]

const ColorPicker = () => {
  const snap = useSnapshot(state)

  const handleChange = (color) => {
    console.log('Selected color:', color)
    state.color = color
  }

  return (
    <div className='colorpicker-container'>
      {colorOptions.map((option) => (
        <div
          key={option.color}
          className={`mx-2 h-12 w-12 cursor-pointer rounded-full ${
            snap.color === option.color ? 'border-2 border-white' : ''
          }`}
          style={{ backgroundColor: option.color }}
          onClick={() => handleChange(option.color)}
        ></div>
      ))}
    </div>
  )
}

export default ColorPicker

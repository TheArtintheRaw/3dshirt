'use client'

import React, { useState } from 'react'

export function LogoControls({ onMove, onResize }) {
  const [decalPosition, setDecalPosition] = useState([0, 0, 0]) // Replace initial values as needed
  const [decalScale, setDecalScale] = useState([1, 1, 1])

  const changeDecalPosition = (newPosition) => {
    setDecalPosition(newPosition)
  }
  const changeDecalScale = (newScale) => {
    setDecalScale(newScale)
  } // Replace initial values as needed

  const handleButtonMouseDown = (e) => {
    e.stopPropagation()
  }

  const handleDivMouseEnter = (e) => {
    e.stopPropagation()
  }

  return (
    <div onMouseDown={handleButtonMouseDown} onMouseEnter={handleDivMouseEnter} className='decalcontrol-container'>
      <div>
        <h1>Logo Controls</h1>

        <div onMouseEnter={handleDivMouseEnter} className='flex flex-row'>
          <div onMouseEnter={handleDivMouseEnter} className='flex flex-col justify-center object-fill'>
            <div onMouseEnter={handleDivMouseEnter} className='justify-center p-1'>
              <button
                onMouseDown={handleButtonMouseDown}
                className='m-2 w-full justify-center rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700'
                onClick={() => onMove('up')}
                onChange={(e) => changeDecalPosition([decalPosition[0], e.target.value, decalPosition[2]])}
              >
                ↑
              </button>
              <button
                onMouseDown={handleButtonMouseDown}
                className='m-2 w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700'
                onClick={() => onMove('down')}
                onChange={(e) => changeDecalPosition([decalPosition[0], -e.target.value, decalPosition[2]])}
              >
                ↓
              </button>
            </div>
          </div>
          <div onMouseEnter={handleDivMouseEnter} className='flex flex-col items-center justify-center'>
            <div onMouseEnter={handleDivMouseEnter} className='items-center justify-center p-1'>
              <button
                onMouseDown={handleButtonMouseDown}
                className='m-2 w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700'
                onClick={() => onMove('right')}
                onChange={(e) => changeDecalPosition([e.target.value, decalPosition[1], decalPosition[2]])}
              >
                →
              </button>

              <button
                onMouseDown={handleButtonMouseDown}
                className='m-2 w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700'
                onClick={() => onMove('left')}
                onChange={(e) => changeDecalPosition([-e.target.value, decalPosition[1], decalPosition[2]])}
              >
                ←
              </button>
            </div>
          </div>
          <div onMouseEnter={handleDivMouseEnter} className='flex flex-col items-center justify-center'>
            <div onMouseEnter={handleDivMouseEnter} className='items-center justify-center p-1'>
              <button
                onMouseDown={handleButtonMouseDown}
                className='m-2 items-center justify-center rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
                onClick={() => onResize('+', changeDecalScale(decalScale))}
              >
                +
              </button>
              <button
                onMouseDown={handleButtonMouseDown}
                className='m-2 items-center justify-center rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
                onClick={() => onResize('-', changeDecalScale(decalScale))}
              >
                -
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

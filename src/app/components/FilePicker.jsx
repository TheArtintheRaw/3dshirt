'use client'

import React from 'react'

import CustomButton from './CustomButton'

const FilePicker = ({ file, setFile, readFile }) => {
  return (
    <div className='filepicker-container'>
      <div className='flex flex-1 flex-col'>
        <input id='file-upload' type='file' accept='image/*' onChange={(e) => setFile(e.target.files[0])} />
        <label htmlFor='file-upload' className='filepicker-label'>
          Upload File
        </label>

        <p className='mt-2 truncate text-xs text-gray-500'>{file ? file.name : 'No file selected'}</p>
      </div>

      <div className='mt-4 flex flex-wrap gap-3'>
        <CustomButton
          type='filled'
          title='Logo'
          handleClick={() => {
            if (!file) {
              alert('Please select a file first.')
              return
            }
            readFile('logo')
          }}
          customStyles='text-xs'
        />
      </div>
    </div>
  )
}

export default FilePicker

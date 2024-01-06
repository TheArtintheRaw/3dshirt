import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useSnapshot } from 'valtio'

import state from '%/store'

import { reader } from '%/config/helpers'
import { EditorTabs, FilterTabs, DecalTypes } from '%/config/constants'
import { fadeAnimation, slideAnimation } from '%/config/motion'
import {
  AIPicker,
  ColorPicker,
  CustomButton,
  FilePicker,
  SizePicker,
  Tab,
  DisplayStats,
  BuyButton,
  Modal,
} from '%/components'
import CreateOrder from './CreateOrder'

const Customizer = ({ ...props }) => {
  const snap = useSnapshot(state)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [file, setFile] = useState('')
  const [color, setColor] = useState('')
  const [prompt, setPrompt] = useState('')
  const [isDragEnabled, setDragEnabled] = useState(true);
  const [generatingImg, setGeneratingImg] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [activeEditorTab, setActiveEditorTab] = useState('')
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
  })

  // show tab content depending on the activeTab
  const generateTabContent = () => {
    if (!isOpen) return null
    switch (activeEditorTab) {
      case 'colorpicker':
        return <ColorPicker color={color} setColor={setColor} />
      case 'filepicker':
        return <FilePicker file={file} setFile={setFile} readFile={readFile} />
      case 'aipicker':
        return (
          <AIPicker prompt={prompt} setPrompt={setPrompt} generatingImg={generatingImg} handleSubmit={handleSubmit} />
        )
      case 'sizepicker':
        return <SizePicker />
      default:
        return null
    }
  }

  const handleClickOutside = (event) => {
    if (event.target.closest('.editortabs-container')) return
    setIsOpen(false)
  }

  useEffect(() => {
    window.addEventListener('click', handleClickOutside)
    return () => window.removeEventListener('click', handleClickOutside)
  }, [])

  const handleTabClick = (tabName) => {
    setIsOpen((prev) => !prev)
    setActiveEditorTab(tabName)
  }

  const handleSubmit = async (type) => {
    if (!prompt) return alert('Please enter a prompt')

    try {
      setGeneratingImg(true === payload)

      const response = await fetch('https://imager-zhu6.onrender.com/api/v1/dalle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          payload,
        }),
      })

      const data = await response.json()

      handleDecals(type, `data:image/png;base64,${data.photo}`)
    } catch (error) {
      alert(error)
    } finally {
      setGeneratingImg(false)
      setActiveEditorTab('')
    }
  }

  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type]

    state[decalType.stateProperty] = result

    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab)
    }
  }

  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case 'logoShirt':
        state.isLogoTexture = !activeFilterTab[tabName]
        break
      default:
        state.isLogoTexture = true
        break
    }

    // after setting the state, activeFilterTab is updated

    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName],
      }
    })
  }

  const readFile = (type) => {
    reader(file).then((result) => {
      handleDecals(type, result)
      setActiveEditorTab('')
    })
  }

  const handleModalClick = () => {
    setIsModalOpen((prev) => !prev)
  }

  const handleDnSClick = () => {
    setDragEnabled((prev) => !prev)
  }

  return (
    <AnimatePresence {...props}>
      {!snap.intro && (
        <>
          <motion.div key='custom' className='absolute top-0 left-0 z-10' {...slideAnimation('left')}>
            <div className='flex items-center min-h-screen'>
              <div className='editortabs-container tabs'>
                {EditorTabs.map((tab) => (
                  <Tab key={tab.name} tab={tab} handleClick={() => handleTabClick(tab.name)} />
                ))}

                {generateTabContent()}
              </div>
            </div>
          </motion.div>

          <motion.div className='absolute z-10 right-5 top-5' {...fadeAnimation}>
            <CustomButton
              type='filled'
              title='Go Back'
              handleClick={() => (state.intro = true)}
              customStyles='w-fit px-4 py-2.5 font-bold text-sm'
            />
          </motion.div>

          <motion.div className='absolute z-10 top-5 left-[50%]' {...fadeAnimation}>
          <CustomButton
              type='filled'
              title={`${!isDragEnabled ? 'Static' : 'Dynamic'}`}
              handleClick={handleDnSClick}
              customStyles='w-fit px-4 py-2.5 font-bold text-sm'
            />
            </motion.div>

          <motion.div className='absolute z-10 bottom-16 right-5' {...fadeAnimation}>
            <CustomButton
              type='filled'
              title={`${!isModalOpen ? 'Buy' : 'Close'}`}
              handleClick={handleModalClick}
              customStyles='w-fit px-4 py-2.5 font-bold text-sm'
            />

            <Modal isOpen={isModalOpen} handleClose={handleModalClick}>
              <BuyButton className='scale-[0.4] md:scale-[0.6] lg:scale-[0.8]' handleClick={CreateOrder} />
            </Modal>
          </motion.div>

          <motion.div className='filtertabs-container' {...slideAnimation('up')}>
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name]}
                handleClick={() => handleActiveFilterTab(tab.name)}
              />
            ))}
          </motion.div>

          <motion.div className='absolute left-0 z-50 bottom-16' {...slideAnimation('up')}>
            <DisplayStats />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Customizer

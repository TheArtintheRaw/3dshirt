'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSnapshot } from 'valtio'

import state from '%/store'
import { headContainerAnimation, headContentAnimation, headTextAnimation, slideAnimation } from '%/config/motion'
import { CustomButton } from '%/components'
import Image from 'next/image'

import Customizer from './Customizer'

export default function Page({ ...props }) {
  const snap = useSnapshot(state)

  if (!snap.intro) {
    return <Customizer {...props} />
  } else {
    return (
      <AnimatePresence>
        {snap.intro && (
          <motion.section className='home' {...slideAnimation('left')}>
            <motion.header {...slideAnimation('down')}>
              <Image
                src='3reblk.png'
                border='0'
                alt='logo'
                width={144}
                height={48}                
                priority
              />
            </motion.header>

            <motion.div className='home-content' {...headContainerAnimation}>
              <motion.div {...headTextAnimation}>
                <h1 className='head-text'>
                  <span className='text-white'>Dope Sh!rt</span> <br className='hidden xl:block' />
                </h1>
              </motion.div>
              <motion.div {...headContentAnimation} className='flex flex-col gap-5'>
                <p className='max-w-md text-base font-normal text-gray-300'>
                  Create your Dope Shirt. Order your Dope Sh!rt. Rock your Dope Sh!rt. With Dope Sh!rt,
                  defining your style starts with <strong>Dope Sh!rt</strong>
                </p>

                <CustomButton
                  type='filled'
                  title='Customize'
                  customStyles='w-fit px-4 py-25 font-bold text-sm z-70'
                  handleClick={() => {
                    state.intro = false
                  }}
                />
              </motion.div>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>
    )
  }
}

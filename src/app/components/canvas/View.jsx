'use client'

import { Suspense, useRef, useState } from 'react'
import { AccumulativeShadows, RandomizedLight, View as ViewImpl } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useSnapshot } from 'valtio'
import state from '%/store'
import { easing } from 'maath'
import { CustomButton } from '..'
import { fadeAnimation } from '%/config/motion'

export function Backdrop() {
  const shadows = useRef()

  useFrame((state, delta) => easing.dampC(shadows.current.getMesh().material.color, state.color, 0.25, delta))

  return (
    <Suspense fallback={null}>
      <AccumulativeShadows
        ref={shadows}
        temporal
        frames={60}
        alphaTest={0.85}
        scale={12}
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, -0.24]}
      >
        <RandomizedLight amount={4} radius={9} intensity={0.55} ambient={0.25} position={[5, 5, -10]} />
        <RandomizedLight amount={4} radius={5} intensity={0.25} ambient={0.55} position={[-5, 5, -9]} />
      </AccumulativeShadows>
    </Suspense>
  )
}

export function CameraRig({ children }) {
  const group = useRef();
  const snap = useSnapshot(state);
  const [isDragEnabled, setDragEnabled] = useState(true);

  useFrame((state, delta) => {
    const isBreakpoint = window.innerWidth <= 1260;
    const isMobile = window.innerWidth <= 600;

    // Set the initial position of the model
    let targetPosition = [0, 0, 2];

    if (snap.intro) {
      if (isBreakpoint) {
        targetPosition = [0, 0, 2];
      }

      if (isMobile) {
        targetPosition = [0, 0, 4];
      }
    } else if (isMobile) {
      targetPosition = [0, 0, 2.5];
    } else {
      targetPosition = [0, 0, 2];
    }

    // Set model camera position
    easing.damp3(state.camera.position, targetPosition, 0.25, delta);

    // Update rotation of the group only when left mouse button is pressed down
    function controlShirt(e) {
      if (isDragEnabled && e.buttons === 1 && group.current) {
        easing.dampE(group.current.rotation, [0, state.pointer.x, 0], 0.25, delta);
      }
      else if (!isDragEnabled && e.buttons === 1 && group.current) {
        return
      }
    }

    // Add and remove the event listener based on isDragEnabled
    if (isDragEnabled) {
      document.addEventListener('pointermove', controlShirt);
    } else {
      document.removeEventListener('pointermove', controlShirt);
    }
  });

  return <group ref={group}>{children}</group>;
}



export const DnsToggle = ({toggleDrag}) => {

          <CustomButton
              type='filled'
              title={`${!isDragEnabled ? 'Static' : 'Dynamic'}`}
              handleClick={toggleDrag}
              customStyles='w-fit px-4 py-2.5 font-bold text-sm'
            />

}

'use client'

import { Suspense, useRef } from 'react'
import { AccumulativeShadows, RandomizedLight, View as ViewImpl } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useSnapshot } from 'valtio'
import state from '%/store'
import { easing } from 'maath'

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
        scale={10}
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, -0.14]}
      >
        <RandomizedLight amount={4} radius={9} intensity={0.55} ambient={0.25} position={[5, 5, -10]} />
        <RandomizedLight amount={4} radius={5} intensity={0.25} ambient={0.55} position={[-5, 5, -9]} />
      </AccumulativeShadows>
    </Suspense>
  )
}

export function CameraRig({ children }) {
  const group = useRef()
  const snap = useSnapshot(state)

  useFrame((state, delta) => {
    const isBreakpoint = window.innerWidth <= 1260
    const isMobile = window.innerWidth <= 600

    // Set the initial position of the model
    let targetPosition = [0, 0, 2]
    if (snap.intro) {
      if (isBreakpoint) {
        targetPosition = [0, 0, 2]
      }

      if (isMobile) {
        targetPosition = [0, 0, 4]
      }
    } else if (isMobile) {
      targetPosition = [0, 0, 2.5]
    } else {
      targetPosition = [0, 0, 2]
    }

    // Set model camera position
    easing.damp3(state.camera.position, targetPosition, 0.25, delta)

    document.addEventListener('pointermove', controlShirt)
    // Update rotation of the group only when left mouse button is pressed down

    function controlShirt(e) {
      if (e.buttons === 1 && group.current) {
        easing.dampE(group.current.rotation, [0, state.pointer.x, 0], 0.25, delta)
      }
    }
  })

  return <group ref={group}>{children}</group>
}

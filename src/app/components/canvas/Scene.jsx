'use client'

import { Canvas } from '@react-three/fiber'
import { Center, Environment } from '@react-three/drei'
import { r3f } from '%/helpers/global'
import { Shirt } from './Examples'
import ImageBorder from './ImageBorder'
import { CameraRig, Backdrop } from './View'
import * as THREE from 'three'

export default function Scene({ ...props }) {
  // Everything defined in here will persist between route changes, only children are swapped
  return (
    <Canvas shadows camera={{ position: [0, 0, 0], fov: 25 }} gl={{ preserveDrawingBuffer: true }} {...props}>
      <ambientLight intensity={0.5} />
      <Environment files="/img/kloofendal_43d_clear_puresky_1k.hdr" background blur={0.5} />
      <CameraRig>
        <Backdrop />
        <ImageBorder />
        <Center>
          <Shirt />
        </Center>
      </CameraRig>
    </Canvas>
  )
}

Scene.displayName = 'Scene'

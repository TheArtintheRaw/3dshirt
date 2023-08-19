'use client'

import React, { useState, useLayoutEffect, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, useTexture, Decal, Html } from '@react-three/drei'
import { easing } from 'maath'
import { useSnapshot } from 'valtio'
import state from '%/store'
import * as THREE from 'three'
import { LogoControls } from './LogoControls'

export function Shirt(props) {
  const snap = useSnapshot(state)

  const decalTexture = useTexture(snap.logoDecal)
  const { nodes, materials } = useGLTF('/dpeshrt.glb')
  const [decalPosition, setDecalPosition] = useState(snap.logoPosition)
  const [decalScale, setDecalScale] = useState(snap.logoScale)

  useFrame((state, delta) => easing.dampC(materials.lambert1.color, snap.color, 0.25, delta))

  function getDecalPosition(state, positionDetails) {
    const { logoPosition, logoScale } = state
    const { area_width, area_height, width, height, top, left, limit_to_print_area } = positionDetails

    const shirtWidth = area_width
    const shirtHeight = area_height

    const maxDecalWidth = shirtWidth - width
    const maxDecalHeight = shirtHeight - height

    const decalWidth = width * logoScale[0]
    const decalHeight = height * logoScale[1]

    const decalTop = (top / area_height) * shirtHeight
    const decalLeft = (left / area_width) * shirtWidth

    const decalPosition = {
      top: decalTop,
      left: decalLeft,
    }

    const decalSize = {
      width: decalWidth,
      height: decalHeight,
    }

    if (
      decalLeft >= 0 &&
      decalLeft <= maxDecalWidth &&
      decalTop >= 0 &&
      decalTop <= maxDecalHeight &&
      decalWidth >= width &&
      decalHeight >= height
    ) {
      return {
        position: decalPosition,
        scale: decalSize,
      }
    }

    return null // Return null if decal position and scale are not valid
  }

  const maxBoundingArea = {
    minX: -0.07,
    maxX: 0.07,
    minY: -0.16,
    maxY: 0.15,
    minSize: 0.05,
    maxSize: 0.3,
  }

  const handleDivMouseEnter = (e) => {
    e.stopPropagation()
  }

  const shirtGeometry = nodes.T_Shirt_male.geometry
  shirtGeometry.computeBoundingBox()
  const shirtBoundingBox = shirtGeometry.boundingBox

  const shirtWidth = shirtBoundingBox.max.x - shirtBoundingBox.min.x
  const shirtHeight = shirtBoundingBox.max.y - shirtBoundingBox.min.y

  const padding = 0.1 // Padding around the edges of the shirt
  const maxDecalWidth = shirtWidth - padding
  const maxDecalHeight = shirtHeight - padding

  const aspectRatio = decalTexture?.image.width / decalTexture?.image.height

  const handleDecalMove = (direction) => {
    const moveAmount = 0.01
    const newDecalPosition = [...decalPosition]

    // Move the decal in the specified direction
    if (direction === 'left' && newDecalPosition[0] > maxBoundingArea.minX) {
      newDecalPosition[0] -= moveAmount
    } else if (direction === 'right' && newDecalPosition[0] < maxBoundingArea.maxX) {
      newDecalPosition[0] += moveAmount
    } else if (direction === 'up' && newDecalPosition[1] < maxBoundingArea.maxY) {
      newDecalPosition[1] += moveAmount
    } else if (direction === 'down' && newDecalPosition[1] > maxBoundingArea.minY) {
      newDecalPosition[1] -= moveAmount
    }

    if (
      newDecalPosition[0] >= maxBoundingArea.minX &&
      newDecalPosition[0] <= maxBoundingArea.maxX &&
      newDecalPosition[1] >= maxBoundingArea.minY &&
      newDecalPosition[1] <= maxBoundingArea.maxY
    ) {
      setDecalPosition(newDecalPosition)
    }
  }

  const handleDecalResize = (operation) => {
    const resizeAmount = 0.01
    let newDecalSize = [...decalScale] // Copy array

    if (operation === '+' && newDecalSize[0] < maxDecalWidth && newDecalSize[1] < maxDecalHeight) {
      newDecalSize[0] += resizeAmount
      newDecalSize[1] += resizeAmount / aspectRatio // Divide by aspect ratio to preserve aspect ratio
    } else if (
      operation === '-' &&
      newDecalSize[0] > maxBoundingArea.minSize &&
      newDecalSize[1] > maxBoundingArea.minSize
    ) {
      newDecalSize[0] -= resizeAmount
      newDecalSize[1] -= resizeAmount / aspectRatio // Divide by aspect ratio to preserve aspect ratio
    }

    if (
      newDecalSize[0] >= maxBoundingArea.minSize &&
      newDecalSize[0] <= maxBoundingArea.maxSize &&
      newDecalSize[1] >= maxBoundingArea.minSize &&
      newDecalSize[1] <= maxBoundingArea.maxSize
    ) {
      setDecalScale(newDecalSize)
    }
  }

  const [shirtPosition, setShirtPosition] = useState(null)
  useLayoutEffect(() => {
    if (nodes.T_Shirt_male) {
      const position = new THREE.Vector3()
      position.setFromMatrixPosition(nodes.T_Shirt_male.matrixWorld)
      setShirtPosition(position)
    }
  }, [nodes.T_Shirt_male])

  const stateString = JSON.stringify(snap)

  return (
    <group key={stateString}>
      {!snap.intro && shirtPosition && (
        <Html
          onMouseEnter={handleDivMouseEnter}
          position={[shirtPosition.x, shirtPosition.y + 0.2, shirtPosition.z]}
          translateZ={2}
        >
          <LogoControls onMouseEnter={handleDivMouseEnter} onMove={handleDecalMove} onResize={handleDecalResize} />
        </Html>
      )}
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
        {...props}
      >
        {snap.isLogoTexture && (
          <Decal
            position={decalPosition}
            scale={decalScale}
            rotation={[0, 0, 0]}
            opacity={1}
            map={decalTexture}
            depthTest={false}
            depthWrite={false}
          />
        )}
      </mesh>
    </group>
  )
}

/*
 * @Author: lvy lvy
 * @Date: 2023-03-26 16:08:26
 * @LastEditors: lvy lvy
 * @LastEditTime: 2023-03-27 23:07:23
 * @FilePath: /vfx-composer-examples/src/shader-editor/Scene/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useRef, useState, useEffect, useLayoutEffect } from 'react'
import { Canvas } from 'react-three-fiber'

import { GridHelper } from 'three'
import { OrbitControls, Select, useKeyboardControls } from '@react-three/drei'
import TransformControls from '../../core/TransformControls'
export default function Scene() {
  const groupRef = useRef()
  const [selected, setSelected] = useState(null)
  const [mesh, setMesh] = useState(groupRef.current)
  const transformRef = useRef()
  const [transformMode, setTransformMode] = useState('translate')

  // return (
  //   <div>
  //     <div ref={ref}>
  //       <h2>Hello</h2>
  //     </div>
  //   </div>
  // )
  // 在加载完毕后更新状态
  // useLayoutEffect(() => {
  //   console.log(meshRef.current, 'meshRef.current')
  // }, [])
  return (
    <>
      <Canvas
        onDoubleClick={(e) => e.preventDefault()}
        onClick={(e) => {
          setSelected(null)
        }}
        onContextMenu={(e) => e.preventDefault()}
        camera={{ fov: 35, position: [8, 13, 9], zoom: 0.9 }}
      >
        <OrbitControls
          enablePan={false}
          enableRotate={true}
          rotateSpeed={0.2}
          zoomSpeed={0.2}
          panSpeed={0.2}
          enabled={!selected}
        ></OrbitControls>
        <gridHelper args={[10000, 10000]} />
        <mesh
          ref={groupRef}
          onDoubleClick={(e) => {
            e.stopPropagation()
            setSelected(groupRef)
            setMesh(groupRef)
          }}
          onClick={(e) => {
            e.stopPropagation()
            setSelected(groupRef)
            setMesh(groupRef)
          }}
        >
          <boxGeometry />
          <meshBasicMaterial color={'red'} />
        </mesh>
        {selected && mesh && (
          <TransformControls
            mode={transformMode}
            onTargetChange={(e) => {
              console.log(e)
            }}
            target={groupRef.current}
          ></TransformControls>
        )}
      </Canvas>
    </>
  )
}

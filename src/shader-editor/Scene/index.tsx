/*
 * @Author: lvy lvy
 * @Date: 2023-03-26 16:08:26
 * @LastEditors: lvy lvy
 * @LastEditTime: 2023-03-30 14:37:41
 * @FilePath: /vfx-composer-examples/src/shader-editor/Scene/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, {
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
  ComponentProps,
} from 'react'
import VS from '../../core/ProxyManager'
import { Canvas, useThree } from 'react-three-fiber'
import InteriorPanel from '../Panels/InteriorPanel'
import THREE from 'three'
import { OrbitControls, Select, useKeyboardControls } from '@react-three/drei'
import TransformControls from '../../core/TransformControls'
import { useEditorStore, initCongin } from '../../core/store'

export default function Scene() {
  const groupRef = useRef()
  const [selected, setSelected] = useState(null)
  const createScene = initCongin()
  const [TransformControlsMode, scene] = useEditorStore((state) => [
    state.TransformControlsMode,
    state.scene,
  ])
  return (
    <>
      <InteriorPanel></InteriorPanel>
      <Canvas
        onCreated={({ scene }) =>
          useEditorStore.setState({
            scene: scene,
          })
        }
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
        <VS.Mesh name="test" ref={groupRef}>
          <boxGeometry />
          <meshBasicMaterial color={'red'} />
        </VS.Mesh>
        <VS.Mesh name="test" ref={groupRef}>
          <boxGeometry />
          <shaderMaterial
            // blending={THREE.CustomBlending}
            // blendSrc={THREE.SrcAlphaFactor}
            // blendDst={THREE.OneFactor}
            depthWrite={true}
            fragmentShader={''}
            vertexShader={''}
          />
        </VS.Mesh>

        {/* <mesh
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
        </mesh> */}
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

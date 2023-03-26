/*
 * @Author: lvy lvy
 * @Date: 2023-03-26 17:07:30
 * @LastEditors: lvy lvy
 * @LastEditTime: 2023-03-26 17:13:16
 * @FilePath: /vfx-composer-examples/src/shader-editor/Scene/Camera.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Canvas, extend, useThree, useFrame } from 'react-three-fiber'
import { useEffect, useRef } from 'react'

extend({ OrbitControls })

interface CameraProps {
  position?: [x: number, y: number, z: number]
  fov?: number
  near?: number
  far?: number
}

const Camera = ({
  position = [0, 0, 5],
  fov = 75,
  near = 0.1,
  far = 100,
}: CameraProps) => {
  const { aspect, setDefaultCamera } = useThree() as any
  const cameraRef = useRef<THREE.PerspectiveCamera>()

  useEffect(() => {
    if (cameraRef.current) {
      setDefaultCamera(cameraRef.current)
    }
  }, [setDefaultCamera])

  useFrame(({ gl, scene }) => {
    gl.render(scene, cameraRef.current!)
  })

  return (
    <perspectiveCamera
      ref={cameraRef}
      position={position}
      fov={fov}
      aspect={aspect}
      near={near}
      far={far}
    ></perspectiveCamera>
  )
}

export default Camera

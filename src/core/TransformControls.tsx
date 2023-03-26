/*
 * @Author: lvy lvy
 * @Date: 2023-03-26 21:40:16
 * @LastEditors: lvy lvy
 * @LastEditTime: 2023-03-26 23:59:48
 * @FilePath: /vfx-composer-examples/src/core/TransformControls.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Object3D, Event } from 'three'
import React, { forwardRef, useLayoutEffect, useEffect, useMemo } from 'react'
import { ReactThreeFiber, useThree, Overwrite } from 'react-three-fiber'
import { TransformControls as TransformControlsImpl } from '@react-three/drei'

export default function TransformControls({
  target,
  onTargetChange,
  onClick,
}: any) {
  console.log(target, 'target')
  return (
    <TransformControlsImpl
      object={target}
      mode="translate"
      enabled
      position={[0, 0, 0]}
      onObjectChange={onTargetChange}
      onClick={onClick}
    />
  )
}

/*
 * @Author: lvy lvy
 * @Date: 2023-03-26 21:39:59
 * @LastEditors: lvy lvy
 * @LastEditTime: 2023-03-30 02:24:13
 * @FilePath: /vfx-composer-examples/src/core/ProxyManager.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, {
  ComponentProps,
  JSXElementConstructor,
  RefAttributes,
} from 'react'
import { useThree } from 'react-three-fiber'
import { RotateY, type } from 'shader-composer'
import { Group, Mseh } from 'three'
import { useEditorStore } from './store'
interface Modle<T> {
  group: Group
  mesh: Mseh
  vfx: T
  shaderMesh: T
}
type ModelType = 'group' | 'mesh' | 'vfx' | 'shaderMesh'
const addComponentOtherObject = (_) => {
  return {
    userData: {
      _type: _,
    },
  }
}
const VS = <
  T extends JSXElementConstructor<any> | ModelType,
  U extends ModelType
>(
  Component: T,
  type: U
) => {
  return React.forwardRef(
    (
      props: ComponentProps<T> & { name: string } & RefAttributes<Modle<U>>,
      ref
    ) => {
      const [selected, setSelected] = useEditorStore((state) => [
        state.selected,
        state.setSelected,
      ])
      const { name, children } = props
      return (
        //@ts-ignore
        <Component
          onPointerOver={(e) => {
            e.stopPropagation()
            setSelected(ref)
          }}
          onPointerOut={(e) => {
            e.stopPropagation()
            setSelected(ref)
          }}
          ref={ref}
          {...props}
          {...addComponentOtherObject(type)}
        >
          {children}
        </Component>
      )
    }
  )
}

const createVS = <T extends ModelType>(type: T) => VS(type, type)

VS.Mesh = createVS('mesh')

export default VS

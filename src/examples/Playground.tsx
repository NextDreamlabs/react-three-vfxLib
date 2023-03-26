/*
 * @Author: lvy lvy
 * @Date: 2023-03-10 20:25:41
 * @LastEditors: lvy lvy
 * @LastEditTime: 2023-03-25 14:27:55
 * @FilePath: /vfx-composer-examples/src/examples/Playground.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { composable, modules } from 'material-composer-r3f'
import { Mul } from 'shader-composer'
import { FrameTime } from '../shader-composer-core'
import { Color } from 'three'

export default function Playground() {
  return (
    <group>
      <mesh>
        <sphereGeometry />
        <composable.meshStandardMaterial>
          <modules.Color color={Mul(new Color('hotpink'), FrameTime)} />
        </composable.meshStandardMaterial>
      </mesh>
    </group>
  )
}

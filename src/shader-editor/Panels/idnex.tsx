/*
 * @Author: lvy lvy
 * @Date: 2023-03-25 17:44:04
 * @LastEditors: lvy lvy
 * @LastEditTime: 2023-03-28 00:19:24
 * @FilePath: /vfx-composer-examples/src/shader-editor/Panels/idnex.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useRef } from 'react'
import { useTweaks } from 'use-tweaks'
export default function Panel() {
  const Ref = useRef(null)
  //@ts-ignore
  useTweaks(
    {
      myTweak: { value: 421, min: 0, max: 100 },
    },
    {
      container: Ref,
      global: false,
    }
  )

  return (
    <>
      <div ref={Ref}></div>
    </>
  )
}

/*
 * @Author: lvy lvy
 * @Date: 2023-03-10 20:25:41
 * @LastEditors: lvy lvy
 * @LastEditTime: 2023-03-25 14:13:50
 * @FilePath: /vfx-composer-examples/src/examples/units/NoiseMask.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { pipe } from 'fp-ts/function'
import {
  Add,
  Div,
  GlobalTime,
  Input,
  Mul,
  Negate,
  NormalizePlusMinusOne,
  OneMinus,
  Saturate,
  ScaleAndOffset,
  Smoothstep,
  Sub,
  UV,
} from 'shader-composer'
import { PSRDNoise2D } from '../../shader-composer-noise'

/* TODO: extract this into SC or SC-toybox or similar? */

export const NoiseMask = (
  threshold: Input<'float'> = 0.5,
  fringe: Input<'float'> = 0.5,
  time: Input<'float'> = GlobalTime
) => {
  const noise = NormalizePlusMinusOne(
    PSRDNoise2D(ScaleAndOffset(UV, [8, 8], [0, Negate(time)]))
  )

  return pipe(
    Smoothstep(
      Sub(threshold, Div(fringe, 2)),
      Add(threshold, Div(fringe, 2)),
      OneMinus(UV.y)
    ),
    (v) => Sub(v, Mul(noise, threshold)),
    Saturate
  )
}

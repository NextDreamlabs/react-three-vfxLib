/*
 * @Author: lvy lvy
 * @Date: 2023-03-10 20:25:41
 * @LastEditors: lvy lvy
 * @LastEditTime: 2023-03-25 14:29:54
 * @FilePath: /vfx-composer-examples/src/examples/effects/Aura.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useTexture } from '@react-three/drei'
import { MeshProps } from '@react-three/fiber'
import { Layer, LayerArgs } from 'material-composer'
import { composable, moduleComponent } from 'material-composer-r3f'
import { Alpha, Gradient, SurfaceWobble } from 'material-composer/modules'
import {
  GlobalTime,
  GradientStops,
  Input,
  Mul,
  ScaleAndOffset,
  Texture2D,
  Unit,
  UV,
} from 'shader-composer'
import { useUniformUnit } from 'shader-composer-r3f'
import { DoubleSide, RepeatWrapping } from 'three'
import streamTextureUrl from '../textures/stream.png'
import { NoiseMask } from '../units/NoiseMask'

export type AuraArgs = {
  gradient: GradientStops<'vec3'>
  texture: Unit<'sampler2D'>
  tiling?: Input<'vec2'>
  offset?: Input<'vec2'>
  fullness?: Input<'float'>
  wobble?: Input<'float'>
  time?: Input<'float'>
} & LayerArgs

export const AuraLayerModule = ({
  gradient,
  texture,
  wobble = 0,
  fullness = 0.5,
  tiling = [3, 1],
  offset = [0, 0],
  time = GlobalTime,
  ...layerArgs
}: AuraArgs) => {
  const heat = Texture2D(texture, ScaleAndOffset(UV, tiling, offset))

  return Layer({
    ...layerArgs,
    modules: [
      SurfaceWobble({ offset: time, amplitude: wobble }),
      Gradient({
        stops: gradient,
        start: 0,
        stop: 1,
        position: heat.alpha,
      }),
      Alpha({
        alpha: Mul(0.5, Mul(heat.alpha, NoiseMask(fullness, 0.5, time))),
      }),
    ],
  })
}

export const AuraLayer = moduleComponent(AuraLayerModule)

export const SphericalAura = ({
  ...props
}: Omit<AuraArgs, 'texture'> & MeshProps) => {
  /* Load texture */
  const streamTexture = useTexture(streamTextureUrl)
  streamTexture.wrapS = streamTexture.wrapT = RepeatWrapping

  /* Create a uniform that holds the texture */
  const textureUniform = useUniformUnit('sampler2D', streamTexture)

  return (
    <mesh {...props}>
      <sphereGeometry args={[1, 32, 16]} />

      <composable.meshBasicMaterial
        transparent
        side={DoubleSide}
        depthWrite={false}
      >
        <AuraLayer {...props} texture={textureUniform} />
      </composable.meshBasicMaterial>
    </mesh>
  )
}

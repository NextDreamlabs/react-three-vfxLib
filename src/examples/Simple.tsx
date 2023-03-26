import { useGLTF, useTexture } from '@react-three/drei'
import { composable, modules } from 'material-composer-r3f'
import { FlatStage } from 'r3f-stage'
import { between, plusMinus, upTo } from 'randomish'
import { OneMinus, Add, Mul, Smoothstep, Vec3 } from 'shader-composer'
import { AdditiveBlending, Vector3, Color } from 'three'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import {
  Emitter,
  InstancedParticles,
  useParticleAttribute,
  useParticleLifetime,
} from 'vfx-composer-r3f'
import { particleUrl } from './textures'
import { smokeUrl } from './textures/index'
import { dilie1 } from './textures/index'
import { dilie2 } from './textures/index'

const Dilie = () => {
  const texture = useTexture(dilie1)
  const lifetime = useParticleLifetime()
  const color = useParticleAttribute(() => new Color())
  const { nodes, materials } = useGLTF('/models/daoguang1.gltf') as GLTF & {
    nodes: any
  }
  const velocity = useParticleAttribute(() => new Vector3())
  return (
    <group>
      <mesh>
        <planeGeometry rotateX={100} rotateY={100} />
        <composable.meshStandardMaterial
          opacity={0.5}
          transparent
          color="#eee"
          map={texture}
          depthWrite={false}
          depthTest={true}
        ></composable.meshStandardMaterial>
      </mesh>
    </group>
  )
}
const Dilie1 = () => {
  const texture = useTexture(dilie2)
  const lifetime = useParticleLifetime()
  const color = useParticleAttribute(() => new Color())
  const { nodes, materials } = useGLTF('/models/daoguang1.gltf') as GLTF & {
    nodes: any
  }
  const velocity = useParticleAttribute(() => new Vector3())
  return (
    <group>
      <mesh>
        <planeGeometry rotateX={100} rotateZ={10} scale={0.1} />
        <composable.meshStandardMaterial
          opacity={0.5}
          transparent
          color="red"
          map={texture}
          depthWrite={false}
          depthTest={true}
        ></composable.meshStandardMaterial>
      </mesh>
    </group>
  )
}
export const Texiao = () => {
  return (
    <group>
      <planeGeometry scale={10}></planeGeometry>
      <group scale={2} rotation-x={-90}>
        <Dilie></Dilie>
        <Dilie1></Dilie1>
      </group>
      <group>
        <Simple></Simple>
      </group>
    </group>
  )
}
const Simple = () => {
  const texture = useTexture(smokeUrl)
  const lifetime = useParticleLifetime()
  const color = useParticleAttribute(() => new Color())
  const { nodes, materials } = useGLTF('/models/daoguang1.gltf') as GLTF & {
    nodes: any
  }
  const velocity = useParticleAttribute(() => new Vector3())
  return (
    <FlatStage>
      {/* All particle effects are driven by instances of <InstancedParticles>. */}
      <InstancedParticles capacity={150} safetyCapacity={10}>
        <planeGeometry />

        <composable.meshStandardMaterial
          opacity={0.5}
          transparent
          color="#red"
          map={texture}
          depthWrite={false}
          blending={AdditiveBlending}
          depthTest={true}
        >
          <modules.Color color={color} />
          <modules.Billboard />
          <modules.Scale scale={Add(Mul(lifetime.progress, 3), 0.5)} />
          <modules.Scale scale={Smoothstep(-0.5, 0.1, lifetime.progress)} />
          <modules.Alpha
            alpha={(alpha) => Mul(alpha, Smoothstep(1, 0.8, lifetime.progress))}
          />

          <modules.Velocity
            direction={Vec3([0, 10, 0])}
            time={lifetime.age}
            space="local"
          />
          <modules.Lifetime {...lifetime} />
        </composable.meshStandardMaterial>

        <Emitter
          rate={10}
          limit={100_10}
          setup={({ mesh, position, rotation, scale }) => {
            /* Randomize the instance transform */
            lifetime.write(mesh, between(3, 10))
            position.set(plusMinus(1), plusMinus(1), plusMinus(1))
            scale.setScalar(between(1, 3))
            color.write(mesh, (v) =>
              v.set('#666').multiplyScalar(Math.random())
            )
          }}
        />
      </InstancedParticles>
    </FlatStage>
  )
}

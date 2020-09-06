import React, { useRef } from 'react'
import { useGLTFLoader } from 'drei'
import { useTweaks, makeFolder } from 'use-tweaks'
import { useFrame } from 'react-three-fiber'

import { useNormalTexture, useMatcapTexture } from '../../dist'

interface SceneProps {
  stop: boolean;
}

export default function Scene(props: SceneProps) {
  const { stop } = props
  const ref = useRef<THREE.Mesh>()

  const { normIndex, matIndex, normRepeat, name, normScale } = useTweaks({
    ...makeFolder('Matcap', {
      matIndex: { value: 111, step: 1, min: 0, max: 666},
      name: ''
    }),
    ...makeFolder('Normal', {
      normIndex: { value: 1, step: 1, min: 0, max: 76 },
      normRepeat: { value: 9, min: 1, max: 10 },
      normScale: { value: 1, min: 0, max: 4 }
    })
  })

  const [normalTexture] = useNormalTexture(normIndex, { repeat: [normRepeat, normRepeat], anisotropy: 8 })
  const [matcapTexture] = useMatcapTexture(name.length > 0 ? name : matIndex, 1024)
  // @ts-expect-error
  const { nodes } = useGLTFLoader('/suzanne-draco.glb', true)

  useFrame(() => {
    if (stop || !ref.current) return
    ref.current.rotation.y += 0.01
  })

  return (
    <mesh ref={ref} geometry={nodes.Suzanne.geometry}>
      {/* @ts-ignore */}
      <meshMatcapMaterial normalScale={[normScale, normScale]} matcap={matcapTexture} normalMap={normalTexture}></meshMatcapMaterial>
    </mesh>
  )
}

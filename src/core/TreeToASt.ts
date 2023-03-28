/*
 * @Author: lvy lvy
 * @Date: 2023-03-28 23:55:05
 * @LastEditors: lvy lvy
 * @LastEditTime: 2023-03-29 00:01:01
 * @FilePath: /vfx-composer-examples/src/core/TreeToASt.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useThree } from 'react-three-fiber';
import { Object3D } from 'three';

export function useTreeTraverse() {
  const _scene = useThree()
  console.log(_scene, '_scene_scene')
}
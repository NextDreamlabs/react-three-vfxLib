/*
 * @Author: lvy lvy
 * @Date: 2023-03-27 01:30:34
 * @LastEditors: lvy lvy
 * @LastEditTime: 2023-03-27 01:46:33
 * @FilePath: /vfx-composer-examples/src/core/store.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import create, { StateCreator } from 'zustand';
import {
  DefaultLoadingManager,
  Matrix4,
  Object3D,
  Scene,
  WebGLRenderer,
} from 'three';
export type TransformControlsModeType = 'translate' | 'rotate' | 'scale';
export type TransformControlsSpaceType = 'world' | 'local';


export type StoreType = {
  scene: Scene | null | undefined,
  sceneSnapshot: Scene | null | undefined,
}

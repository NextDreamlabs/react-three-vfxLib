/*
 * @Author: lvy lvy
 * @Date: 2023-03-25 17:44:04
 * @LastEditors: lvy lvy
 * @LastEditTime: 2023-03-30 15:58:37
 * @FilePath: /vfx-composer-examples/src/shader-editor/Panels/idnex.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useEffect, useRef, useLayoutEffect } from 'react'
import { useTweaks } from 'use-tweaks'
import { useEditorStore } from '../../core/store'
import { Panle } from '../Style'
import React, { useState } from 'react'
import { Tree } from 'antd'
import type { DataNode, TreeProps } from 'antd/es/tree'
import { Scene } from 'three'
import ClickableWithMenu from './DoubleMenu'
function test(scene: Scene) {
  const ast: AstNode = {
    type: 'Scene',
    children: [],
  }

  scene.traverse((object: Object3D) => {
    const node: AstNode = {
      type: object.type,
      props: {},
    }

    // 将对象的属性转换为AST节点的props
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        const value = object[key]

        if (typeof value !== 'function') {
          node.props[key] = value
        }
      }
    }

    // 将对象添加到场景的AST节点中
    ast.children.push(node)
  })
}
export default function TreePanel() {
  const [scene, init, sceneState] = useEditorStore((state) => [
    state.scene,
    state.init,
    state.sceneState,
  ])
  test(scene)
  console.log(scene, 'scene======>>>>>>>>>>')
  const fieldNames = {
    key: 'uuid',
    title: 'name',
    children: 'children',
  }

  return (
    <>
      <div>
        <ClickableWithMenu>
          <div style={{ height: '100vh' }}>
            <Tree
              className="draggable-tree"
              fieldNames={fieldNames}
              draggable
              blockNode
              treeData={null}
            />
          </div>
        </ClickableWithMenu>
      </div>
    </>
  )
}

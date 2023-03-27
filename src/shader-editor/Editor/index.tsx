/*
 * @Author: lvy lvy
 * @Date: 2023-03-25 16:22:20
 * @LastEditors: lvy lvy
 * @LastEditTime: 2023-03-28 01:47:32
 * @FilePath: /vfx-composer-examples/src/shader-editor/Editor/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import * as React from 'react'
import { SortablePane, Pane } from 'react-sortable-pane'
import Panel from '../Panels/idnex'
import Scene from '../Scene'
import GridLayout from 'react-grid-layout'
import { Body } from '../Style'
import { useRef } from 'react'
import { useTweaks } from 'use-tweaks'
import TreePanel from '../Panels/TreePanel'
import Compoments from '../Panels/Compoments'

import { Layout, Space } from 'antd'

const { Header, Footer, Sider, Content } = Layout
export default function Editor() {
  document.body.style.backgroundColor = '#fff'
  document.body.style.color = '#333333'

  const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#fff',
  }

  const siderStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#fff',
  }

  return (
    <>
      <Body>
        <Layout style={{ height: '100vh' }}>
          <Sider style={siderStyle}>
            <TreePanel></TreePanel>
          </Sider>
          <Content style={contentStyle}>
            <Scene></Scene>
          </Content>
          <Sider style={siderStyle}>
            <Compoments></Compoments>
          </Sider>
        </Layout>
      </Body>
    </>
  )
}

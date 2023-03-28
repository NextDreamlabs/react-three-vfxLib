/*
 * @Author: lvy lvy
 * @Date: 2023-03-25 17:44:04
 * @LastEditors: lvy lvy
 * @LastEditTime: 2023-03-28 20:35:07
 * @FilePath: /vfx-composer-examples/src/shader-editor/Panels/idnex.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useRef } from 'react'
import styled from 'styled-components'
import { useTweaks } from 'use-tweaks'
import { useEditorStore } from '../../core/store'
import { Radio, Space, Card } from 'antd'

export default function InteriorPanel() {
  const [TransformControlsMode] = useEditorStore((state) => [
    state.TransformControlsMode,
  ])
  const FiexdCard = styled.div`
    top: 10px;
    left: 240px;
    position: absolute;
    z-index: 9999;
    height: 30px;
    text-align: center;
    color: #333;
    line-height: 30px;
  `
  return (
    <>
      <FiexdCard>
        <Card>
          <Radio.Group
            onChange={({ target }) => {
              useEditorStore.setState({
                TransformControlsMode: target.value as any,
              })
            }}
            value={TransformControlsMode}
          >
            <Space direction="horizontal">
              {['translate', 'rotate', 'scale'].map((_) => (
                <Radio value={_}>{_}</Radio>
              ))}
            </Space>
          </Radio.Group>
        </Card>
      </FiexdCard>
    </>
  )
}

/*
 * @Author: lvy lvy
 * @Date: 2023-03-10 20:25:41
 * @LastEditors: lvy lvy
 * @LastEditTime: 2023-03-27 00:05:37
 * @FilePath: /vfx-composer-examples/src/App.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Application, Description, Example, Heading } from 'r3f-stage'
import 'r3f-stage/styles.css'
import AsteroidExample from './examples/Asteroid'
import ControlledParticlesExample from './examples/ControlledParticles'
import { FireflyExample } from './examples/FireflyExample'
import { FogExample } from './examples/FogExample'
import MagicWellExample from './examples/MagicWellExample'
import Playground from './examples/Playground'
import SharedResourceExample from './examples/SharedResourceExample'
import { Texiao } from './examples/Simple'
import { SoftParticlesExample } from './examples/SoftParticlesExample'
import { Stress } from './examples/Stress'
import { Vanilla } from './examples/Vanilla'
import Editor from './shader-editor/Editor'

export default () => <Editor></Editor>

/*
 * @Author: lvy lvy
 * @Date: 2023-03-10 20:25:41
 * @LastEditors: lvy lvy
 * @LastEditTime: 2023-03-24 16:21:21
 * @FilePath: /composer-suite/packages/shader-composer-core/src/expressions.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { glslRepresentation } from "./glslRepresentation"
//todo :
const zip = (a: TemplateStringsArray, b: any[]) => a.map((k, i) => [k, b[i]])

export type Expression = {
  _: "Expression"
  values: any[]
  render: () => string
  toString: () => string
}
// 模版函数用来处理模版
export const glsl = (strings: TemplateStringsArray, ...values: any[]): Expression => {
  const render = () =>
    zip(
      strings,
      values.map((v) => glslRepresentation(v))
    )
      .flat()
      .join("")
  return {
    _: "Expression",
    values,
    render,
    toString: render
  }
}

/** A shortcut for the `glsl` tagged template literal helper. */
export const $ = glsl

export function isExpression(v: any): v is Expression {
  return v && v._ === "Expression"
}

/*
 * @Author: lvy lvy
 * @Date: 2023-03-30 16:07:45
 * @LastEditors: lvy lvy
 * @LastEditTime: 2023-03-30 16:12:59
 * @FilePath: /vfx-composer-examples/tailwind.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],

}

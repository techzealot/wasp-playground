import { defineConfig } from 'vite'
import { codeInspectorPlugin } from 'code-inspector-plugin';

export default defineConfig({
  server: {
    open: true,
  },
  //浏览器快速跳转至IDE插件
  plugins: [
    codeInspectorPlugin({
      bundler: 'vite',
    }),
  ],
})

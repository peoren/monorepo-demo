import { type ConfigEnv, type UserConfigExport, loadEnv } from 'vite'
import path, { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import svgLoader from 'vite-svg-loader'
import viteCompression from 'vite-plugin-compression'
import { createHtmlPlugin } from 'vite-plugin-html'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import DefineOptions from 'unplugin-vue-define-options/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import { viteMockServe } from 'vite-plugin-mock'
//mock
const localEnabled = process.env.USE_MOCK === 'true' || false
/** 配置项文档：https://cn.vitejs.dev/config */
export default (configEnv: ConfigEnv): UserConfigExport => {
  const env = loadEnv(configEnv.mode, process.cwd()) as ImportMetaEnv
  const { VITE_PUBLIC_PATH } = env
  return {
    /** 打包时根据实际情况修改 base */
    base: VITE_PUBLIC_PATH,
    resolve: {
      alias: {
        /** @ 符号指向 src 目录 */
        '@': resolve(__dirname, './src')
      }
    },
    server: {
      /** 是否开启 HTTPS */
      https: false,
      /** 设置 host: true 才可以使用 Network 的形式，以 IP 访问项目 */
      host: true,
      /** 端口号 */
      port: 9528,
      /** 是否自动打开浏览器 */
      open: true,
      /** 跨域设置允许 */
      cors: true,
      /** 端口被占用时，是否直接退出 */
      strictPort: false,
      /** 接口代理 */
      proxy: {
        // '/api': {
        //   target: 'https://172.16.16.208:9527/',
        //   ws: true,
        //   /** 是否允许跨域 */
        //   changeOrigin: true,
        //   rewrite: path => path.replace('', '')
        // }
      }
    },
    build: {
      /** 启用/禁用 控制台 gzip 压缩大小报告 */
      reportCompressedSize: false,
      /** 规定触发警告的 chunk 大小，单位 kB */
      chunkSizeWarningLimit: 800,
      /** Vite 2.6.x 以上需要配置 minify: 'terser', terserOptions 才能生效 */
      minify: 'terser',
      /** 在打包代码时移除 console.log、debugger 和 注释 */
      terserOptions: {
        compress: {
          drop_console: false,
          drop_debugger: true,
          // 配置删除项
          pure_funcs: ['console.log']
        },
        format: {
          /** 删除注释 */
          comments: false
        }
      },
      /** 打包后静态资源目录 */
      assetsDir: 'static'
    },
    /** css 处理 */
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import '@/styles/mixins.scss';
          `,
          javascriptEnabled: true
        }
      }
    },
    /** Vite 插件 */
    plugins: [
      vue(),
      vueJsx(),
      /** 将 SVG 静态图转化为 Vue 组件 */
      svgLoader(),
      /** SVG */
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/icons/svg')],
        symbolId: 'icon-[dir]-[name]'
      }),
      /** DefineOptions 可以更简单的注册组件名称 */
      DefineOptions(),
      /** index.html 加入 ejs 模板功能：https://github.com/vbenjs/vite-plugin-html */
      createHtmlPlugin(),
      /** 自动导入图标 */
      Icons({
        compiler: 'vue3',
        autoInstall: true,
        customCollections: {
          // 给svg文件设置fill="currentColor"属性，使图标的颜色具有适应性
          svg: FileSystemIconLoader('src/icons/svg', svg => svg.replace(/^<svg /, '<svg fill="currentColor" '))
        }
      }),
      /** 自动按需引入 */
      AutoImport({
        dts: './types/auto-imports.d.ts',
        /** 自动导入函数 */
        imports: ['vue', 'vue/macros'],
        resolvers: [
          /** 自动按需导入 Element Plus 相关函数，比如 ElMessage (带样式) */
          ElementPlusResolver()
        ],
        /** 根据自动按需导入的相关 API，生成 .eslintrc-auto-import.json 文件供 Eslint 识别 */
        eslintrc: {
          enabled: true, // 默认 false
          filepath: './types/.eslintrc-auto-import.json', // 默认 './.eslintrc-auto-import.json'
          globalsPropValue: true // 默认 true (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        }
      }),
      Components({
        dts: './types/components.d.ts',
        resolvers: [
          /** 自动按需导入 Element Plus 组件 */
          ElementPlusResolver(),
          /** 自动注册图标组件 */
          IconsResolver({
            prefix: 'icon',
            alias: {
              system: 'system-uicons'
            },
            customCollections: ['svg']
          })
        ]
      }),
      /** gzip 压缩 */
      viteCompression({
        // 是否禁用
        disable: false,
        // 大于该阈值则压缩,单位 B
        threshold: 1024 * 500
      }),
      /** mock */
      viteMockServe({
        mockPath: './mock',
        supportTs: true, //如果使用 js发开，则需要配置 supportTs 为 false
        localEnabled,
        prodEnabled: false
      })
    ]
  }
}

import react from '@vitejs/plugin-react';
import { loadEnv } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import postcss from './postcss.config.js';

// https://vitejs.dev/config/
export default ({mode}) => {
  console.log('mode', mode)
  const env = loadEnv(mode, process.cwd())
  console.log('env', env)
  return {
    define: {
      'process.env': process.env,
      REACT_APP_BACKEND_URL: process.env.REACT_APP_BACKEND_URL,
      REACT_APP_SANDBOX_SDK: process.env.REACT_APP_SANDBOX_SDK,
      VITE_BACKEND_URL: process.env.VITE_BACKEND_URL,
      VITE_SANDBOX_SDK: process.env.VITE_SANDBOX_SDK
    },
    css: {
      postcss,
    },
    plugins: [
      react(),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            title: env.VITE_MY_FOO,
            REACT_APP_BACKEND_URL: env.REACT_APP_BACKEND_URL,
            REACT_APP_SANDBOX_SDK: env.REACT_APP_SANDBOX_SDK,
            VITE_BACKEND_URL: env.VITE_BACKEND_URL,
            VITE_SANDBOX_SDK: env.VITE_SANDBOX_SDK
          }
        }
      }),
    ],
    resolve: {
      alias: [
        {
          find: /^~.+/,
          replacement: (val) => {
            return val.replace(/^~/, "");
          },
        },
      ],
    },
    build: {
      commonjsOptions: {
        transformMixedEsModules: true,
      }
    }
  }
}

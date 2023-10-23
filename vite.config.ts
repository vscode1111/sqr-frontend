// import replace from '@rollup/plugin-replace';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const config = require('./config');
console.log(111, config, process.env.NODE_ENV);
const isProduction = process.env.NODE_ENV === 'prod';

const evnDict = {
  dev: 'development',
  development: 'development',
  prod: 'production',
  production: 'production',
};

// https://vitejs.dev/config/
export default defineConfig({
  mode: 'production',
  plugins: [
    react(),
    tsconfigPaths(),
    //ToDo: Fix to set clean Production into NODE_ENV, currently it builds in Development mode
    // replace({
    //   preventAssignment: true,
    //   'process.env.NODE_ENV': JSON.stringify('production'),
    // }),
  ],
  define: {
    // 'process.env.NODE_ENV': JSON.stringify(evnDict[process.env.NODE_ENV ?? 'prod']),
    // 'process.env.NODE_ENV': JSON.stringify('production'),
    'process.env.production': isProduction,
    'process.env.host': JSON.stringify(config.host),
  },
  build: {
    chunkSizeWarningLimit: 1000,
    // rollupOptions: {
    //   output: {
    //     manualChunks(id: any) {
    //       if (id.includes('node_modules')) {
    //         return id.toString().split('node_modules/')[1].split('/')[0].toString();
    //       }
    //     },
    //   },
    // },
  },
});

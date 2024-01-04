// import replace from '@rollup/plugin-replace';
import react from '@vitejs/plugin-react-swc';
import { UserConfig, defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import envConfig from './config';
import { EnvironmentConfig } from './src/types';

const config: EnvironmentConfig = envConfig;

console.log(111, config);

const isProduction = process.env.NODE_ENV === 'prod';

const extConfig: UserConfig = isProduction
  ? {
      server: {
        host: '0.0.0.0',
        port: 80,
        watch: {
          ignored: ['**/**'],
        },
      },
    }
  : {};

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
    'process.env.oktaClientId': JSON.stringify(config.oktaClientId),
    'process.env.oktaIssuer': JSON.stringify(config.oktaIssuer),
    'process.env.oktaRedirectUri': JSON.stringify(config.oktaRedirectUri),
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
  ...extConfig,
} as UserConfig);

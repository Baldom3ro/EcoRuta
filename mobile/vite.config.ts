import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  define: {
    global: 'window',
    __DEV__: true,
  },
  resolve: {
    alias: [
      {
        find: 'react-native-safe-area-context',
        replacement: path.resolve(__dirname, 'src/shims/react-native-safe-area-context.web.js'),
      },
      {
        find: 'react-native-svg',
        replacement: path.resolve(__dirname, 'src/shims/react-native-svg.web.tsx'),
      },
      {
        find: 'react-native-screens',
        replacement: path.resolve(__dirname, 'src/shims/react-native-screens.web.js'),
      },
      {
        find: 'react-native/Libraries/Utilities/codegenNativeComponent',
        replacement: 'react-native-web',
      },
      {
        find: 'react-native/Libraries/ReactNative/AppContainer',
        replacement: 'react-native-web',
      },
      {
        find: 'react-native',
        replacement: 'react-native-web',
      },
    ],
    extensions: [
      '.web.tsx',
      '.web.ts',
      '.web.jsx',
      '.web.js',
      '.tsx',
      '.ts',
      '.jsx',
      '.js',
    ],
  },
});

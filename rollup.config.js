import { defineConfig } from 'rollup';
import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default defineConfig({
  input: './index.ts',
  output: [
    {
      file: './dist/index.cjs.js',
      format: 'cjs',
    },
    {
      file: './dist/index.es.js',
      format: 'es',
    },
  ],
  external: ['mysql'],
  plugins: [typescript(), commonjs(), resolve()],
});

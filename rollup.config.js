import typescript from 'rollup-plugin-typescript2'
import glslify from 'rollup-plugin-glslify'
import postcss from 'rollup-plugin-postcss'

import pkg from './package.json'

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
      strict: false,
    },
  ],
  plugins: [
    typescript({ objectHashIgnoreUnknownHack: true }),
    glslify(),
    postcss({
      modules: true,
    }),
  ],
  external: [
    'react',
    'react-dom',
    'three',
    '@react-three/fiber',
    '@react-three/drei',
    '@react-three/postprocessing',
  ],
}

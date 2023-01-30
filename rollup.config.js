import rollupTypescript from '@rollup/plugin-typescript'
import rollupNodeResolve from '@rollup/plugin-node-resolve'
import rollupBabel from '@rollup/plugin-babel'
import rollupAlias from '@rollup/plugin-alias'
import rollupJson from '@rollup/plugin-json'
import rollupCommonjs from '@rollup/plugin-commonjs'



const plugins = [
  rollupBabel({
    babelrc: false,
    babelHelpers: 'bundled',
    exclude: /node_modules/,
    presets: [
      [
        'env',
        {
          modules: false
        }
      ]
    ],
    rules: {
      '@typescript-eslint/ban-ts-comment': 2
    }
  }),
  // rollupNodeResolve(),
  rollupAlias(),
  rollupJson(),
  rollupTypescript(),
  rollupCommonjs()
]


const buildOptions = {
  input:['src/index.ts'],
  output:[
    {
      dir:'dist/es',
      format:'esm'
    },
    {
      dir:'dist/cjs',
      format:'cjs'
    }
  ],
  external:[],
  plugins
}

export default buildOptions
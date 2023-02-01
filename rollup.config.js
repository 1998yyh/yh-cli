import rollupTypescript from '@rollup/plugin-typescript'
import rollupBabel from '@rollup/plugin-babel'
import rollupAlias from '@rollup/plugin-alias'
import rollupJson from '@rollup/plugin-json'
import rollupCommonjs from '@rollup/plugin-commonjs'
import rollupCleaner from 'rollup-plugin-cleaner'
import rollupNodeResolve from '@rollup/plugin-node-resolve'
import hashbang from "rollup-plugin-hashbang";
import glob from 'glob'


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
    },
    plugins:[
      '@babel/plugin-transform-modules-commonjs'
    ]
  }),
  rollupNodeResolve(),
  rollupAlias(),
  // 处理json 转化为 esmodule
  rollupJson(),
  // 编译typescript
  rollupTypescript(),
  // esmodule 转化为 commonjs
  rollupCommonjs(),
  // 处理文件顶部 #!/usr/bin/env node
  hashbang.default()
]

const entries = glob.sync('./lib/*.ts')


const buildOptions = [{
  input: ['src/index.ts'],
  output: [{
    file: 'dist/index.cjs',
    format: 'cjs'
  }],
  plugins: [
    rollupCleaner({
      targets: ['./dist']
    }),
    ...plugins
  ]
}, {
  input: entries,
  output: [{
    dir: 'dist/lib',
    format: 'cjs'
  }],
  plugins
}]

export default buildOptions
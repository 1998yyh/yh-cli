// 简易版 起服务测试ts
import ts from 'rollup-plugin-typescript2'
import {nodeResolve} from '@rollup/plugin-node-resolve';
import serve from 'rollup-plugin-serve';
import path from 'path'
export default {
    input:'src/index.ts',
    output:{
        format:'iife', // umd, esm, cjs iife 
        file:path.resolve('dist/bundle.js'), 
        sourcemap:true
    },
    plugins:[
        nodeResolve({
            extensions:['.js','.ts']
        }),
        ts({
            tsconfig:path.resolve(__dirname,'tsconfig.json')
        }),
        serve({
            open:true,
            openPage:'/public/index.html',
            port:3000,
            contentBase:'' // 表示以根目录为基准
        })
    ]
}
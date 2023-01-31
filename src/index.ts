#!/usr/bin/env node
const { Command } = require('commander')
const packageJson  = require('../package.json')
const program = new Command()
const inquirer = require('inquirer')


program.version(packageJson.version, '-v, --version', '@calmer/terminal-cli 当前版本')

program.on('help',()=>{
  console.log('help')
})

// 解析用户执行命令传入的参数
program.parse(process.argv)
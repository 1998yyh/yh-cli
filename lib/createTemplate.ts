// lib/create.js

const path = require('path')
const fs = require('fs-extra')
const inquirer = require('inquirer')


module.exports = async function (name: string, options: Record<string, any>) {
  // 执行创建命令
  console.log(
    'fs',fs
  )
  // 当前命令行选择的目录
  const cwd  = process.cwd();
  // 需要创建的目录地址
  const targetAir  = path.join(cwd, name)

  // 目录是否已经存在？
  console.log(targetAir,targetAir)
}


export {}
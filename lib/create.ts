// lib/create.js

const path = require('path')
const fs = require('fs-extra')
const figlet  = require('figlet')
const inquirer = require('inquirer')

console.log(inquirer,figlet)

module.exports = async function (name: string, options: Record<string, any>) {
  // 执行创建命令

  // 当前命令行选择的目录
  const cwd  = process.cwd();
  // 需要创建的目录地址
  const targetAir  = path.join(cwd, name)

  // 目录是否已经存在？
  if (fs.existsSync(targetAir)) {

    // 是否为强制创建？
    if (options.force) {
      await fs.remove(targetAir)
    } else {
      
      // TODO：询问用户是否确定要覆盖
    }
  }else{
    console.log('创建')
  }
}


export {}
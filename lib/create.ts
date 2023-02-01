// lib/create.js

const path = require('path')
const fs = require('fs-extra')
const inquirer = require('inquirer')
const Generator = require('./generator.js')


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
      // 询问用户是否确定要覆盖
      const { action } = await inquirer.prompt([
        {
          name: 'action',
          type: 'list',
          message: '检查到当前目录已存在,是否要覆盖',
          choices: [
            {
              name: '覆盖',
              value:true
            },{
              name: '取消',
              value: false
            }
          ]
        }
      ])

      // 覆盖当前
      if(action){
        console.log(`\r\nRemoving...`)
        await fs.remove(targetAir)
      }
    }
  }else{
    const generator = new Generator(name,targetAir);
    generator.create();
    console.log('创建')
  }
}


export {}
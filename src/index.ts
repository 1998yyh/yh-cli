#!/usr/bin/env node
const { Command } = require('commander')
const program = new Command()
const inquirer = require('inquirer')
const chalk = require('chalk')
const spawn = require('cross-spawn')

// 配置版本号信息
program
  .version(`v${require('../package.json').version}`)
  .usage('<command> [option]')


// 创建项目
program
  .command('create <app-name>')
  .description('create a new project')
  .action((name:string, options: Record<string, any>) => {
    // 打印执行结果
    require('./lib/create.js')(name,options)
  })
  

// 这块是去测试
program
  .command('install')
  .description('print debugging information about your environment')
  .action(() => {
    // 定义需要按照的依赖
    const dependencies = ['vue', 'vuex', 'vue-router'];
    // 执行安装
    const child = spawn('npm', ['install', '-D'].concat(dependencies), {
      stdio: 'inherit'
    });

    // 监听执行结果
    child.on('close', function (code: number) {
      // 执行失败
      if (code !== 0) {
        console.log(chalk.red('Error occurred while installing dependencies!'));
        process.exit(1);
      }
      // 执行成功
      else {
        console.log(chalk.cyan('Install finished'))
      }
    })
  })

// 本地环境信息
program
  .command('info')
  .description('print debugging information about your environment')
  .action(() => {
    require('envinfo').run(
      {
        System: ['OS', 'CPU'],
        Binaries: ['Node', 'Yarn', 'npm'],
        Browsers: ['Chrome', 'Edge', 'Firefox', 'Safari'],
        npmPackages: '/**/{typescript,*vue*,@vue/*/}',
        npmGlobalPackages: ['@vue/cli']
      },
      {
        showNotFound: true,
        duplicates: true,
        fullTree: true
      }
    ).then(console.log)
  })

program.on('command:*', () => {
  console.log('command')
})


program.on('--help', () => {
  console.log();
  console.log(`  Run ${chalk.cyan(`vue <command> --help`)} for detailed usage of given command.`)
  console.log()
})

// 解析用户执行命令传入的参数
program.parse(process.argv)
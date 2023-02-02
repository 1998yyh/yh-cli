// lib/Generator.js

const wrapLoading = require('./loading.js')
const downloadGitRepo = require('download-git-repo')
const { getRepoList, gitBranchList } = require('./http.js')
const inquirer = require('inquirer')
const chalk = require('chalk')
const util = require('util')
const path = require('path')


class Generator {
  name: string;
  targetDir: string;
  downloadGitRepo = util.promisify(downloadGitRepo)

  constructor(name: string, targetDir: string) {
    // 目录名称
    this.name = name;
    // 创建位置
    this.targetDir = targetDir;
  }

  async getRepo() {
    
    const repoList = await wrapLoading(getRepoList, '正在获取模板信息');
    if (!repoList) return;

    // 过滤我们需要的模板名称
    const repos = repoList.map((item: Record<string, any>) => item.name);

    // 选择自己使用的模板
    const { repo } = await inquirer.prompt({
      name: 'repo',
      type: 'list',
      choices: repos,
      message: '请选择对应模板构建项目'
    })

    return repo;
  }


  async getBranch(repo: string) {
    // 基于 repo 结果，远程拉取对应的 tag 列表
    const branches = await wrapLoading(gitBranchList, 'waiting fetch tag', repo);
    if (!branches) return;

    // 过滤我们需要的 tag 名称
    const branchesList = branches.map((item: Record<string, any>) => item.name);

    // 2）用户选择自己需要下载的 tag
    const { branch } = await inquirer.prompt({
      name: 'tag',
      type: 'list',
      choices: branchesList,
      message: '请选择对应分支构建项目'
    })

    // 3）return 用户选择的 tag
    return branch
  }

  async download(repo: string, tag: string) {
    // 1）拼接下载地址
    const requestUrl = `1998yyh/${repo}${tag ? 'tree' + tag : ''}`;
    // 2）调用下载方法
    await wrapLoading(
      this.downloadGitRepo, // 远程下载方法
      'waiting download template', // 加载提示信息
      requestUrl, // 参数1: 下载地址
      path.resolve(process.cwd(), this.targetDir)) // 参数2: 创建位置
  }

  async create() {
    // 获取模板名称
    const repo = await this.getRepo()
    // 获取tag
    const tag = await this.getBranch(repo)
    // 下载对应模板
    await this.download(repo,tag)
    // 模板使用提示
    console.log(`\r\nSuccessfully created project ${chalk.cyan(this.name)}`)
    console.log(`\r\n  cd ${chalk.cyan(this.name)}`)
    console.log('  npm run dev\r\n')
  }
}

module.exports = Generator;

export { };
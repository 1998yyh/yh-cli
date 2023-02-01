// lib/Generator.js

const wrapLoading = require('./loading.js')
const { getRepoList } = require('./http.js')
const inquirer = require('inquirer')


class Generator {
  name: string;
  targetDir: string;

  constructor(name: string, targetDir: string) {
    // 目录名称
    this.name = name;
    // 创建位置
    this.targetDir = targetDir;
  }

  // 获取用户选择的模板
  // 1）从远程拉取模板数据
  // 2）用户选择自己新下载的模板名称
  // 3）return 用户选择的名称

  async getRepo() {
    // 1）从远程拉取模板数据
    const repoList = await wrapLoading(getRepoList, '正在获取模板信息');
    if (!repoList) return;

    // 过滤我们需要的模板名称
    const repos = repoList.map((item:Record<string,any>) => item.name);

    // 2）用户选择自己新下载的模板名称
    const { repo } = await inquirer.prompt({
      name: 'repo',
      type: 'list',
      choices: repos,
      message: 'Please choose a template to create project'
    })

    // 3）return 用户选择的名称
    return repo;
  }

  // 核心创建逻辑
  // 1）获取模板名称
  // 2）获取 tag 名称
  // 3）下载模板到模板目录
  async create() {

    // 1）获取模板名称
    const repo = await this.getRepo()

    console.log('用户选择了，repo=' + repo)
  }

}

module.exports = Generator;

export { };
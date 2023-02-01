// lib/http.js

// 通过 axios 处理请求
const axios = require('axios')

interface resData {
  data:Record<string,any>;
  [key:string]:any;
}

axios.interceptors.response.use((res:resData) => {
  return res.data;
})


/**
 * 获取模板列表
 * @returns Promise
 */
async function getRepoList() {
  return axios.get('https://api.github.com/orgs/zhurong-cli/repos')
}

/**
 * 获取版本信息
 * @param {string} repo 模板名称
 * @returns Promise
 */
async function  getTagList(repo:string) {
  return axios.get(`https://api.github.com/repos/zhurong-cli/${repo}/tags`)
}

module.exports = {
  getRepoList,
  getTagList
}

export {};
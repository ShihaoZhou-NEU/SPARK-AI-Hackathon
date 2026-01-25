#!/usr/bin/env node

/**
 * 本地测试脚本 - 模拟 GitHub Actions 环境
 */

// 模拟的 Issue Body（从新 Issue 模板复制）
const testIssueBody = `**Name [姓名]:** 张三

**ContactMethod [联系方式]:**
WeChat: zhangsan123

**Wallet Address [钱包地址]:**
0x123...abc

**WantsTeam [组队意愿]:** 是

**Introduction [个人介绍]:** 前端开发者，熟悉 React 和 web3.js

**Comment [备注]:** 下午在线`;

// 设置环境变量
process.env.ISSUE_BODY = testIssueBody;
process.env.ISSUE_USER = 'zhangsan';
process.env.GITHUB_OUTPUT = '/dev/null';

console.log('=== 本地测试开始 ===\n');
console.log('模拟 Issue Body:');
console.log(testIssueBody);
console.log('\n=================\n');

// 运行脚本
require('./materials/scripts/signup_extract.js');

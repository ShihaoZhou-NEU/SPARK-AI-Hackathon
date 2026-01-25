/**
 * @file generate_mocks.js
 * @description Generates mock data for local testing of update_readme.js
 */

const fs = require('fs');
const path = require('path');

const registrations = [
    {
        number: 1,
        title: "[报名] Test User 1",
        body: "**Name [姓名]:** Test User 1\n**ContactMethod [联系方式] (格式: Telegram: @username，微信: username，邮箱: email@example.com):** TG: @test1\n**WantsTeam [组队意愿（是/否）]:** Yes\n**Comment [备注]:** Frontend dev",
        author: { login: "testuser1" },
        url: "https://github.com/test/issue/1",
        createdAt: "2023-01-01T10:00:00Z"
    },
    {
        number: 2,
        title: "[报名] Test User 2",
        body: "**Name [姓名]:** Test User 2\n**ContactMethod [联系方式] (格式: Telegram: @username，微信: username，邮箱: email@example.com):** WeChat: user2\n**WantsTeam [组队意愿（是/否）]:** No\n**Comment [备注]:** Designer",
        author: { login: "testuser2" },
        url: "https://github.com/test/issue/2",
        createdAt: "2023-01-02T12:00:00Z"
    },
    {
        number: 3,
        title: "[报名] New Challenger",
        body: "**Name [姓名]:** New Challenger\n**ContactMethod [联系方式] (格式: Telegram: @username，微信: username，邮箱: email@example.com):** email: challenger@example.com\n**WantsTeam [组队意愿（是/否）]:** Yes\n**Comment [备注]:** Ready to hack!",
        author: { login: "challenger_007" },
        url: "https://github.com/test/issue/3",
        createdAt: "2026-01-25T14:45:00Z"
    }
];

const submissions = [
    {
        number: 101,
        title: "[提交] Awesome Project",
        body: "**ProjectName [项目名称]:** Awesome Project\n**Brief description [一句话简介]:** An AI agent for hackathons\n**Github Repo Link [Github 地址]:** https://github.com/test/awesome-project\n**Track [赛道]:** LLM Application",
        author: { login: "dev_lead" },
        url: "https://github.com/test/issue/101",
        createdAt: "2023-01-20T09:00:00Z"
    }
];

// Write to root directory
fs.writeFileSync('registrations.json', JSON.stringify(registrations, null, 2));
fs.writeFileSync('submissions.json', JSON.stringify(submissions, null, 2));

console.log('Mock data generated: registrations.json, submissions.json');

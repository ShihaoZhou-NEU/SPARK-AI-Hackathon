const parser = require('./materials/scripts/utils/field-parser');

const testBody = `**Name [姓名]:** 测试用户

**ContactMethod [联系方式] (格式: Telegram: @username，微信: username，邮箱: email@example.com):** WeChat: test_user

**WantsTeam [组队意愿（是/否）]:** 是`;

const result = parser.parseIssueFields(testBody);

console.log('Parsed fields:');
Object.keys(result).forEach(key => {
    console.log(`  "${key}": "${result[key]}"`);
});

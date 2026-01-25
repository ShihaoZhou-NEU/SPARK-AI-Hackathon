/**
 * 通用字段解析工具
 * Common field parsing utilities for issue body and file content
 */

/**
 * 解析 Issue Body 中的字段
 * @param {string} bodyString - Issue body 内容
 * @returns {Object} 解析后的字段对象
 */
function parseIssueFields(bodyString) {
    const lines = bodyString.split('\n').map(l => l.trim());
    const fields = {};
    let currentKey = null;
    let currentValue = [];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // 检查是否是新字段（以 ** 开头且包含冒号）
        const isFieldLine = line.startsWith('**') && (line.includes(':') || line.includes('：'));

        if (isFieldLine) {
            // 保存之前的字段
            if (currentKey) {
                fields[currentKey] = currentValue.join('\n').trim();
            }

            // 解析新字段
            const colonIndex = line.indexOf(':') !== -1 ? line.indexOf(':') : line.indexOf('：');
            let key = line.slice(0, colonIndex).trim();
            let value = line.slice(colonIndex + 1).trim();

            // 去掉 ** 标记
            key = key.replace(/^\*\*/, '').replace(/\*\*$/, '');
            value = value.replace(/^\*\*\s*/, '').replace(/\s*\*\*$/, '');

            currentKey = key;
            currentValue = value ? [value] : [];
        } else if (currentKey && line && !line.startsWith('_') && !line.startsWith('---')) {
            // 累积多行值（跳过提示行）
            currentValue.push(line);
        }
    }

    // 保存最后一个字段
    if (currentKey) {
        fields[currentKey] = currentValue.join('\n').trim();
    }

    return fields;
}

/**
 * 从文件内容中解析指定字段
 * @param {string} content - 文件内容
 * @param {string} fieldName - 字段名称
 * @returns {string} 字段值
 */
function parseFieldFromContent(content, fieldName) {
    const lines = content.split('\n');
    const pattern = `**${fieldName}**:`;

    for (const line of lines) {
        if (line.startsWith(pattern)) {
            return line.slice(pattern.length).replace(/\s+$/, '').trim();
        }
    }

    return '';
}

module.exports = {
    parseIssueFields,
    parseFieldFromContent
};

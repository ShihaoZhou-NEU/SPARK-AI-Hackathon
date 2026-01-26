/**
 * 通用字段解析工具
 * Common field parsing utilities for issue body and file content
 */

/**
 * 解析 Issue Body 中的字段
 * 支持新格式：**FieldName** (description) 后跟 > 符号，内容在 > 后
 * @param {string} bodyString - Issue body 内容
 * @returns {Object} 解析后的字段对象
 */
function parseIssueFields(bodyString) {
    const lines = bodyString.split('\n');
    const fields = {};
    let currentKey = null;
    let collectingValue = false;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        // 检测字段行：**FieldName** (description)
        const fieldMatch = line.match(/^\*\*([A-Za-z\s]+)\*\*/);

        if (fieldMatch) {
            // 找到新字段
            currentKey = fieldMatch[1].trim();
            collectingValue = false;
            fields[currentKey] = '';
        } else if (currentKey && line.startsWith('>')) {
            // 找到值的开始标记
            collectingValue = true;
            const value = line.substring(1).trim();
            if (value) {
                fields[currentKey] = value;
            }
        } else if (collectingValue && line && !line.startsWith('**') && !line.startsWith('#')) {
            // 继续收集多行值
            if (fields[currentKey]) {
                fields[currentKey] += '\n' + line;
            } else {
                fields[currentKey] = line;
            }
        } else if (line.startsWith('**') || line.startsWith('#')) {
            // 遇到新的标题或字段，停止收集
            collectingValue = false;
        }
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
    const pattern = `${fieldName}:`;

    for (const line of lines) {
        if (line.trim().startsWith(pattern)) {
            return line.slice(line.indexOf(':') + 1).trim();
        }
    }

    return '';
}

module.exports = {
    parseIssueFields,
    parseFieldFromContent
};

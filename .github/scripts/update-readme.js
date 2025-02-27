import fs from 'node:fs'

// 读取数据
const providersData = JSON.parse(fs.readFileSync('data/providers.json', 'utf8'));
const readmeTemplate = fs.readFileSync('README.template.md', 'utf8');

// 生成供应商表格
const providersTable = providersData.providers.map(p => {
  return `| ${p.name} | ${p.models.map(m => m.name).join(', ')} |`;
}).join('\n');

// 更新 README
const newReadme = readmeTemplate.replace('{{PROVIDERS_TABLE}}', providersTable);
fs.writeFileSync('README.md', newReadme);
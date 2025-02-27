import fs from 'node:fs'

try {
  // 读取数据
  const providersData = JSON.parse(fs.readFileSync('data/providers.json', 'utf8'));
  
  // 生成完整的 README 内容
  const readmeContent = `# AI Provider List

最后更新: ${new Date().toISOString().split('T')[0]}

## 支持的供应商

| 供应商 | 支持的模型 |
| ------ | ---------- |
${providersData.providers.map(p => `| ${p.name} | ${p.models.map(m => m.name).join(', ')} |`).join('\n')}

## 如何贡献

1. Fork 本仓库
2. 更新 \`data/providers.json\`
3. 提交 Pull Request
`;

  // 写入文件
  fs.writeFileSync('README.md', readmeContent);
  console.log('README.md 更新成功！');
  console.log('新的内容：');
  console.log(readmeContent);
} catch (error) {
  console.error('更新失败：', error);
  process.exit(1);
}
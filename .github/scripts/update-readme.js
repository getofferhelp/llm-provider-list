import fs from 'node:fs'

try {
  // 读取数据
  const providersData = JSON.parse(fs.readFileSync('data/providers.json', 'utf8'));
  const readmeContent = fs.readFileSync('README.md', 'utf8');

  // 生成供应商表格
  const providersTable = providersData.providers.map(p => {
    return `| ${p.name} | ${p.models.map(m => m.name).join(', ')} |`;
  }).join('\n');

  // 获取当前时间
  const updateTime = new Date().toISOString().split('T')[0];

  // 更新 README
  let newReadme = readmeContent.replace(/\{\{PROVIDERS_TABLE\}\}/g, providersTable);
  newReadme = newReadme.replace(/\{\{UPDATE_TIME\}\}/g, updateTime);

  // 写入文件
  fs.writeFileSync('README.md', newReadme);
  console.log('README.md 更新成功！');
} catch (error) {
  console.error('更新失败：', error);
  process.exit(1);
}
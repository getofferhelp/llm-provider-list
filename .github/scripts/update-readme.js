const fs = require('node:fs');

try {
  // 读取数据
  const providersData = JSON.parse(fs.readFileSync('data/providers.json', 'utf8'));
  
  // 生成完整的 README 内容
  const readmeContent = `# AI Provider List

> 一个全面的 AI 模型供应商列表，帮助开发者快速了解和选择合适的 AI 服务。

![GitHub last commit](https://img.shields.io/github/last-commit/getofferhelp/ai-provider-list)
![GitHub](https://img.shields.io/github/license/getofferhelp/ai-provider-list)

## 📊 支持的供应商

下面列出了目前支持的 AI 服务供应商及其模型信息。最后更新时间：${new Date().toISOString().split('T')[0]}

| 供应商 | 支持的模型 |
| :--- | :--- |
${providersData.providers.map(p => `| **${p.name}** | ${p.models.map(m => `\`${m.name}\``).join(', ')} |`).join('\n')}

## 🌟 特点

- 实时更新的供应商信息
- 包含详细的模型支持列表
- 开源维护，社区驱动

## 🤝 如何贡献

我们欢迎任何形式的贡献！参与方式：

1. Fork 本仓库
2. 更新 \`data/providers.json\`
3. 提交 Pull Request

## 📝 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

## 📬 联系我们

如有问题或建议，欢迎：
- 提交 [Issue](https://github.com/getofferhelp/ai-provider-list/issues)
- 发起 [Pull Request](https://github.com/getofferhelp/ai-provider-list/pulls)
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
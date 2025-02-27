const fs = require('node:fs');

try {
  // 读取数据
  const providersData = JSON.parse(fs.readFileSync('data/providers.json', 'utf8'));
  
  // 生成完整的 README 内容
  const readmeContent = `# AI Provider List

一个全面的 AI 模型供应商列表，帮助开发者快速了解和选择合适的 AI 服务。

## 📊 支持的供应商

下面列出了目前支持的 AI 服务供应商及其模型信息。

最后更新时间：${new Date().toISOString().split('T')[0]}
{ .date }

| 供应商 | 支持的模型 | 上下文窗口 | 价格（输入/输出） |
|:-------|:-----------|:------------|:------------------|
${providersData.providers.map(p => {
  const modelInfo = p.models.map(m => ({
    name: m.name,
    window: m.contextWindow.toLocaleString(),
    price: `$${m.price.input}/$${m.price.output}`
  }));
  return modelInfo.map(m => 
    `| ${p.name} | \`${m.name}\` | ${m.window} | ${m.price} |`
  ).join('\n');
}).join('\n')}

## 🌟 特点

!!! note "实时更新"
    所有供应商信息都会自动更新，确保数据的准确性。

- 包含详细的模型支持列表
- 开源维护，社区驱动
- 提供完整的价格信息

## 🤝 如何贡献

=== "通过 GitHub"
    1. Fork 本仓库
    2. 更新 \`data/providers.json\`
    3. 提交 Pull Request

=== "通过 Issue"
    1. 打开新的 Issue
    2. 描述需要更新的内容
    3. 等待维护者处理

## 📝 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

## 📬 联系我们

如有问题或建议，欢迎：

[提交 Issue](https://github.com/getofferhelp/ai-provider-list/issues){ .md-button }
[发起 Pull Request](https://github.com/getofferhelp/ai-provider-list/pulls){ .md-button .md-button--primary }
`;

  // 写入文件
  fs.writeFileSync('README.md', readmeContent);
  console.log('README.md 更新成功！');
} catch (error) {
  console.error('更新失败：', error);
  process.exit(1);
}
const fs = require('node:fs');

try {
  // 读取数据
  const providersData = JSON.parse(fs.readFileSync('data/providers.json', 'utf8'));
  
  // 生成供应商详细信息表格
  const providerDetailsTable = providersData.providers.map(provider => {
    const modelDetails = provider.models.map(model => `
### ${model.name}
- 模型ID: \`${model.id}\`
- 上下文窗口: ${model.contextWindow.toLocaleString()} tokens
- 价格:
  - 输入: $${model.price.input}/1K tokens
  - 输出: $${model.price.output}/1K tokens
`).join('\n');

    return `## ${provider.name}
- API接口: \`${provider.apiBase}\`
- API密钥获取: [点击这里](${provider.keyUrl})

${modelDetails}
---
`;
  }).join('\n');

  // 生成完整的 README 内容
  const readmeContent = `---
layout: default
title: 首页
nav_order: 1
permalink: /
---

# AI Provider List
{: .fs-9 }

一个全面的 AI 模型供应商列表，帮助开发者快速了解和选择合适的 AI 服务。
{: .fs-6 .fw-300 }

[开始使用](#支持的供应商){: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 .mr-2 }
[GitHub](https://github.com/getofferhelp/ai-provider-list){: .btn .fs-5 .mb-4 .mb-md-0 }

---

![GitHub last commit](https://img.shields.io/github/last-commit/getofferhelp/ai-provider-list)
![GitHub](https://img.shields.io/github/license/getofferhelp/ai-provider-list)

## 📊 供应商概览
{: .d-inline-block }

New
{: .label .label-green }

下面列出了目前支持的 AI 服务供应商及其模型数量统计。最后更新时间：${new Date().toISOString().split('T')[0]}
{: .fs-5 }

| 供应商 | 模型数量 | 最大上下文窗口 | 最低价格(输入/输出) |
| :--- | :---: | :---: | :--- |
${providersData.providers.map(p => {
  const maxContext = Math.max(...p.models.map(m => m.contextWindow));
  const minPrice = Math.min(...p.models.map(m => m.price.input));
  const minPriceOutput = Math.min(...p.models.map(m => m.price.output));
  return `| **${p.name}** | ${p.models.length} | ${maxContext.toLocaleString()} | $${minPrice}/1K - $${minPriceOutput}/1K |`;
}).join('\n')}
{: .table-responsive }

## 📑 详细供应商信息

${providerDetailsTable}

## 🌟 特点

- 实时更新的供应商和模型信息
- 详细的价格和性能参数
- 直观的API接口信息
- 完整的模型规格说明
- 开源维护，社区驱动

## 💡 选择建议

- **高性能需求**: 推荐使用 Claude 3 Opus、GPT-4等大型模型
- **性价比之选**: Mistral、Moonshot等价格较低的模型
- **长文本处理**: 选择 Claude 3系列、GPT-4 Turbo等大上下文窗口模型
- **成本敏感**: 可以考虑 DeepSeek、Moonshot等较经济的选择

## 🤝 如何贡献
{: .d-inline-block }

Contributing
{: .label .label-purple }

我们欢迎任何形式的贡献！参与方式：

1. Fork 本仓库
2. 更新 \`data/providers.json\`
3. 提交 Pull Request

## 📝 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

## 📬 联系我们

如有问题或建议，欢迎：
{: .fs-5 }

[提交 Issue](https://github.com/getofferhelp/ai-provider-list/issues){: .btn .btn-blue }
[发起 Pull Request](https://github.com/getofferhelp/ai-provider-list/pulls){: .btn .btn-green }
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
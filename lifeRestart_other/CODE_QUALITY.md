# 代码规范配置说明

本文档说明了如何在 Life Restart 项目中使用 ESLint 和 Prettier 进行代码质量管理。

## 📦 安装依赖

### 首次安装

在项目根目录执行以下命令安装所有依赖：

```bash
# 安装 lifeRestart_other 版本依赖
cd lifeRestart_other
npm install

# 安装 lifeRestart_xp 版本依赖
cd ../lifeRestart_xp
npm install
```

### 手动安装 ESLint 和 Prettier

如果只需要安装代码规范工具：

```bash
npm install --save-dev eslint@^8.57.0 prettier@^3.2.5
```

## 🚀 使用脚本

项目提供了以下 npm 脚本来管理代码质量：

### ESLint 检查

```bash
# 检查代码质量问题
npm run lint

# 自动修复可修复的问题
npm run lint:fix
```

### Prettier 格式化

```bash
# 格式化代码
npm run format

# 检查代码格式（不修改）
npm run format:check
```

### 组合命令

```bash
# 验证代码质量（lint + format check）
npm run validate
```

## 📝 配置说明

### ESLint 配置 (`.eslintrc.json`)

主要规则包括：

- **缩进**: 4 个空格
- **引号**: 单引号
- **分号**: 必须使用分号
- **行尾**: Windows (CRLF)
- **其他规则**: 
  - 禁止使用 `var`，推荐使用 `let`/`const`
  - 推荐使用箭头函数
  - 禁止使用 `eval()`
  - 等等...

### Prettier 配置 (`.prettierrc`)

主要配置项：

- **行宽**: 100 字符
- **缩进**: 4 个空格
- **引号**: 单引号
- **分号**: 使用分号
- **行尾**: CRLF (Windows)
- **尾随逗号**: ES5 标准（对象、数组允许尾随逗号）

### 忽略文件 (`.eslintignore`, `.prettierignore`)

以下文件不会被检查/格式化：

- `node_modules/` - 依赖包
- `public/` - 构建输出
- `lib/` - 第三方库
- `view/` - 视图文件
- `data/` - 数据文件
- `*.json` - JSON 文件
- 图片、字体等静态资源

## 💡 编辑器集成

### VS Code

推荐安装以下扩展：

1. **ESLint** (dbaeumer.vscode-eslint)
2. **Prettier - Code formatter** (esbenp.prettier-vscode)

然后在 `.vscode/settings.json` 中添加：

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

### 其他编辑器

请参考 ESLint 和 Prettier 官方文档配置相应编辑器。

## 🔧 常见问题

### Q: 为什么有些错误无法自动修复？

A: ESLint 的部分规则涉及代码逻辑，无法自动修复。需要手动检查并修改代码。

### Q: 格式化后代码变化很大怎么办？

A: 这是正常现象。Prettier 会统一代码风格。建议提交前都运行一次格式化。

### Q: 如何禁用某行的检查？

A: 在代码行后添加注释：

```javascript
// eslint-disable-next-line
const value = someValue(); // 禁用下一行检查

// eslint-disable-line
const value = someValue(); // 禁用当前行检查
```

### Q: 如何禁用整个文件的检查？

A: 在文件顶部添加：

```javascript
/* eslint-disable */
// 你的代码
```

## 📊 最佳实践

1. **提交前检查**: 每次提交代码前运行 `npm run validate`
2. **自动格式化**: 配置编辑器保存时自动格式化
3. **持续集成**: 在 CI/CD 流程中加入 lint 检查
4. **代码审查**: 将代码规范检查纳入 code review 流程

## 📚 相关资源

- [ESLint 官方文档](https://eslint.org/docs/user-guide/getting-started)
- [Prettier 官方文档](https://prettier.io/docs/en/index.html)
- [ESLint 规则列表](https://eslint.org/docs/rules/)
- [EditorConfig](https://editorconfig.org/)

## 🤝 贡献指南

在为本项目贡献代码时，请确保：

1. 代码通过 ESLint 检查（无 error）
2. 代码格式符合 Prettier 标准
3. 运行 `npm run validate` 无问题

感谢您的贡献！

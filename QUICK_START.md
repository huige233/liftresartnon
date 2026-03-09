# 🚀 快速启动指南

## 项目改进 - 任务 1.1：代码规范工具配置

### ✅ 已完成

- [x] ESLint 配置
- [x] Prettier 配置
- [x] 依赖安装
- [x] NPM 脚本添加
- [x] 文档创建

### 📦 安装（如果还未安装）

```bash
# 进入项目目录
cd lifeRestart_other

# 安装依赖（如果还未安装）
npm install --legacy-peer-deps
```

### 🔧 立即使用

#### 方式一：自动修复所有问题（推荐）

```bash
# 自动修复代码规范问题
npm run lint:fix

# 格式化所有代码
npm run format

# 验证结果
npm run validate
```

#### 方式二：仅检查（不修改）

```bash
# 检查代码问题
npm run lint

# 检查格式
npm run format:check
```

### 📊 预期结果

运行后你将看到：

```
✓ ESLint 检查完成
  - 发现 X 个问题
  - 已自动修复 Y 个
  
✓ Prettier 格式化完成
  - 已格式化 Z 个文件
  
✓ 验证通过
```

### 💡 VS Code 用户

1. **安装扩展**（按 `Ctrl+Shift+X`）:
   - ESLint (dbaeumer.vscode-eslint)
   - Prettier - Code formatter (esbenp.prettier-vscode)

2. **启用自动保存格式化**:
   - 打开设置 (`Ctrl+,`)
   - 搜索 "Format On Save"
   - 勾选 "Editor: Format On Save"

3. **或者手动配置** - 创建 `.vscode/settings.json`:
   ```json
   {
     "editor.formatOnSave": true,
     "editor.defaultFormatter": "esbenp.prettier-vscode",
     "editor.codeActionsOnSave": {
       "source.fixAll.eslint": true
     }
   }
   ```

### 🎯 下一步

完成自动修复后，继续执行：

1. **任务 1.2**: 集成 Jest 测试框架
2. **任务 1.3**: 安全性加固

详见：[PROJECT_IMPROVEMENT_REPORT.md](./PROJECT_IMPROVEMENT_REPORT.md)

### 📚 更多文档

- [CODE_QUALITY.md](./lifeRestart_other/CODE_QUALITY.md) - 详细使用指南
- [LINT_REPORT.md](./lifeRestart_other/LINT_REPORT.md) - 测试报告
- [PROJECT_IMPROVEMENT_REPORT.md](./PROJECT_IMPROVEMENT_REPORT.md) - 完整改进报告

---

**提示**: 同样的配置也适用于 `lifeRestart_xp` 版本，只需切换到对应目录即可。

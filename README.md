# Life Restart Game

## 🎮 游戏简介

Life Restart 是一款基于文本的人生模拟游戏，玩家可以体验不同的人生轨迹和事件发展。

## 🔧 开发说明

### AI辅助开发声明

本项目在AI辅助下进行架构设计和bug验证，主要代码实现由开发者独立完成。

**AI辅助内容包括：**
- 事件系统架构设计和重构方案
- 代码质量检查和bug验证
- 技术文档编写和测试用例设计
- 性能优化建议和最佳实践指导

**开发者独立完成内容包括：**
- 核心业务逻辑实现
- 用户界面设计和交互逻辑
- 游戏平衡性调整
- 功能测试和部署验证

## 🚀 快速开始

### 在线体验

- **XP版本**: https://huige233.github.io/liftresartnon/lifeRestart_xp/view/
- **Non版本**: https://huige233.github.io/liftresartnon/lifeRestart_other/view/

### 本地开发

```bash
# 克隆项目
git clone https://github.com/badhope/liftresartnon.git

# 进入项目目录
cd liftresartnon/lifeRestart_other

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 📁 项目结构

```
lifeRestart_other/
├── src/                 # 源代码目录
│   ├── event.js         # 基础事件系统
│   ├── event_v2.js      # 增强版事件系统（AI辅助重构）
│   ├── life.js          # 游戏核心逻辑
│   └── ...
├── data/                # 游戏数据
│   ├── events.json      # 事件配置
│   └── ...
├── test/                # 测试文件
│   ├── event_v2.test.js # 新事件系统测试
│   └── integration_test.js # 集成测试
├── docs/                # 文档
│   └── EVENT_SYSTEM_MIGRATION_GUIDE.md # 迁移指南
└── view/               # 前端界面
```

## 🔄 最新更新

### 事件系统重构（AI辅助）

已完成事件系统的全面重构，新增功能包括：

- ✅ **事件池管理系统** - 支持权重、概率、冷却机制
- ✅ **P社风格事件机制** - 全局标志、互斥事件、事件链
- ✅ **性能优化** - 权重缓存、状态管理优化
- ✅ **完全向后兼容** - 现有API保持不变
- ✅ **完整测试覆盖** - 单元测试和集成测试

详细迁移指南请参考：[docs/EVENT_SYSTEM_MIGRATION_GUIDE.md](lifeRestart_other/docs/EVENT_SYSTEM_MIGRATION_GUIDE.md)

## 🎯 游戏特色

- **丰富的事件系统** - 支持复杂的事件触发条件和分支逻辑
- **多样的人生轨迹** - 根据选择产生不同的游戏结局
- **天赋系统** - 不同的天赋组合带来独特的游戏体验
- **属性成长** - 颜值、智力、体质、家境、快乐等多维度属性

## ⚠️ 注意事项

- 请不要过度选取天赋，可能导致选点显示问题
- 游戏数据会定期更新，建议保持最新版本
- 如遇技术问题，请参考相关文档或提交Issue

## 🤝 贡献指南

欢迎提交Pull Request来改进游戏功能或修复bug。请确保：

1. 代码符合项目规范
2. 新增功能包含相应测试
3. 更新相关文档
4. 通过代码审查

## 📄 许可证

本项目采用MIT许可证，详见[LICENSE](LICENSE)文件。

## 📞 联系方式

如有问题或建议，请通过以下方式联系：

- GitHub Issues: [项目Issues页面](https://github.com/badhope/liftresartnon/issues)
- 项目主页: [GitHub仓库](https://github.com/badhope/liftresartnon)

---

**重要提示**: 本项目在AI辅助下进行开发，但所有核心业务逻辑和最终实现均由开发者独立完成，确保代码质量和项目可维护性。

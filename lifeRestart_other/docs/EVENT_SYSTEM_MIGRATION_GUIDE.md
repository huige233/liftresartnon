# 事件系统迁移指南

## 📋 概述

本文档指导如何从旧版事件系统迁移到增强版事件系统。新系统完全向后兼容，同时提供了P社风格的事件机制。

## 🚀 快速迁移

### 1. 导入新系统

```javascript
// 旧方式
import Event from './src/event.js';

// 新方式（推荐）
import EnhancedEventSystem from './src/event_v2.js';
```

### 2. 初始化系统

```javascript
// 旧方式
const eventSystem = new Event();
eventSystem.initial({ events: eventData });

// 新方式（完全兼容）
const eventSystem = new EnhancedEventSystem();
eventSystem.initial({ events: eventData });

// 新方式（带配置）
eventSystem.initial({
    events: eventData,
    config: {
        enableCooldown: true,
        cooldownDuration: 10,
        maxEventChainLength: 5,
        enableWeightSystem: true
    }
});
```

### 3. 使用现有API（完全兼容）

所有现有API都保持完全兼容：

```javascript
// 这些方法在新系统中完全一样
const canTrigger = eventSystem.check(eventId, property);
const eventInfo = eventSystem.get(eventId);
const result = eventSystem.do(eventId, property);
const count = eventSystem.count();
```

## 🆕 新功能使用指南

### 1. 事件池管理

```javascript
// 获取当前可触发的事件列表（按优先级和权重排序）
const availableEvents = eventSystem.getAvailableEvents(property);

// 示例输出
[
    {
        id: 10001,
        event: "事件描述",
        weight: 150,    // 计算后的权重
        priority: 2     // 优先级
    },
    // ...
]
```

### 2. 事件状态管理

```javascript
// 禁用事件（不会触发）
eventSystem.disableEvent('10001');

// 启用事件
eventSystem.enableEvent('10001');

// 重置事件状态（清除触发次数和冷却）
eventSystem.resetEvent('10001');

// 获取事件统计信息
const stats = eventSystem.getEventStats('10001');
// {
//     id: 10001,
//     triggerCount: 3,
//     lastTriggerTime: 1640995200000,
//     triggerHistory: [...],
//     currentState: 'available'
// }
```

### 3. 全局标志系统

```javascript
// 设置全局标志
eventSystem.setGlobalFlag('has_visited_city', true);
eventSystem.setGlobalFlag('quest_completed', 5);

// 获取全局标志
const hasVisited = eventSystem.getGlobalFlag('has_visited_city');
const questCount = eventSystem.getGlobalFlag('quest_completed');
```

### 4. 事件链追踪

```javascript
// 获取当前事件链
const eventChain = eventSystem.getEventChain();
// [10001, 10002, 10003]

// 清空事件链
eventSystem.clearEventChain();
```

## 🔧 高级配置

### 事件数据增强

新系统支持更丰富的事件配置：

```json
{
    "10001": {
        "id": 10001,
        "event": "事件描述",
        "effect": {"MNY": 1},
        
        // 新功能配置
        "weight": 100,                    // 基础权重
        "priority": 2,                    // 优先级（1-4）
        "cooldown": 5,                    // 冷却时间（秒）
        "maxTriggers": 3,                 // 最大触发次数
        "mutuallyExclusive": [10002],     // 互斥事件
        
        // 权重修正
        "weightModifiers": [
            {
                "condition": "STR>5",
                "modifier": 50
            }
        ],
        
        // 全局标志
        "setFlags": {
            "special_event_triggered": true
        }
    }
}
```

### 系统配置选项

```javascript
const config = {
    enableCooldown: true,           // 启用冷却机制
    cooldownDuration: 10,           // 默认冷却时间
    maxEventChainLength: 5,         // 事件链最大长度
    enableWeightSystem: true,        // 启用权重系统
    // 更多配置...
};
```

## 📊 性能优化

### 1. 权重缓存
新系统自动缓存权重计算结果，避免重复计算。

### 2. 事件状态缓存
事件状态被缓存，减少条件检查的开销。

### 3. 按需计算
只有在需要时才计算可触发事件列表。

## 🔄 迁移检查清单

- [ ] 更新导入语句
- [ ] 测试现有功能是否正常工作
- [ ] 验证向后兼容性
- [ ] 逐步使用新功能
- [ ] 更新事件数据配置（可选）
- [ ] 性能测试

## 🐛 常见问题

### Q: 迁移后现有事件不触发？
A: 检查事件数据格式是否正确，确保所有必需字段存在。

### Q: 新功能如何影响现有游戏逻辑？
A: 新功能默认关闭或使用保守配置，不会影响现有逻辑。

### Q: 性能是否有影响？
A: 新系统经过优化，在大多数情况下性能更好。

## 📈 监控和调试

### 启用调试日志
```javascript
// 在初始化时启用调试
eventSystem.initial({
    events: eventData,
    config: {
        debug: true
    }
});
```

### 事件触发监控
```javascript
// 监听事件触发
const stats = eventSystem.getEventStats(eventId);
console.log('事件触发统计:', stats);
```

## 🎯 最佳实践

1. **渐进式迁移**：先验证兼容性，再逐步使用新功能
2. **配置备份**：迁移前备份现有配置
3. **测试驱动**：为关键功能编写测试用例
4. **性能监控**：监控系统性能变化
5. **文档更新**：更新相关文档和注释

## 📞 技术支持

如遇迁移问题，请检查：
1. 控制台错误信息
2. 事件数据格式
3. 属性对象接口
4. 系统配置参数

---

**迁移完成标志**：当所有现有功能正常工作，且新功能可以正常使用时，迁移完成。

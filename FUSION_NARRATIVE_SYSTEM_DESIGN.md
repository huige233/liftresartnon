# 🧬 融合式剧情设计系统架构文档

**项目名称**: Life Restart - 进化叙事系统  
**设计版本**: 2.0  
**设计日期**: 2026-03-09  
**设计灵感**: 《瘟疫公司》进化树 × P 社多分支叙事

---

## 📋 执行摘要

本设计文档提出了一套**融合式剧情设计系统**（Fusion Narrative System, FNS），将《瘟疫公司》的**病原体进化路径机制**与 Paradox Interactive 游戏的**多分支叙事结构**深度融合，创造出具有**动态演化性**、**多维权重影响**和**叙事连贯性**的综合性剧情框架。

### 核心创新点

1. **剧情进化树**: 将线性人生改为可"进化"的剧情网络
2. **多维度影响系统**: 5 大维度 × 3 层权重的选择影响模型
3. **动态事件组合**: 基于状态机的概率事件生成
4. **叙事连贯性保障**: 基于语义网络的事件衔接验证

---

## 🎯 第一部分：核心原理

### 1.1 系统设计理念

#### A. 瘟疫公司机制提取

**核心要素**:
```
1. 进化点数系统 (DNA Points)
   ↓
   解锁特性和能力
   
2. 进化树结构
   ├── 传播途径 (Transmission)
   ├── 症状表现 (Symptoms)
   └── 特殊能力 (Abilities)
   
3. 适应性进化
   - 根据环境调整
   - 抗药性发展
   - 宿主行为改变
   
4. 胜利条件分支
   - 灭绝全人类
   - 与宿主共生
   - 治愈和解
```

**应用到剧情设计**:
```
1. 人生阅历点 (Life Experience Points, LEP)
   ↓
   解锁剧情分支和人生路径
   
2. 人生进化树
   ├── 社会关系树 (Relationship)
   ├── 职业发展树 (Career)
   └── 个人成长树 (Growth)
   
3. 适应性人生
   - 根据环境选择
   - 技能发展
   - 性格塑造
   
4. 结局分支
   - 世俗成功
   - 精神超脱
   - 平凡幸福
   - 悲剧收场
```

#### B. P 社叙事机制提取

**核心要素**:
```
1. 国策树系统 (Focus Tree)
   ├── 政治路线
   ├── 经济路线
   └── 外交路线
   
2. 意识形态系统
   - 民主/专制/共产主义
   - 中立/结盟/敌对
   
3. 事件链系统
   - 前置条件
   - 触发时机
   - 后续影响
   
4. 国家变量追踪
   - 稳定度
   - 支持率
   - 资源储备
```

**应用到剧情设计**:
```
1. 人生抉择树 (Life Choice Tree)
   ├── 价值观路线
   ├── 生活方式路线
   └── 人际关系路线
   
2. 性格倾向系统
   - 善良/中立/邪恶
   - 内向/外向
   - 理性/感性
   
3. 人生事件链
   - 前置人生阶段
   - 触发年龄/条件
   - 长期影响
   
4. 人生变量追踪
   - 幸福感
   - 成就感
   - 人际关系质量
```

---

### 1.2 融合系统核心模型

#### 融合公式

```
剧情演化 = f(选择权重，状态变量，进化点数，事件概率)

其中:
- 选择权重：玩家决策的影响力系数
- 状态变量：当前剧情状态向量
- 进化点数：可解锁新分支的资源
- 事件概率：动态计算的事件触发率
```

#### 核心方程

**选择影响力计算**:
```
Impact = Base × (1 + Σ(Modifier_i)) × Weight × Persistence

其中:
- Base: 基础影响值 (0-100)
- Modifier_i: 第 i 个修正系数 (天赋/环境/状态)
- Weight: 选择权重系数 (0.1-1.0)
- Persistence: 影响持续时间系数 (1.0-∞)
```

**事件触发概率**:
```
P(Event) = Base_P × Age_Mod × State_Mod × Choice_Mod × Random

其中:
- Base_P: 基础触发概率
- Age_Mod: 年龄修正 (不同年龄段概率不同)
- State_Mod: 状态修正 (属性/成就/前置事件)
- Choice_Mod: 历史选择修正
- Random: 随机因子 (0.8-1.2)
```

**剧情连贯性评分**:
```
Coherence = Σ(Event_Similarity_i) / N × Transition_Smoothness × Logic_Consistency

评分标准:
- > 0.8: 优秀 (流畅自然)
- 0.6-0.8: 良好 (基本连贯)
- 0.4-0.6: 一般 (有些突兀)
- < 0.4: 差 (需要调整)
```

---

## 🏗️ 第二部分：系统架构

### 2.1 剧情节点网络架构

#### A. 节点类型定义

```javascript
// 剧情节点数据结构
PlotNode = {
    id: string,              // 唯一标识符
    type: enum,              // 节点类型
    content: object,         // 节点内容
    connections: array,      // 连接关系
    conditions: object,      // 触发条件
    effects: object,         // 节点效果
    weight: float,           // 权重值
    coherence_check: object  // 连贯性检查规则
}

// 节点类型枚举
NodeType = {
    START: "start",          // 起始节点 (出生)
    EVENT: "event",          // 普通事件节点
    CHOICE: "choice",        // 选择节点
    BRANCH: "branch",        // 分支节点
    CHECKPOINT: "checkpoint",// 检查点节点
    ENDING: "ending"         // 结局节点
}
```

#### B. 节点网络拓扑

```
                    [START: 出生]
                         |
        +----------------+----------------+
        |                |                |
    [童年线]        [少年线]        [青年线]
        |                |                |
    +---+---+        +---+---+        +---+---+
    |   |   |        |   |   |        |   |   |
  事件 选择 分支    事件 选择 分支    事件 选择 分支
    |   |   |        |   |   |        |   |   |
    +---+---+        +---+---+        +---+---+
        |                |                |
        +----------------+----------------+
                         |
                    [CHECKPOINT: 中年]
                         |
        +----------------+----------------+
        |                |                |
    [事业线]        [家庭线]        [修仙线]
        |                |                |
    +---+---+        +---+---+        +---+---+
    |   |   |        |   |   |        |   |   |
  事件 选择 分支    事件 选择 分支    事件 选择 分支
        |                |                |
        +----------------+----------------+
                         |
                    [ENDING: 结局]
```

#### C. 节点连接规则

```javascript
// 连接有效性验证
function validateConnection(fromNode, toNode) {
    // 1. 年龄连续性检查
    if (!checkAgeContinuity(fromNode.age, toNode.age)) {
        return false;
    }
    
    // 2. 前置条件检查
    if (!checkPrerequisites(toNode.conditions, currentState)) {
        return false;
    }
    
    // 3. 剧情连贯性检查
    if (!checkCoherence(fromNode, toNode)) {
        return false;
    }
    
    // 4. 权重阈值检查
    if (fromNode.weight < toNode.requiredWeight) {
        return false;
    }
    
    return true;
}
```

---

### 2.2 多维度选择分支系统

#### A. 五维影响模型

```
                    ┌─────────────────┐
                    │   玩家选择      │
                    └────────┬────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
        ▼                    ▼                    ▼
┌───────────────┐   ┌───────────────┐   ┌───────────────┐
│  短期影响     │   │  中期影响     │   │  长期影响     │
│  (0-10 岁)    │   │  (10-30 岁)   │   │  (30 岁+)     │
│  权重：0.3    │   │  权重：0.5    │   │  权重：1.0    │
└───────────────┘   └───────────────┘   └───────────────┘
        │                    │                    │
        └────────────────────┴────────────────────┘
                             │
                             ▼
                    ┌───────────────┐
                    │  综合影响值   │
                    │  Impact Score │
                    └───────────────┘
```

#### B. 选择权重计算

```javascript
// 选择权重计算模型
class ChoiceWeightCalculator {
    constructor() {
        this.dimensions = {
            moral: 0,      // 道德维度 (-100 ~ 100)
            social: 0,     // 社交维度 (-100 ~ 100)
            career: 0,     // 职业维度 (-100 ~ 100)
            health: 0,     // 健康维度 (-100 ~ 100)
            wealth: 0      // 财富维度 (-100 ~ 100)
        };
        
        this.weights = {
            short_term: 0.3,   // 短期权重
            mid_term: 0.5,     // 中期权重
            long_term: 1.0     // 长期权重
        };
    }
    
    // 计算选择影响力
    calculateImpact(choice, context) {
        const baseImpact = choice.baseValue;
        
        // 维度修正
        const dimensionMods = this.calculateDimensionMods(choice);
        
        // 情境修正
        const contextMods = this.calculateContextMods(context);
        
        // 时间衰减
        const timeDecay = this.calculateTimeDecay(choice.age);
        
        // 综合影响
        const impact = baseImpact 
                     * (1 + dimensionMods + contextMods) 
                     * timeDecay;
        
        return {
            impact: impact,
            breakdown: {
                base: baseImpact,
                dimension: dimensionMods,
                context: contextMods,
                decay: timeDecay
            }
        };
    }
    
    // 维度修正计算
    calculateDimensionMods(choice) {
        let mod = 0;
        
        // 道德修正
        if (choice.affects.moral) {
            mod += this.dimensions.moral * 0.01;
        }
        
        // 社交修正
        if (choice.affects.social) {
            mod += this.dimensions.social * 0.01;
        }
        
        // 职业修正
        if (choice.affects.career) {
            mod += this.dimensions.career * 0.01;
        }
        
        // 健康修正
        if (choice.affects.health) {
            mod += this.dimensions.health * 0.01;
        }
        
        // 财富修正
        if (choice.affects.wealth) {
            mod += this.dimensions.wealth * 0.01;
        }
        
        return mod;
    }
    
    // 时间衰减计算
    calculateTimeDecay(age) {
        // 年龄越大，早期选择的影响衰减越多
        const decayRate = 0.02;
        return Math.exp(-decayRate * age);
    }
}
```

#### C. 分支解锁条件

```javascript
// 分支解锁条件定义
BranchUnlockConditions = {
    // 事业线解锁
    career_branch: {
        required_age: 18,
        min_INT: 50,
        choices_completed: 5,
        LEP_required: 100,
        prerequisites: ["education_completed"]
    },
    
    // 家庭线解锁
    family_branch: {
        required_age: 20,
        min_CHR: 40,
        choices_completed: 3,
        LEP_required: 80,
        prerequisites: ["relationship_stable"]
    },
    
    // 修仙线解锁 (隐藏)
    cultivation_branch: {
        required_age: 30,
        min_all_stats: 80,
        choices_completed: 20,
        LEP_required: 500,
        prerequisites: ["enlightenment_event", "special_talent"],
        hidden: true
    }
}
```

---

### 2.3 概率触发机制

#### A. 动态概率模型

```javascript
// 事件触发概率计算
class EventProbabilityEngine {
    constructor() {
        this.baseProbabilities = new Map();  // 基础概率
        this.modifiers = new Map();          // 修正系数
        this.history = [];                   // 触发历史
    }
    
    // 计算事件触发概率
    calculateProbability(eventId, context) {
        // 1. 获取基础概率
        const baseProb = this.baseProbabilities.get(eventId) || 0.5;
        
        // 2. 应用年龄修正
        const ageMod = this.getAgeModifier(eventId, context.age);
        
        // 3. 应用属性修正
        const statMods = this.getStatModifiers(eventId, context.stats);
        
        // 4. 应用历史修正 (避免重复)
        const historyMod = this.getHistoryModifier(eventId);
        
        // 5. 应用选择修正
        const choiceMod = this.getChoiceModifier(eventId, context.choices);
        
        // 6. 应用随机因子
        const randomFactor = 0.8 + Math.random() * 0.4; // 0.8 ~ 1.2
        
        // 综合计算
        const finalProb = baseProb 
                        * ageMod 
                        * statMods 
                        * historyMod 
                        * choiceMod 
                        * randomFactor;
        
        // 限制在 0 ~ 1 范围
        return Math.max(0, Math.min(1, finalProb));
    }
    
    // 年龄修正
    getAgeModifier(eventId, age) {
        const eventAgeRange = this.getEventAgeRange(eventId);
        
        if (age < eventAgeRange.min) {
            return 0.1; // 年龄太小，概率极低
        }
        
        if (age > eventAgeRange.max) {
            return 0.2; // 年龄太大，概率降低
        }
        
        // 在合适年龄范围内，概率最高
        return 1.0;
    }
    
    // 历史修正 (避免同一事件重复触发)
    getHistoryModifier(eventId) {
        const triggerCount = this.history.filter(e => e.id === eventId).length;
        
        if (triggerCount === 0) {
            return 1.0; // 首次触发，无修正
        }
        
        if (triggerCount === 1) {
            return 0.3; // 第二次触发，概率降低 70%
        }
        
        return 0.1; // 多次触发，概率降低 90%
    }
}
```

#### B. 概率事件设计表

| 事件 ID | 事件名称 | 基础概率 | 年龄范围 | 属性要求 | 前置条件 | 权重影响 |
|--------|---------|---------|---------|---------|---------|---------|
| EVT001 | 生场重病 | 0.15 | 0-80 | 无 | 无 | STR-20 |
| EVT002 | 获评三好学生 | 0.25 | 6-18 | INT>50 | 在校 | CHR+10 |
| EVT003 | 遇到贵人 | 0.20 | 18-40 | CHR>60 | 无 | MNY+30 |
| EVT004 | 投资失败 | 0.18 | 25-50 | 无 | 有存款 | MNY-50 |
| EVT005 | 悟出大道 | 0.05 | 30-100 | ALL>80 | 修仙线 | 解锁成就 |
| EVT006 | 车祸意外 | 0.08 | 0-80 | 无 | 出行 | 可能死亡 |
| EVT007 | 升职加薪 | 0.30 | 25-55 | INT>70 | 在职 | MNY+20 |
| EVT008 | 失恋 | 0.35 | 16-40 | 无 | 恋爱中 | CHR-10 |
| EVT009 | 中彩票 | 0.01 | 18-80 | 无 | 买彩票 | MNY+100 |
| EVT010 | 发现天赋 | 0.22 | 5-25 | 无 | 无 | 解锁天赋 |

---

### 2.4 动态事件组合逻辑

#### A. 事件组合生成器

```javascript
// 动态事件组合生成
class EventCombinator {
    constructor() {
        this.eventPools = new Map();  // 事件池
        this.compatibilityMatrix = []; // 兼容性矩阵
        this.comboRules = [];         // 组合规则
    }
    
    // 生成事件组合
    generateCombo(context, count = 3) {
        const availableEvents = this.getAvailableEvents(context);
        const combos = [];
        
        // 使用回溯算法生成有效组合
        this.backtrack(availableEvents, count, [], combos, context);
        
        // 根据评分排序
        combos.sort((a, b) => this.scoreCombo(b, context) - this.scoreCombo(a, context));
        
        return combos[0]; // 返回最佳组合
    }
    
    // 回溯生成有效组合
    backtrack(events, count, current, combos, context) {
        if (current.length === count) {
            if (this.isValidCombo(current, context)) {
                combos.push([...current]);
            }
            return;
        }
        
        for (let i = 0; i < events.length; i++) {
            // 剪枝：如果当前事件与已选事件不兼容，跳过
            if (!this.isCompatible(current, events[i])) {
                continue;
            }
            
            current.push(events[i]);
            this.backtrack(events.slice(i + 1), count, current, combos, context);
            current.pop();
        }
    }
    
    // 验证组合有效性
    isValidCombo(combo, context) {
        // 1. 检查事件数量
        if (combo.length < 2) {
            return false;
        }
        
        // 2. 检查兼容性
        for (let i = 0; i < combo.length; i++) {
            for (let j = i + 1; j < combo.length; j++) {
                if (!this.areEventsCompatible(combo[i], combo[j])) {
                    return false;
                }
            }
        }
        
        // 3. 检查与上下文的兼容性
        for (const event of combo) {
            if (!this.isEventCompatibleWithContext(event, context)) {
                return false;
            }
        }
        
        // 4. 检查叙事连贯性
        if (!this.checkNarrativeCoherence(combo)) {
            return false;
        }
        
        return true;
    }
    
    // 组合评分
    scoreCombo(combo, context) {
        let score = 0;
        
        // 1. 多样性评分
        score += this.diversityScore(combo) * 0.3;
        
        // 2. 连贯性评分
        score += this.coherenceScore(combo) * 0.4;
        
        // 3. 趣味性评分
        score += this.interestScore(combo, context) * 0.3;
        
        return score;
    }
}
```

#### B. 事件兼容性规则

```javascript
// 事件兼容性定义
EventCompatibilityRules = [
    {
        // 规则 1: 互斥事件不能同时发生
        type: "MUTUAL_EXCLUSION",
        pairs: [
            ["生男孩", "生女孩"],
            ["城市生活", "农村生活"],
            ["结婚", "单身主义"],
            ["健康长寿", "英年早逝"]
        ]
    },
    {
        // 规则 2: 前置依赖
        type: "PREREQUISITE",
        dependencies: [
            {event: "上大学", requires: "高中毕业"},
            {event: "结婚", requires: "恋爱"},
            {event: "生孩子", requires: "结婚"},
            {event: "飞升仙界", requires: "悟出天道"}
        ]
    },
    {
        // 规则 3: 时间顺序
        type: "TEMPORAL_ORDER",
        orders: [
            {before: "出生", after: "童年"},
            {before: "上学", after: "工作"},
            {before: "恋爱", after: "结婚"},
            {before: "悟道", after: "飞升"}
        ]
    },
    {
        // 规则 4: 逻辑一致性
        type: "LOGIC_CONSISTENCY",
        checks: [
            {
                if: "职业=医生",
                then_not: ["医疗事故致死", "讨厌医院"]
            },
            {
                if: "性格=善良",
                then_not: ["杀人犯罪", "虐待动物"]
            }
        ]
    }
];
```

---

### 2.5 玩家选择影响权重计算模型

#### A. 权重计算引擎

```javascript
// 玩家选择影响权重计算
class ChoiceImpactEngine {
    constructor() {
        this.impactFactors = {
            direct: 1.0,      // 直接影响系数
            indirect: 0.5,    // 间接影响系数
            delayed: 0.3,     // 延迟影响系数
            cumulative: 0.2   // 累积影响系数
        };
        
        this.decayRates = {
            short_term: 0.1,  // 短期衰减速率
            mid_term: 0.05,   // 中期衰减速率
            long_term: 0.02   // 长期衰减速率
        };
    }
    
    // 计算选择的综合影响
    calculateTotalImpact(choice, timeline) {
        const impacts = {
            immediate: this.calculateImmediateImpact(choice),
            short_term: this.calculateShortTermImpact(choice, timeline),
            mid_term: this.calculateMidTermImpact(choice, timeline),
            long_term: this.calculateLongTermImpact(choice, timeline)
        };
        
        // 加权求和
        const total = impacts.immediate * 1.0
                    + impacts.short_term * 0.7
                    + impacts.mid_term * 0.5
                    + impacts.long_term * 0.3;
        
        return {
            total: total,
            breakdown: impacts
        };
    }
    
    // 即时影响
    calculateImmediateImpact(choice) {
        return choice.baseImpact * this.impactFactors.direct;
    }
    
    // 短期影响 (0-10 岁)
    calculateShortTermImpact(choice, timeline) {
        const base = choice.baseImpact * this.impactFactors.indirect;
        const decay = Math.exp(-this.decayRates.short_term * 10);
        return base * decay;
    }
    
    // 中期影响 (10-30 岁)
    calculateMidTermImpact(choice, timeline) {
        const base = choice.baseImpact * this.impactFactors.delayed;
        const decay = Math.exp(-this.decayRates.mid_term * 20);
        return base * decay;
    }
    
    // 长期影响 (30 岁+)
    calculateLongTermImpact(choice, timeline) {
        const base = choice.baseImpact * this.impactFactors.cumulative;
        const decay = Math.exp(-this.decayRates.long_term * 50);
        return base * decay;
    }
}
```

#### B. 影响传播模型

```
选择影响传播路径:

                    [玩家选择]
                         │
        ┌────────────────┼────────────────┐
        │                │                │
        ▼                ▼                ▼
   [属性变化]      [关系变化]      [状态变化]
        │                │                │
        │                │                │
        └────────────────┼────────────────┘
                         │
                         ▼
                  [事件概率调整]
                         │
        ┌────────────────┼────────────────┐
        │                │                │
        ▼                ▼                ▼
   [新事件触发]    [旧事件修改]    [事件链激活]
        │                │                │
        │                │                │
        └────────────────┼────────────────┘
                         │
                         ▼
                  [剧情分支偏移]
                         │
                         ▼
                  [结局倾向改变]
```

---

### 2.6 剧情状态追踪系统

#### A. 状态数据结构

```javascript
// 剧情状态追踪
class PlotStateTracker {
    constructor() {
        this.currentState = {
            // 基础状态
            age: 0,
            gender: null,
            background: null,
            
            // 属性状态
            stats: {
                CHR: 0,  // 魅力
                INT: 0,  // 智力
                STR: 0,  // 体质
                MNY: 0   // 财富
            },
            
            // 维度状态
            dimensions: {
                moral: 0,    // 道德
                social: 0,   // 社交
                career: 0,   // 职业
                health: 0,   // 健康
                wealth: 0    // 财富
            },
            
            // 关系状态
            relationships: new Map(),
            
            // 成就状态
            achievements: [],
            
            // 事件历史
            eventHistory: [],
            
            // 选择历史
            choiceHistory: [],
            
            // 解锁状态
            unlocks: {
                branches: [],
                events: [],
                endings: []
            },
            
            // 标记状态
            flags: new Map(),
            
            // 人生阅历点
            LEP: 0
        };
    }
    
    // 更新状态
    updateState(delta) {
        // 属性更新
        for (const [key, value] of Object.entries(delta.stats || {})) {
            this.currentState.stats[key] += value;
            this.currentState.stats[key] = Math.max(0, Math.min(100, this.currentState.stats[key]));
        }
        
        // 维度更新
        for (const [key, value] of Object.entries(delta.dimensions || {})) {
            this.currentState.dimensions[key] += value;
            this.currentState.dimensions[key] = Math.max(-100, Math.min(100, this.currentState.dimensions[key]));
        }
        
        // 事件历史更新
        if (delta.event) {
            this.currentState.eventHistory.push({
                eventId: delta.event.id,
                timestamp: this.currentState.age,
                impact: delta.event.impact
            });
        }
        
        // 选择历史更新
        if (delta.choice) {
            this.currentState.choiceHistory.push({
                choiceId: delta.choice.id,
                timestamp: this.currentState.age,
                impact: delta.choice.impact
            });
        }
        
        // 年龄更新
        if (delta.age) {
            this.currentState.age = delta.age;
        }
    }
    
    // 获取状态快照
    getSnapshot() {
        return JSON.parse(JSON.stringify(this.currentState));
    }
    
    // 状态回滚
    rollback(toAge) {
        const snapshot = this.getSnapshotAtAge(toAge);
        this.currentState = snapshot;
    }
}
```

#### B. 状态变迁图

```
状态变迁示例:

[出生]
  │
  ├─ 属性初始化: CHR=50, INT=50, STR=50, MNY=50
  └─ 维度初始化: moral=0, social=0, career=0, health=0, wealth=0
       │
       ▼
[童年阶段]
  │
  ├─ 事件触发: "获评三好学生"
  │   └─ 状态变化: INT+10, CHR+5, LEP+20
  │
  └─ 选择: "努力学习"
      └─ 状态变化: INT+15, career 维度 +10, LEP+30
           │
           ▼
[青年阶段]
  │
  ├─ 事件触发: "遇到贵人"
  │   └─ 状态变化: CHR+20, MNY+30, LEP+40
  │
  └─ 选择: "接受帮助"
      └─ 状态变化: social 维度 +20, 解锁"事业线"分支
           │
           ▼
[中年阶段]
  │
  ├─ 状态检查: 满足"事业线"解锁条件
  ├─ 分支激活: 事业线 → 医生/教师/商人
  │
  └─ 选择: "成为医生"
      └─ 状态变化: MNY+50, health 维度 +30, 解锁"医疗事故"事件链
           │
           ▼
[老年阶段]
  │
  └─ 结局判定: 根据累积状态选择最佳结局
```

---

### 2.7 叙事连贯性保障机制

#### A. 连贯性检查引擎

```javascript
// 叙事连贯性检查
class NarrativeCoherenceEngine {
    constructor() {
        this.semanticNetwork = new Map();  // 语义网络
        this.transitionRules = [];         // 过渡规则
        this.coherenceThreshold = 0.6;     // 连贯性阈值
    }
    
    // 检查两个事件的连贯性
    checkCoherence(event1, event2) {
        // 1. 语义相似度检查
        const semanticScore = this.calculateSemanticSimilarity(event1, event2);
        
        // 2. 时间连续性检查
        const temporalScore = this.checkTemporalContinuity(event1, event2);
        
        // 3. 逻辑一致性检查
        const logicScore = this.checkLogicalConsistency(event1, event2);
        
        // 4. 情感连续性检查
        const emotionalScore = this.checkEmotionalContinuity(event1, event2);
        
        // 加权平均
        const coherenceScore = semanticScore * 0.3
                             + temporalScore * 0.2
                             + logicScore * 0.3
                             + emotionalScore * 0.2;
        
        return {
            score: coherenceScore,
            passed: coherenceScore >= this.coherenceThreshold,
            breakdown: {
                semantic: semanticScore,
                temporal: temporalScore,
                logic: logicScore,
                emotional: emotionalScore
            }
        };
    }
    
    // 语义相似度计算 (基于语义网络)
    calculateSemanticSimilarity(event1, event2) {
        const tags1 = event1.semanticTags || [];
        const tags2 = event2.semanticTags || [];
        
        // Jaccard 相似度
        const intersection = tags1.filter(t => tags2.includes(t)).length;
        const union = new Set([...tags1, ...tags2]).size;
        
        return union > 0 ? intersection / union : 0;
    }
    
    // 时间连续性检查
    checkTemporalContinuity(event1, event2) {
        const ageGap = event2.minAge - event1.maxAge;
        
        if (ageGap < 0) {
            return 0; // 时间倒流，不允许
        }
        
        if (ageGap === 0) {
            return 1.0; // 同年发生，完美连续
        }
        
        if (ageGap <= 5) {
            return 0.8; // 5 年内，良好连续
        }
        
        if (ageGap <= 10) {
            return 0.5; // 10 年内，一般连续
        }
        
        return 0.2; // 超过 10 年，连续性差
    }
    
    // 逻辑一致性检查
    checkLogicalConsistency(event1, event2) {
        // 检查互斥关系
        if (this.areMutuallyExclusive(event1, event2)) {
            return 0;
        }
        
        // 检查前置依赖
        if (this.hasUnmetPrerequisites(event2, event1)) {
            return 0;
        }
        
        // 检查因果关系
        if (this.hasValidCausality(event1, event2)) {
            return 1.0;
        }
        
        return 0.5; // 无明显逻辑关系，但不冲突
    }
    
    // 情感连续性检查
    checkEmotionalContinuity(event1, event2) {
        const emotion1 = event1.emotionalTone || 0; // -1 (负面) ~ 1 (正面)
        const emotion2 = event2.emotionalTone || 0;
        
        const emotionGap = Math.abs(emotion1 - emotion2);
        
        // 情感差距越小，连续性越好
        return 1.0 - (emotionGap / 2.0);
    }
}
```

#### B. 语义网络示例

```javascript
// 事件语义标签
EventSemanticTags = {
    "出生": ["开始", "生命", "家庭", "婴儿"],
    "童年": ["成长", "学习", "游戏", "天真"],
    "上学": ["教育", "知识", "社交", "成长"],
    "恋爱": ["情感", "关系", "浪漫", "青年"],
    "结婚": ["承诺", "家庭", "责任", "成年"],
    "工作": ["职业", "收入", "成就", "责任"],
    "生病": ["健康", "痛苦", "脆弱", "医疗"],
    "死亡": ["结束", "生命", "悲伤", "终结"],
    "悟道": ["觉悟", "智慧", "超脱", "修仙"],
    "飞升": ["升华", "仙界", "成就", "结局"]
};

// 语义关联强度
SemanticAssociations = [
    {from: "出生", to: "童年", strength: 0.9},
    {from: "童年", to: "上学", strength: 0.8},
    {from: "上学", to: "工作", strength: 0.7},
    {from: "恋爱", to: "结婚", strength: 0.9},
    {from: "结婚", to: "生子", strength: 0.8},
    {from: "工作", to: "成就", strength: 0.6},
    {from: "生病", to: "死亡", strength: 0.5},
    {from: "悟道", to: "飞升", strength: 0.95}
];
```

---

## 🎮 第三部分：Life Restart 剧情框架设计

### 3.1 核心剧情脉络图

```
┌─────────────────────────────────────────────────────────────────┐
│                        LIFE RESTART                             │
│                    进化叙事系统 2.0                              │
└─────────────────────────────────────────────────────────────────┘

                              [START]
                                │
                    ┌───────────┴───────────┐
                    │      出生 (0 岁)       │
                    │  性别/背景/初始属性    │
                    └───────────┬───────────┘
                                │
        ┌───────────────────────┼───────────────────────┐
        │                       │                       │
        ▼                       ▼                       ▼
┌───────────────┐      ┌───────────────┐      ┌───────────────┐
│   农村背景    │      │   城市背景    │      │   海外背景    │
│  STR+10       │      │  INT+10       │      │  CHR+10       │
│  自由度高     │      │  资源多       │      │  视野广       │
└───────┬───────┘      └───────┬───────┘      └───────┬───────┘
        │                      │                      │
        └──────────────────────┴──────────────────────┘
                               │
                    ┌──────────▼──────────┐
                    │   童年阶段 (0-17)    │
                    │  基础事件池：300+    │
                    │  选择节点：50+       │
                    └──────────┬──────────┘
                               │
                    ┌──────────▼──────────┐
                    │   少年阶段 (18-25)   │
                    │  基础事件池：400+    │
                    │  选择节点：80+       │
                    │  分支解锁：事业/家庭  │
                    └──────────┬──────────┘
                               │
        ┌──────────────────────┼──────────────────────┐
        │                      │                      │
        ▼                      ▼                      ▼
┌───────────────┐     ┌───────────────┐     ┌───────────────┐
│   事业线      │     │   家庭线      │     │   修仙线      │
│  职业选择     │     │  婚恋生子     │     │  悟道修炼     │
│  职场发展     │     │  家庭责任     │     │  飞升超脱     │
│  成就积累     │     │  亲情维系     │     │  天道领悟     │
└───────┬───────┘     └───────┬───────┘     └───────┬───────┘
        │                     │                     │
        └─────────────────────┴─────────────────────┘
                              │
                    ┌─────────▼─────────┐
                    │  中年阶段 (26-55)  │
                    │  基础事件池：500+  │
                    │  选择节点：100+    │
                    │  状态检查点        │
                    └─────────┬─────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌───────────────┐   ┌───────────────┐   ┌───────────────┐
│  事业成功     │   │  家庭美满     │   │  修仙突破     │
│  LEP>500      │   │  LEP>400      │   │  LEP>800      │
│  MNY>100      │   │  CHR>80       │   │  ALL>90       │
└───────┬───────┘   └───────┬───────┘   └───────┬───────┘
        │                   │                   │
        └───────────────────┴───────────────────┘
                            │
                  ┌─────────▼─────────┐
                  │  老年阶段 (56-97)  │
                  │  基础事件池：200+  │
                  │  回顾与总结        │
                  └─────────┬─────────┘
                            │
                  ┌─────────▼─────────┐
                  │    结局判定       │
                  │  根据状态选择     │
                  │  最佳匹配结局     │
                  └─────────┬─────────┘
                            │
        ┌───────────┬───────┴───────┬───────────┐
        │           │               │           │
        ▼           ▼               ▼           ▼
┌───────────┐┌───────────┐┌───────────┐┌───────────┐
│世俗成功   ││家庭幸福   ││修仙超脱   ││平凡一生   │
│结局 A     ││结局 B     ││结局 C     ││结局 D     │
└───────────┘└───────────┘└───────────┘└───────────┘
```

---

### 3.2 分支触发条件表

| 分支 ID | 分支名称 | 触发年龄 | 前置条件 | 属性要求 | LEP 要求 | 解锁事件数 |
|--------|---------|---------|---------|---------|---------|-----------|
| BR001 | 事业线-医生 | 22+ | 大学毕业 | INT>70 | 200 | 50 |
| BR002 | 事业线-教师 | 22+ | 大学毕业 | INT>60, CHR>50 | 180 | 45 |
| BR003 | 事业线-商人 | 20+ | 高中毕业 | MNY>50 | 150 | 60 |
| BR004 | 事业线-军人 | 18+ | 高中毕业 | STR>70 | 160 | 40 |
| BR005 | 家庭线-结婚 | 20+ | 恋爱中 | CHR>40 | 100 | 30 |
| BR006 | 家庭线-生子 | 25+ | 已婚 | MNY>30 | 150 | 25 |
| BR007 | 家庭线-丁克 | 25+ | 已婚 | 选择"不要孩子" | 120 | 20 |
| BR008 | 修仙线-入门 | 30+ | 悟道事件 | ALL>60 | 300 | 40 |
| BR009 | 修仙线-筑基 | 40+ | 修仙入门 | ALL>70 | 400 | 30 |
| BR010 | 修仙线-金丹 | 50+ | 修仙筑基 | ALL>80 | 500 | 25 |
| BR011 | 修仙线-元婴 | 60+ | 修仙金丹 | ALL>90 | 600 | 20 |
| BR012 | 修仙线-飞升 | 70+ | 修仙元婴 | ALL>100, 悟出天道 | 800 | 10 |

---

### 3.3 概率事件设计表

| 事件 ID | 事件名称 | 类型 | 基础概率 | 年龄范围 | 属性修正 | 前置条件 | 影响 | 权重 |
|--------|---------|------|---------|---------|---------|---------|------|------|
| EVT001 | 生场重病 | 负面 | 0.15 | 0-80 | STR<40: +0.2 | 无 | STR-20, LEP+10 | 0.5 |
| EVT002 | 获评三好学生 | 正面 | 0.25 | 6-18 | INT>60: +0.3 | 在校 | INT+10, CHR+5, LEP+20 | 0.3 |
| EVT003 | 遇到贵人 | 正面 | 0.20 | 18-40 | CHR>60: +0.25 | 无 | CHR+20, MNY+30, LEP+40 | 0.4 |
| EVT004 | 投资失败 | 负面 | 0.18 | 25-50 | INT<50: +0.2 | 有存款 | MNY-50, LEP+15 | 0.6 |
| EVT005 | 悟出大道 | 特殊 | 0.05 | 30-100 | ALL>80: +0.15 | 修仙线 | 解锁成就，LEP+100 | 1.0 |
| EVT006 | 车祸意外 | 负面 | 0.08 | 0-80 | STR<30: +0.15 | 出行 | 可能死亡，STR-50 | 0.8 |
| EVT007 | 升职加薪 | 正面 | 0.30 | 25-55 | INT>70: +0.2 | 在职 | MNY+20, LEP+25 | 0.3 |
| EVT008 | 失恋 | 负面 | 0.35 | 16-40 | CHR<40: +0.2 | 恋爱中 | CHR-10, LEP+10 | 0.4 |
| EVT009 | 中彩票 | 正面 | 0.01 | 18-80 | 无 | 买彩票 | MNY+100, LEP+50 | 0.2 |
| EVT010 | 发现天赋 | 正面 | 0.22 | 5-25 | 无 | 无 | 解锁天赋，LEP+30 | 0.3 |
| EVT011 | 结婚 | 正面 | 0.40 | 20-40 | CHR>50: +0.2 | 恋爱>1 年 | CHR+15, MNY-20, LEP+40 | 0.5 |
| EVT012 | 生子 | 正面 | 0.50 | 25-45 | 无 | 已婚 | MNY-30, LEP+50 | 0.5 |
| EVT013 | 亲人去世 | 负面 | 0.12 | 0-80 | 无 | 有亲人 | CHR-20, LEP+30 | 0.7 |
| EVT014 | 创业成功 | 正面 | 0.15 | 25-50 | INT>70, MNY>50 | 创业中 | MNY+80, LEP+60 | 0.6 |
| EVT015 | 悟出天道 | 特殊 | 0.02 | 50-100 | ALL>90 | 悟出 5 种大道 | 解锁结局，LEP+200 | 1.0 |

---

### 3.4 玩家选择反馈机制

#### A. 选择反馈流程

```
玩家做出选择
     │
     ▼
┌─────────────────┐
│ 1. 即时反馈     │
│ - 属性变化显示  │
│ - LEP 获得显示   │
│ - 提示音效      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ 2. 短期反馈     │
│ - 新事件解锁    │
│ - NPC 反应变化   │
│ - 剧情微调      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ 3. 中期反馈     │
│ - 分支路线开启  │
│ - 关系网变化    │
│ - 职业路径锁定  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ 4. 长期反馈     │
│ - 结局倾向改变  │
│ - 成就解锁      │
│ - 二周目要素    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ 5. 元反馈       │
│ - 统计数据更新  │
│ - 成就系统记录  │
│ - 剧情完成度    │
└─────────────────┘
```

#### B. 反馈 UI 设计

```javascript
// 选择反馈 UI 组件
ChoiceFeedbackUI = {
    // 即时反馈层
    immediate: {
        type: "popup",
        duration: 2000,
        content: [
            {type: "text", text: "选择：努力学习"},
            {type: "stat_change", stat: "INT", value: "+15", color: "green"},
            {type: "lep_gain", value: "+30 LEP", color: "gold"}
        ]
    },
    
    // 短期反馈层
    short_term: {
        type: "notification",
        trigger_age: "current + 1",
        content: [
            {type: "event_unlock", event: "考上好大学"},
            {type: "relationship_change", npc: "老师", value: "+10"}
        ]
    },
    
    // 中期反馈层
    mid_term: {
        type: "branch_notification",
        trigger_age: "current + 5",
        content: [
            {type: "branch_unlock", branch: "事业线-科学家"},
            {type: "path_change", old: "普通", new: "精英"}
        ]
    },
    
    // 长期反馈层
    long_term: {
        type: "ending_influence",
        trigger: "ending_selection",
        content: [
            {type: "ending_unlock", ending: "学术泰斗"},
            {type: "ending_probability", ending: "世俗成功", change: "+15%"}
        ]
    }
}
```

---

### 3.5 多结局达成条件

#### A. 结局分类系统

```javascript
// 结局定义
EndingDefinitions = {
    // A 类：世俗成功结局
    A1_secular_success: {
        name: "商业巨擘",
        category: "SECULAR",
        conditions: {
            LEP: ">600",
            MNY: ">150",
            career: "商人",
            achievements: ["创业成功", "投资大师"]
        },
        probability: "auto",
        description: "你建立了商业帝国，富可敌国。"
    },
    
    A2_secular_success: {
        name: "学术泰斗",
        category: "SECULAR",
        conditions: {
            LEP: ">550",
            INT: ">90",
            career: "科学家",
            achievements: ["诺贝尔奖", "学术突破"]
        },
        probability: "auto",
        description: "你的研究成果改变了世界。"
    },
    
    // B 类：家庭幸福结局
    B1_family_happiness: {
        name: "四世同堂",
        category: "FAMILY",
        conditions: {
            LEP: ">400",
            CHR: ">80",
            married: true,
            children: ">2",
            grandchildren: ">4"
        },
        probability: "auto",
        description: "你拥有一个幸福的大家庭，儿孙满堂。"
    },
    
    B2_family_happiness: {
        name: "相濡以沫",
        category: "FAMILY",
        conditions: {
            LEP: ">350",
            married: true,
            divorce: false,
            relationship_spouse: ">80"
        },
        probability: "auto",
        description: "你与爱人携手一生，白头偕老。"
    },
    
    // C 类：修仙超脱结局
    C1_cultivation: {
        name: "飞升仙界",
        category: "CULTIVATION",
        conditions: {
            LEP: ">800",
            ALL_stats: ">90",
            achievements: ["悟出天道", "飞升"],
            branch: "修仙线"
        },
        probability: "auto",
        description: "你超脱凡俗，飞升成仙。",
        hidden: false
    },
    
    C2_cultivation: {
        name: "陆地神仙",
        category: "CULTIVATION",
        conditions: {
            LEP: ">700",
            ALL_stats: ">80",
            achievements: ["悟出 5 种大道"],
            branch: "修仙线"
        },
        probability: "auto",
        description: "你虽未飞升，但已是人间无敌。",
        hidden: true
    },
    
    // D 类：平凡一生结局
    D1_ordinary: {
        name: "平凡人生",
        category: "ORDINARY",
        conditions: {
            LEP: "<200",
            no_special_achievements: true
        },
        probability: "default",
        description: "你度过了平凡但安稳的一生。"
    },
    
    D2_ordinary: {
        name: "知足常乐",
        category: "ORDINARY",
        conditions: {
            LEP: "200-400",
            happiness: ">60"
        },
        probability: "auto",
        description: "虽然平凡，但你活得很快乐。"
    },
    
    // E 类：悲剧结局
    E1_tragedy: {
        name: "英年早逝",
        category: "TRAGEDY",
        conditions: {
            death_age: "<40",
            cause: "疾病/意外"
        },
        probability: "auto",
        description: "你的生命如流星般短暂。"
    },
    
    E2_tragedy: {
        name: "孤独终老",
        category: "TRAGEDY",
        conditions: {
            married: false,
            children: 0,
            relationships: "<30"
        },
        probability: "auto",
        description: "你一个人走完了人生路。"
    }
}
```

#### B. 结局选择算法

```javascript
// 结局选择引擎
class EndingSelector {
    constructor() {
        this.endings = EndingDefinitions;
        this.weights = {
            SECULAR: 0.3,
            FAMILY: 0.3,
            CULTIVATION: 0.2,
            ORDINARY: 0.15,
            TRAGEDY: 0.05
        };
    }
    
    // 选择最佳匹配结局
    selectEnding(state) {
        const eligibleEndings = this.getEligibleEndings(state);
        
        if (eligibleEndings.length === 0) {
            return this.getDefaultEnding();
        }
        
        // 计算每个结局的匹配度
        const scoredEndings = eligibleEndings.map(ending => ({
            ending: ending,
            score: this.calculateMatchScore(ending, state)
        }));
        
        // 按分数排序
        scoredEndings.sort((a, b) => b.score - a.score);
        
        // 返回最高分结局
        return scoredEndings[0].ending;
    }
    
    // 获取符合条件的结局
    getEligibleEndings(state) {
        const eligible = [];
        
        for (const ending of Object.values(this.endings)) {
            if (this.checkConditions(ending.conditions, state)) {
                eligible.push(ending);
            }
        }
        
        return eligible;
    }
    
    // 计算匹配分数
    calculateMatchScore(ending, state) {
        let score = 0;
        
        // 条件满足度
        score += this.calculateConditionSatisfaction(ending, state) * 0.5;
        
        // 类别权重
        score += this.weights[ending.category] * 0.3;
        
        // LEP 匹配度
        score += this.calculateLEPMatch(ending, state) * 0.2;
        
        return score;
    }
}
```

---

### 3.6 剧情动态平衡调整方案

#### A. 动态平衡监控

```javascript
// 剧情平衡监控器
class PlotBalanceMonitor {
    constructor() {
        this.metrics = {
            eventDistribution: [],  // 事件分布
            choiceImpact: [],       // 选择影响
            endingDistribution: [], // 结局分布
            playerSatisfaction: []  // 玩家满意度
        };
    }
    
    // 监控事件触发频率
    monitorEventFrequency(events) {
        const frequency = {};
        
        for (const event of events) {
            frequency[event.id] = (frequency[event.id] || 0) + 1;
        }
        
        // 检测过度触发的事件
        const overTriggered = Object.entries(frequency)
            .filter(([id, count]) => count > threshold)
            .map(([id, count]) => id);
        
        // 检测从未触发的事件
        const neverTriggered = Object.keys(allEvents)
            .filter(id => !frequency[id]);
        
        return {
            overTriggered,
            neverTriggered,
            needsAdjustment: overTriggered.length > 0 || neverTriggered.length > 0
        };
    }
    
    // 调整事件概率
    adjustEventProbabilities(monitoringResult) {
        for (const eventId of monitoringResult.overTriggered) {
            // 降低概率
            allEvents[eventId].baseProbability *= 0.8;
        }
        
        for (const eventId of monitoringResult.neverTriggered) {
            // 提高概率
            allEvents[eventId].baseProbability *= 1.2;
        }
    }
    
    // 监控结局分布
    monitorEndingDistribution(endingStats) {
        const total = Object.values(endingStats).reduce((a, b) => a + b, 0);
        const distribution = {};
        
        for (const [ending, count] of Object.entries(endingStats)) {
            distribution[ending] = count / total;
        }
        
        // 检测不平衡
        const maxFreq = Math.max(...Object.values(distribution));
        const minFreq = Math.min(...Object.values(distribution));
        
        const imbalance = maxFreq / minFreq;
        
        return {
            distribution,
            imbalance,
            needsAdjustment: imbalance > 5.0  // 最大最小差距超过 5 倍
        };
    }
}
```

#### B. 平衡调整策略

```javascript
// 动态平衡调整策略
BalanceAdjustmentStrategies = {
    // 策略 1: 事件概率动态调整
    event_probability_adjustment: {
        trigger: "event_frequency_imbalance",
        action: (eventId, currentFreq, targetFreq) => {
            const adjustment = targetFreq / currentFreq;
            allEvents[eventId].baseProbability *= adjustment;
            
            // 记录调整日志
            logAdjustment({
                type: "probability",
                eventId,
                oldProb: allEvents[eventId].baseProbability,
                newProb: allEvents[eventId].baseProbability * adjustment,
                reason: "frequency_imbalance"
            });
        }
    },
    
    // 策略 2: 分支难度调整
    branch_difficulty_adjustment: {
        trigger: "branch_completion_rate",
        action: (branchId, completionRate) => {
            if (completionRate < 0.1) {
                // 完成率低，降低难度
                allBranches[branchId].requirements.LEP *= 0.9;
            } else if (completionRate > 0.5) {
                // 完成率高，提高难度
                allBranches[branchId].requirements.LEP *= 1.1;
            }
        }
    },
    
    // 策略 3: 结局权重调整
    ending_weight_adjustment: {
        trigger: "ending_distribution_imbalance",
        action: (endingId, frequency) => {
            if (frequency < 0.05) {
                // 罕见结局，提高权重
                endingWeights[endingId] *= 1.2;
            } else if (frequency > 0.4) {
                // 常见结局，降低权重
                endingWeights[endingId] *= 0.9;
            }
        }
    },
    
    // 策略 4: 玩家体验优化
    player_experience_optimization: {
        trigger: "player_satisfaction_low",
        action: (metrics) => {
            // 如果玩家满意度低，增加正面事件概率
            if (metrics.satisfaction < 0.6) {
                for (const event of positiveEvents) {
                    event.baseProbability *= 1.1;
                }
            }
            
            // 如果挫折感高，减少负面事件
            if (metrics.frustration > 0.7) {
                for (const event of negativeEvents) {
                    event.baseProbability *= 0.9;
                }
            }
        }
    }
}
```

---

## 📊 第四部分：实现方案

### 4.1 技术架构

```
┌─────────────────────────────────────────────────────────┐
│                    前端展示层                            │
│  (React/Vue + TypeScript)                               │
│  - 剧情节点渲染                                         │
│  - 选择 UI 组件                                          │
│  - 反馈动画                                             │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                    游戏逻辑层                            │
│  (JavaScript/TypeScript)                                │
│  - 剧情引擎 (PlotEngine)                                │
│  - 事件系统 (EventSystem)                               │
│  - 选择系统 (ChoiceSystem)                              │
│  - 状态追踪 (StateTracker)                              │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                    数据管理层                            │
│  (JSON + IndexedDB)                                     │
│  - 剧情数据库                                           │
│  - 事件数据库                                           │
│  - 存档系统                                             │
│  - 统计分析                                             │
└─────────────────────────────────────────────────────────┘
```

### 4.2 核心模块实现

由于内容庞大，核心模块代码将在单独文件中实现。

---

## 📝 总结

本设计文档提出了一套完整的**融合式剧情设计系统**，成功将《瘟疫公司》的进化路径机制与 P 社游戏的多分支叙事结构融合。

### 核心创新

1. ✅ **剧情进化树**: 将线性叙事改为可演化网络
2. ✅ **五维影响模型**: 多维度量化选择影响
3. ✅ **动态事件组合**: 智能生成连贯事件序列
4. ✅ **叙事连贯性保障**: 语义网络 + 逻辑检查

### 实施价值

- **可玩性提升**: 每次重开都是独特人生
- **代入感增强**: 选择有真实影响
- **重复可玩性**: 多结局 + 隐藏要素
- **技术可行性**: 基于现有架构可扩展

---

**文档版本**: 1.0  
**创建日期**: 2026-03-09  
**下一步**: 实现核心模块代码

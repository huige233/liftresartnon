import { clone } from './functions/util.js';
import { checkCondition } from './functions/condition.js';

/**
 * 事件状态枚举
 */
const EventState = {
    AVAILABLE: 'available',      // 可触发
    TRIGGERED: 'triggered',      // 已触发
    COOLDOWN: 'cooldown',        // 冷却中
    DISABLED: 'disabled',        // 已禁用
    COMPLETED: 'completed'       // 已完成
};

/**
 * 事件优先级枚举
 */
const EventPriority = {
    LOW: 1,
    NORMAL: 2,
    HIGH: 3,
    CRITICAL: 4
};

/**
 * 增强版事件系统 - 支持P社风格的事件机制
 */
class EnhancedEventSystem {
    constructor() {
        // 事件池
        this._events = new Map();

        // 事件状态管理
        this._eventStates = new Map();

        // 全局标志
        this._globalFlags = new Map();

        // 事件触发历史
        this._triggerHistory = new Map();

        // 事件权重缓存
        this._weightCache = new Map();

        // 事件链追踪
        this._eventChain = [];

        // 配置
        this._config = {};
    }

    /**
     * 初始化事件系统
     */
    initial({ events, config = {} }) {
        this._config = {
            enableCooldown: config.enableCooldown ?? true,
            cooldownDuration: config.cooldownDuration ?? 10,
            maxEventChainLength: config.maxEventChainLength ?? 5,
            enableWeightSystem: config.enableWeightSystem ?? true,
            ...config
        };

        // 加载事件数据
        this._loadEvents(events);

        // 初始化事件状态
        this._initializeEventStates();

        console.log(`[EventSystem] 初始化完成，共加载 ${this._events.size} 个事件`);
    }

    /**
     * 加载事件数据
     */
    _loadEvents(events) {
        for (const [id, eventData] of Object.entries(events)) {
            const event = this._normalizeEvent(id, eventData);
            this._events.set(id, event);
        }
    }

    /**
     * 标准化事件数据
     */
    _normalizeEvent(id, eventData) {
        const event = {
            id: Number(id),
            ...eventData,
            weight: eventData.weight ?? 100,
            priority: eventData.priority ?? EventPriority.NORMAL,
            cooldown: eventData.cooldown ?? 0,
            maxTriggers: eventData.maxTriggers ?? Infinity,
            triggerCount: 0,
            lastTriggerTime: 0
        };

        // 处理分支条件
        if (event.branch) {
            event.branch = event.branch.map(branch => {
                if (typeof branch === 'string') {
                    const [cond, next] = branch.split(':');
                    return { condition: cond.trim(), nextEvent: Number(next) };
                }
                return branch;
            });
        }

        // 处理互斥事件
        if (event.mutuallyExclusive) {
            event.mutuallyExclusive = Array.isArray(event.mutuallyExclusive)
                ? event.mutuallyExclusive.map(Number)
                : [Number(event.mutuallyExclusive)];
        }

        return event;
    }

    /**
     * 初始化事件状态
     */
    _initializeEventStates() {
        for (const [id] of this._events) {
            this._eventStates.set(id, EventState.AVAILABLE);
            this._triggerHistory.set(id, []);
        }
    }

    /**
     * 获取可触发的事件列表
     */
    getAvailableEvents(property) {
        const availableEvents = [];

        for (const [id, event] of this._events) {
            if (this._canTrigger(id, event, property)) {
                availableEvents.push({
                    id: event.id,
                    event: event.event,
                    weight: this._calculateEventWeight(event, property),
                    priority: event.priority
                });
            }
        }

        // 按优先级和权重排序
        return availableEvents.sort((a, b) => {
            if (a.priority !== b.priority) {
                return b.priority - a.priority;
            }
            return b.weight - a.weight;
        });
    }

    /**
     * 检查事件是否可以触发
     */
    _canTrigger(id, event, property) {
        const state = this._eventStates.get(id);

        // 检查状态
        if (state === EventState.DISABLED || state === EventState.COOLDOWN) {
            return false;
        }

        // 检查触发次数限制
        if (event.triggerCount >= event.maxTriggers) {
            return false;
        }

        // 检查互斥事件
        if (event.mutuallyExclusive) {
            for (const exclusiveId of event.mutuallyExclusive) {
                if (this._eventStates.get(String(exclusiveId)) === EventState.TRIGGERED) {
                    return false;
                }
            }
        }

        // 检查条件
        if (event.exclude && checkCondition(property, event.exclude)) {
            return false;
        }

        if (event.include && !checkCondition(property, event.include)) {
            return false;
        }

        // 检查NoRandom标志
        if (event.NoRandom) {
            return false;
        }

        return true;
    }

    /**
     * 计算事件权重
     */
    _calculateEventWeight(event, property) {
        if (!this._config.enableWeightSystem) {
            return event.weight;
        }

        const cacheKey = `${event.id}_${JSON.stringify(property)}`;
        if (this._weightCache.has(cacheKey)) {
            return this._weightCache.get(cacheKey);
        }

        let weight = event.weight;

        // 应用权重修正
        if (event.weightModifiers) {
            for (const modifier of event.weightModifiers) {
                if (checkCondition(property, modifier.condition)) {
                    weight += modifier.modifier;
                }
            }
        }

        // 确保权重非负
        weight = Math.max(0, weight);

        this._weightCache.set(cacheKey, weight);
        return weight;
    }

    /**
     * 触发事件
     */
    triggerEvent(eventId, property) {
        const event = this._events.get(String(eventId));
        if (!event) {
            throw new Error(`[EventSystem] 事件不存在: ${eventId}`);
        }

        if (!this._canTrigger(String(eventId), event, property)) {
            return null;
        }

        // 更新事件状态
        this._updateEventState(String(eventId), EventState.TRIGGERED);
        event.triggerCount++;
        event.lastTriggerTime = Date.now();

        // 记录触发历史
        this._triggerHistory.get(String(eventId)).push({
            timestamp: Date.now(),
            property: clone(property)
        });

        // 处理事件链
        this._eventChain.push(eventId);
        if (this._eventChain.length > this._config.maxEventChainLength) {
            this._eventChain.shift();
        }

        // 执行事件效果
        const result = this._executeEvent(event, property);

        // 设置冷却时间
        if (event.cooldown > 0 && this._config.enableCooldown) {
            setTimeout(() => {
                this._updateEventState(String(eventId), EventState.AVAILABLE);
            }, event.cooldown * 1000);
        }

        return result;
    }

    /**
     * 执行事件
     */
    _executeEvent(event, property) {
        const result = {
            eventId: event.id,
            description: event.event,
            effect: event.effect || {},
            postEvent: event.postEvent,
            nextEvent: null
        };

        // 处理分支
        if (event.branch) {
            for (const branch of event.branch) {
                if (checkCondition(property, branch.condition)) {
                    result.nextEvent = branch.nextEvent;
                    break;
                }
            }
        }

        // 处理全局标志
        if (event.setFlags) {
            for (const [flag, value] of Object.entries(event.setFlags)) {
                this._globalFlags.set(flag, value);
            }
        }

        return result;
    }

    /**
     * 更新事件状态
     */
    _updateEventState(eventId, state) {
        this._eventStates.set(eventId, state);
    }

    /**
     * 设置全局标志
     */
    setGlobalFlag(flag, value) {
        this._globalFlags.set(flag, value);
    }

    /**
     * 获取全局标志
     */
    getGlobalFlag(flag) {
        return this._globalFlags.get(flag);
    }

    /**
     * 禁用事件
     */
    disableEvent(eventId) {
        this._updateEventState(String(eventId), EventState.DISABLED);
    }

    /**
     * 启用事件
     */
    enableEvent(eventId) {
        this._updateEventState(String(eventId), EventState.AVAILABLE);
    }

    /**
     * 重置事件状态
     */
    resetEvent(eventId) {
        const event = this._events.get(String(eventId));
        if (event) {
            event.triggerCount = 0;
            event.lastTriggerTime = 0;
        }
        this._updateEventState(String(eventId), EventState.AVAILABLE);
        this._triggerHistory.set(String(eventId), []);
    }

    /**
     * 获取事件统计信息
     */
    getEventStats(eventId) {
        const event = this._events.get(String(eventId));
        if (!event) return null;

        return {
            id: event.id,
            triggerCount: event.triggerCount,
            lastTriggerTime: event.lastTriggerTime,
            triggerHistory: this._triggerHistory.get(String(eventId)),
            currentState: this._eventStates.get(String(eventId))
        };
    }

    /**
     * 获取当前事件链
     */
    getEventChain() {
        return [...this._eventChain];
    }

    /**
     * 清空事件链
     */
    clearEventChain() {
        this._eventChain = [];
    }

    /**
     * 获取事件总数
     */
    count() {
        return this._events.size;
    }

    /**
     * 获取事件信息（向后兼容）
     */
    get(eventId) {
        const event = this._events.get(String(eventId));
        if (!event) {
            throw new Error(`[EventSystem] 事件不存在: ${eventId}`);
        }
        return clone(event);
    }

    /**
     * 检查事件条件（向后兼容）
     */
    check(eventId, property) {
        const event = this._events.get(String(eventId));
        if (!event) return false;

        return this._canTrigger(String(eventId), event, property);
    }

    /**
     * 执行事件（向后兼容）
     */
    do(eventId, property) {
        const result = this.triggerEvent(eventId, property);
        if (!result) return null;

        // 转换为旧格式
        return {
            effect: result.effect,
            next: result.nextEvent,
            description: result.description,
            postEvent: result.postEvent
        };
    }
}

export default EnhancedEventSystem;
export { EventState, EventPriority };
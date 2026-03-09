import EnhancedEventSystem, { EventState, EventPriority } from '../src/event_v2.js';

// Mock property object for testing
class MockProperty {
    constructor(data = {}) {
        this.data = { ...data };
    }

    get(key) {
        return this.data[key] || 0;
    }

    set(key, value) {
        this.data[key] = value;
    }
}

describe('EnhancedEventSystem', () => {
    let eventSystem;
    let mockProperty;

    beforeEach(() => {
        eventSystem = new EnhancedEventSystem();
        mockProperty = new MockProperty({
            AGE: 10,
            STR: 5,
            INT: 8,
            MNY: 3,
            SPR: 7,
            LIF: 1
        });

        // Test event data
        const testEvents = {
            '10001': {
                id: 10001,
                event: '基础事件测试',
                effect: { MNY: 1 },
                weight: 100,
                priority: EventPriority.NORMAL
            },
            '10002': {
                id: 10002,
                event: '条件事件测试',
                effect: { STR: 2 },
                include: 'STR>3',
                exclude: 'INT<5'
            },
            '10003': {
                id: 10003,
                event: '分支事件测试',
                effect: { INT: 1 },
                branch: [
                    'STR>6:10004',
                    'INT>7:10005'
                ]
            },
            '10004': {
                id: 10004,
                event: '分支目标事件1',
                effect: { SPR: 2 }
            },
            '10005': {
                id: 10005,
                event: '分支目标事件2',
                effect: { LIF: 1 }
            },
            '10006': {
                id: 10006,
                event: '冷却事件测试',
                effect: { MNY: -1 },
                cooldown: 1,
                maxTriggers: 2
            },
            '10007': {
                id: 10007,
                event: '互斥事件测试1',
                effect: { STR: 1 },
                mutuallyExclusive: [10008]
            },
            '10008': {
                id: 10008,
                event: '互斥事件测试2',
                effect: { INT: 1 },
                mutuallyExclusive: [10007]
            },
            '10009': {
                id: 10009,
                event: '权重修正事件',
                effect: { SPR: 1 },
                weight: 50,
                weightModifiers: [
                    { condition: 'STR>4', modifier: 30 },
                    { condition: 'INT>6', modifier: 20 }
                ]
            },
            '10010': {
                id: 10010,
                event: '全局标志事件',
                effect: { MNY: 2 },
                setFlags: {
                    'test_flag': true,
                    'counter': 5
                }
            }
        };

        eventSystem.initial({ events: testEvents });
    });

    test('系统初始化', () => {
        expect(eventSystem.count()).toBe(10);
    });

    test('获取可触发事件列表', () => {
        const availableEvents = eventSystem.getAvailableEvents(mockProperty);
        expect(availableEvents.length).toBeGreaterThan(0);

        // 检查排序：优先级高的在前
        const priorities = availableEvents.map(e => e.priority);
        for (let i = 1; i < priorities.length; i++) {
            expect(priorities[i]).toBeLessThanOrEqual(priorities[i - 1]);
        }
    });

    test('基础事件触发', () => {
        const result = eventSystem.triggerEvent(10001, mockProperty);
        expect(result).toBeTruthy();
        expect(result.description).toBe('基础事件测试');
        expect(result.effect.MNY).toBe(1);
    });

    test('条件事件触发', () => {
        // 应该能触发（STR>3且INT>5）
        const result1 = eventSystem.triggerEvent(10002, mockProperty);
        expect(result1).toBeTruthy();

        // 修改属性使条件不满足
        mockProperty.set('STR', 2);
        const result2 = eventSystem.triggerEvent(10002, mockProperty);
        expect(result2).toBeNull();
    });

    test('分支事件处理', () => {
        const result = eventSystem.triggerEvent(10003, mockProperty);
        expect(result).toBeTruthy();
        // 应该匹配第二个分支（INT>7）
        expect(result.nextEvent).toBe(10005);
    });

    test('冷却机制', async () => {
        // 第一次触发
        const result1 = eventSystem.triggerEvent(10006, mockProperty);
        expect(result1).toBeTruthy();

        // 立即再次触发应该失败（冷却中）
        const result2 = eventSystem.triggerEvent(10006, mockProperty);
        expect(result2).toBeNull();

        // 等待冷却结束
        await new Promise(resolve => setTimeout(resolve, 1100));

        // 第二次触发应该成功
        const result3 = eventSystem.triggerEvent(10006, mockProperty);
        expect(result3).toBeTruthy();

        // 第三次触发应该失败（达到最大触发次数）
        const result4 = eventSystem.triggerEvent(10006, mockProperty);
        expect(result4).toBeNull();
    });

    test('互斥事件机制', () => {
        // 触发第一个互斥事件
        const result1 = eventSystem.triggerEvent(10007, mockProperty);
        expect(result1).toBeTruthy();

        // 第二个互斥事件应该无法触发
        const result2 = eventSystem.triggerEvent(10008, mockProperty);
        expect(result2).toBeNull();

        // 重置第一个事件
        eventSystem.resetEvent(10007);

        // 现在可以触发第二个事件
        const result3 = eventSystem.triggerEvent(10008, mockProperty);
        expect(result3).toBeTruthy();
    });

    test('权重计算', () => {
        const originalWeight = 50;
        const expectedWeight = originalWeight + 30 + 20; // STR>4和INT>6都满足

        const availableEvents = eventSystem.getAvailableEvents(mockProperty);
        const weightEvent = availableEvents.find(e => e.id === 10009);

        expect(weightEvent.weight).toBe(expectedWeight);
    });

    test('全局标志系统', () => {
        // 触发设置全局标志的事件
        const result = eventSystem.triggerEvent(10010, mockProperty);
        expect(result).toBeTruthy();

        // 检查全局标志是否设置
        expect(eventSystem.getGlobalFlag('test_flag')).toBe(true);
        expect(eventSystem.getGlobalFlag('counter')).toBe(5);

        // 手动设置全局标志
        eventSystem.setGlobalFlag('custom_flag', 'custom_value');
        expect(eventSystem.getGlobalFlag('custom_flag')).toBe('custom_value');
    });

    test('事件状态管理', () => {
        // 禁用事件
        eventSystem.disableEvent(10001);
        const result1 = eventSystem.triggerEvent(10001, mockProperty);
        expect(result1).toBeNull();

        // 启用事件
        eventSystem.enableEvent(10001);
        const result2 = eventSystem.triggerEvent(10001, mockProperty);
        expect(result2).toBeTruthy();

        // 重置事件
        eventSystem.resetEvent(10001);
        const stats = eventSystem.getEventStats(10001);
        expect(stats.triggerCount).toBe(0);
        expect(stats.currentState).toBe(EventState.AVAILABLE);
    });

    test('事件链追踪', () => {
        eventSystem.triggerEvent(10001, mockProperty);
        eventSystem.triggerEvent(10002, mockProperty);
        eventSystem.triggerEvent(10003, mockProperty);

        const eventChain = eventSystem.getEventChain();
        expect(eventChain).toEqual([10001, 10002, 10003]);

        // 清空事件链
        eventSystem.clearEventChain();
        expect(eventSystem.getEventChain()).toEqual([]);
    });

    test('向后兼容性', () => {
        // 测试旧版接口
        const canTrigger = eventSystem.check(10001, mockProperty);
        expect(canTrigger).toBe(true);

        const eventInfo = eventSystem.get(10001);
        expect(eventInfo.event).toBe('基础事件测试');

        const doResult = eventSystem.do(10001, mockProperty);
        expect(doResult.description).toBe('基础事件测试');
        expect(doResult.effect.MNY).toBe(1);
    });

    test('错误处理', () => {
        // 不存在的ID应该抛出错误
        expect(() => eventSystem.get(99999)).toThrow('事件不存在');

        // 触发不存在的事件应该抛出错误
        expect(() => eventSystem.triggerEvent(99999, mockProperty)).toThrow('事件不存在');
    });
});

describe('EventState and EventPriority enums', () => {
    test('EventState values', () => {
        expect(EventState.AVAILABLE).toBe('available');
        expect(EventState.TRIGGERED).toBe('triggered');
        expect(EventState.COOLDOWN).toBe('cooldown');
        expect(EventState.DISABLED).toBe('disabled');
        expect(EventState.COMPLETED).toBe('completed');
    });

    test('EventPriority values', () => {
        expect(EventPriority.LOW).toBe(1);
        expect(EventPriority.NORMAL).toBe(2);
        expect(EventPriority.HIGH).toBe(3);
        expect(EventPriority.CRITICAL).toBe(4);
    });
});
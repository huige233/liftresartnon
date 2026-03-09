import EnhancedEventSystem from '../src/event_v2.js';
import Event from '../src/event.js';

// 模拟属性对象
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

// 加载真实的事件数据
async function loadEventData() {
    const response = await fetch('../data/events.json');
    return await response.json();
}

// 集成测试
async function runIntegrationTest() {
    console.log('🚀 开始事件系统集成测试...\n');

    try {
        // 加载真实事件数据
        const eventData = await loadEventData();

        // 创建新旧两个事件系统实例
        const oldSystem = new Event();
        const newSystem = new EnhancedEventSystem();

        // 初始化系统
        oldSystem.initial({ events: eventData });
        newSystem.initial({ events: eventData });

        console.log(`📊 事件总数: ${oldSystem.count()} (旧系统) vs ${newSystem.count()} (新系统)`);

        // 测试属性
        const testProperty = new MockProperty({
            AGE: 10,
            STR: 5,
            INT: 8,
            MNY: 3,
            SPR: 7,
            LIF: 1
        });

        // 测试向后兼容性
        console.log('\n🔍 测试向后兼容性...');

        // 测试几个关键事件
        const testEvents = ['10001', '10002', '10003', '10004', '10005'];

        for (const eventId of testEvents) {
            console.log(`\n测试事件 ${eventId}:`);

            // 检查条件
            const oldCheck = oldSystem.check(eventId, testProperty);
            const newCheck = newSystem.check(eventId, testProperty);
            console.log(`  条件检查: 旧系统=${oldCheck}, 新系统=${newCheck}`);

            // 获取事件信息
            const oldInfo = oldSystem.get(eventId);
            const newInfo = newSystem.get(eventId);
            console.log(`  事件描述: ${oldInfo.event}`);

            // 执行事件
            const oldResult = oldSystem.do(eventId, testProperty);
            const newResult = newSystem.do(eventId, testProperty);

            if (oldResult && newResult) {
                console.log(`  执行结果: 效果=${JSON.stringify(oldResult.effect)}`);
                console.log(`  向后兼容: ${JSON.stringify(oldResult.effect) === JSON.stringify(newResult.effect) ? '✅' : '❌'}`);
            } else {
                console.log(`  执行结果: 无法触发`);
            }
        }

        // 测试新功能
        console.log('\n🎯 测试新功能...');

        // 测试事件池管理
        const availableEvents = newSystem.getAvailableEvents(testProperty);
        console.log(`  可触发事件数: ${availableEvents.length}`);

        // 测试事件状态管理
        newSystem.disableEvent('10001');
        const disabledCheck = newSystem.check('10001', testProperty);
        console.log(`  禁用事件测试: ${disabledCheck ? '❌' : '✅'}`);

        newSystem.enableEvent('10001');
        const enabledCheck = newSystem.check('10001', testProperty);
        console.log(`  启用事件测试: ${enabledCheck ? '✅' : '❌'}`);

        // 测试全局标志
        newSystem.setGlobalFlag('test_flag', 'test_value');
        const flagValue = newSystem.getGlobalFlag('test_flag');
        console.log(`  全局标志测试: ${flagValue === 'test_value' ? '✅' : '❌'}`);

        // 测试事件统计
        const stats = newSystem.getEventStats('10001');
        console.log(`  事件统计测试: ${stats ? '✅' : '❌'}`);

        console.log('\n🎉 集成测试完成！');

    } catch (error) {
        console.error('❌ 集成测试失败:', error);
    }
}

// 运行性能对比测试
async function runPerformanceTest() {
    console.log('\n⚡ 开始性能对比测试...');

    try {
        const eventData = await loadEventData();
        const testProperty = new MockProperty({
            AGE: 20,
            STR: 6,
            INT: 7,
            MNY: 4,
            SPR: 8,
            LIF: 1
        });

        // 旧系统性能测试
        console.log('\n测试旧系统性能...');
        const oldSystem = new Event();
        oldSystem.initial({ events: eventData });

        const oldStart = performance.now();
        for (let i = 0; i < 1000; i++) {
            oldSystem.check('10001', testProperty);
        }
        const oldEnd = performance.now();
        console.log(`  旧系统1000次检查耗时: ${(oldEnd - oldStart).toFixed(2)}ms`);

        // 新系统性能测试
        console.log('\n测试新系统性能...');
        const newSystem = new EnhancedEventSystem();
        newSystem.initial({ events: eventData });

        const newStart = performance.now();
        for (let i = 0; i < 1000; i++) {
            newSystem.check('10001', testProperty);
        }
        const newEnd = performance.now();
        console.log(`  新系统1000次检查耗时: ${(newEnd - newStart).toFixed(2)}ms`);

        // 性能对比
        const oldTime = oldEnd - oldStart;
        const newTime = newEnd - newStart;
        const performanceRatio = (oldTime / newTime).toFixed(2);

        console.log(`\n📈 性能对比: 新系统是旧系统的 ${performanceRatio} 倍`);

    } catch (error) {
        console.error('❌ 性能测试失败:', error);
    }
}

// 运行所有测试
async function runAllTests() {
    await runIntegrationTest();
    await runPerformanceTest();
}

// 如果在浏览器环境中运行
if (typeof window !== 'undefined') {
    window.runEventSystemTests = runAllTests;
    console.log('📋 测试脚本已加载，在控制台运行 runEventSystemTests() 开始测试');
} else {
    // 在Node.js环境中运行
    runAllTests().catch(console.error);
}
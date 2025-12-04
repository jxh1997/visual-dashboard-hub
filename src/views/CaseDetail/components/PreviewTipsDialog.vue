<template>
    <!-- 核心修复：拆解 v-model 为 prop 绑定 + 事件监听 -->
    <el-dialog 
        title="交互说明" 
        :model-value="modelValue"
        @update:model-value="handleModelValueChange"
        width="500px"
    >
        <ul class="tips-list">
            <li>鼠标滚轮：缩放大屏/地图</li>
            <li>鼠标拖拽：平移地图/图表视角</li>
            <li>Hover图表：显示数据详情</li>
            <li>点击区域：下钻查看明细数据（部分模板支持）</li>
        </ul>
    </el-dialog>
</template>

<script setup lang="ts">
import { ElDialog } from 'element-plus'

// 接收父组件传递的 props（严格类型定义）
const props = defineProps<{
    modelValue: boolean // 控制弹窗显隐的核心 prop
}>()

// 定义事件（规范写法：使用 TypeScript 类型约束）
const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
}>()

// 处理弹窗状态变化，通知父组件更新
const handleModelValueChange = (value: boolean) => {
    emit('update:modelValue', value)
}
</script>

<style scoped lang="scss">
// 引入全局变量（确保 $text-secondary 可识别）
@use "@/assets/styles/variables" as *;

.tips-list {
    padding-left: 20px;
    margin: 0;

    li {
        font-size: 14px;
        color: $text-secondary;
        line-height: 1.8;
        margin-bottom: 8px;

        // 优化：最后一个 li 去掉底部边距
        &:last-child {
            margin-bottom: 0;
        }
    }
}

// 可选：优化弹窗标题样式（与全局风格统一）
:deep(.el-dialog__title) {
    color: $text-primary;
    font-weight: 500;
}
</style>
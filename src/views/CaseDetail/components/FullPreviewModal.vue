<template>
    <el-dialog 
        title="全屏预览" 
        :model-value="modelValue" 
        @update:model-value="handleModelValueChange"
        width="90%" 
        top="20px"
        append-to-body
    >
        <!-- 大屏预览内容 -->
        <div class="preview-container">
            <slot />
        </div>
    </el-dialog>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { ElDialog } from 'element-plus'

// 关键修复：接收 defineProps 的返回值并赋值给 props 变量
const props = defineProps<{
    modelValue: boolean // 控制弹窗显隐
}>()

// 定义更新事件
const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
}>()

// 处理弹窗状态更新
const handleModelValueChange = (value: boolean) => {
    emit('update:modelValue', value)
}

// 修复：弹窗显示时直接调整ECharts，而非触发window.resize
watch(
    () => props.modelValue,
    (val) => {
        if (val) {
            nextTick(() => {
                const echartsInstances = window.echarts?.instances || []
                echartsInstances.forEach((instance: any) => {
                    try {
                        instance.resize()
                    } catch (e) {
                        console.warn('ECharts resize失败:', e)
                    }
                })
            })
        }
    }
)
</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.preview-container {
    width: 100%;
    height: 70vh;
    overflow: hidden;
    background-color: $bg-color;
    border-radius: 8px;
    padding: 16px;
}
</style>
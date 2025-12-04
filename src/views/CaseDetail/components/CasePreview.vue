<template>
    <div class="case-preview">
        <div class="preview-container">
            <DashboardLayout>
                <component :is="caseComponent" v-if="caseComponent" ref="previewComponentRef" />
                <div v-else class="empty-component">暂无可用的案例组件</div>
            </DashboardLayout>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, type Component } from 'vue'
import DashboardLayout from '@/components/layout/DashboardLayout.vue'

// 接收props
defineProps<{
    caseComponent: Component | null
}>()

// 定义ref
const previewComponentRef = ref<Component>(null)
</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.case-preview {
    background-color: #fff;
    border-radius: 8px;
    padding: 24px;
    margin-bottom: 20px;
    box-shadow: $shadow;

    .preview-container {
        height: 80vh;
        background-color: $card-bg;
        border-radius: 8px;
        overflow: hidden;
        position: relative;

        .empty-component {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            color: $text-secondary;
            font-size: 16px;
        }
    }
}

// 响应式适配
@media (max-width: 768px) {
    .case-preview .preview-container {
        height: 50vh;
    }
}
</style>
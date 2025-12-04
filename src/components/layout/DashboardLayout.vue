<template>
    <v-scale-screen :width="1920" :height="1080" :mode="scaleMode" :delay="300" :center="true" class="dashboard-layout">
        <slot></slot>
    </v-scale-screen>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useResponsive } from '@/hooks/useResponsive'

const { isMobile } = useResponsive()

// 缩放模式：移动端优先按高度，其他按宽度
const scaleMode = computed(() => isMobile.value ? 'height-first' : 'width-first')
</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.dashboard-layout {
    width: 100vw;
    height: 100%;
    overflow: hidden;
    background-color: $bg-color;

    :deep(.v-scale-screen-container) {
        @media (max-width: 1200px) {
            padding: 16px;
            border-radius: 8px;
            box-shadow: $shadow;
        }
    }
}
</style>
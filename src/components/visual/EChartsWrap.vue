<template>
    <div ref="chartRef" class="echarts-wrap" :style="wrapStyle"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'
import * as echarts from 'echarts'
import type { EChartsOption, ECharts } from 'echarts'
import { useResponsive } from '@/hooks/useResponsive'

const props = defineProps<{
    option: EChartsOption
    width?: string | number
    height?: string | number
    autoResize?: boolean
    theme?: 'light' | 'dark'
}>()

const emit = defineEmits<{
    (e: 'init', chart: ECharts): void
    (e: 'resize'): void
}>()

const chartRef = ref<HTMLDivElement>(null)
const chartInstance = ref<ECharts | null>(null)
const { isMobile } = useResponsive()

const wrapStyle = computed(() => ({
    width: props.width || '100%',
    height: props.height || (isMobile.value ? '300px' : '100%'),
    margin: '0 auto',
}))

const initChart = () => {
    if (!chartRef.value) return
    chartInstance.value = echarts.init(
        chartRef.value,
        props.theme === 'dark' ? 'dark' : undefined
    )
    chartInstance.value.setOption(props.option)
    emit('init', chartInstance.value)
}

watch(
    () => props.option,
    (newOption) => chartInstance.value?.setOption(newOption, true),
    { deep: true }
)

const handleResize = () => {
    if (props.autoResize && chartInstance.value) {
        chartInstance.value.resize()
        emit('resize')
    }
}

onMounted(() => {
    initChart()
    window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
    chartInstance.value?.dispose()
})
</script>

<style scoped lang="scss">
.echarts-wrap {
    transition: all 0.3s ease;
    background-color: inherit;
}
</style>
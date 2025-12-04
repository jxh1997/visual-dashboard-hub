<template>
    <div class="case-detail-container">
        <!-- 操作按钮区 -->
        <CaseActions v-if="caseInfo && !isLoading" @openFullPreview="openFullPreview" @toggleCollect="toggleCollect"
            @downloadTemplate="downloadTemplate" @showPreviewTips="showPreviewTips = !showPreviewTips" />

        <!-- 加载状态 -->
        <el-skeleton v-if="isLoading" :loading="isLoading" animated class="case-skeleton">
            <template #template>
                <div class="case-preview-skeleton" style="height: 80vh;"></div>
            </template>
        </el-skeleton>

        <!-- 大屏预览区 -->
        <CasePreview v-else-if="caseInfo" :caseComponent="caseComponent" ref="previewComponentRef" />

        <!-- 核心信息区 -->
        <CaseInfoSection v-if="caseInfo && !isLoading" :basicInfo="caseInfo.basicInfo" @copyReuseCode="copyReuseCode" />

        <!-- 空状态 -->
        <div class="empty-case" v-else>
            <el-empty description="暂无案例数据"></el-empty>
        </div>

        <!-- 全屏预览弹窗 -->
        <FullPreviewModal v-model="showFullPreview" :caseName="caseInfo?.name" :caseComponent="caseComponent"
            @refresh="refreshFullPreview" />

        <!-- 交互说明弹窗 -->
        <PreviewTipsDialog v-model="showPreviewTips" />
    </div>
</template>

<script setup lang="ts">
import { ref, watch, type Component, onUnmounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCaseStore } from '@/stores/caseStore'
import { ElMessage, ElEmpty, ElSkeleton } from 'element-plus'

// 导入子组件
import CaseActions from './components/CaseActions.vue'
import CasePreview from './components/CasePreview.vue'
import CaseInfoSection from './components/CaseInfoSection.vue'
import FullPreviewModal from './components/FullPreviewModal.vue'
import PreviewTipsDialog from './components/PreviewTipsDialog.vue'

// 类型定义
interface CaseInfo {
    id: string
    name: string
    category: string
    component: string
    tags?: string[]
    desc?: string
    basicInfo?: {
        scenario?: string
        techStack?: string
        adaptTerminal?: string
        dataAccess?: string
    }
}

interface RecommendItem {
    id: string
    name: string
    thumbnail: string
    tags: string[]
}

// 初始化依赖
const route = useRoute()
const router = useRouter()
const caseStore = useCaseStore()

// 响应式状态
const caseInfo = ref<CaseInfo | null>(null)
const caseComponent = ref<Component | null>(null)
const isLoading = ref<boolean>(true)
const isCollected = ref(false)
const showFullPreview = ref(false)
const showPreviewTips = ref(false)
const previewComponentRef = ref<Component>(null)

// 相关推荐列表
const recommendList = ref<RecommendItem[]>([
    {
        id: 'case-002',
        name: '实时运维监控大屏',
        thumbnail: '/images/templates/monitor.png',
        tags: ['实时监控', '运维大屏']
    },
    {
        id: 'case-003',
        name: '电商销售分析大屏',
        thumbnail: '/images/templates/ecommerce.png',
        tags: ['电商大屏', '销售分析']
    },
    {
        id: 'case-004',
        name: '物流追踪3D大屏',
        thumbnail: '/images/templates/logistics.png',
        tags: ['GIS大屏', '3D可视化']
    }
])

/**
 * 安全获取路由中的案例ID
 */
const getValidCaseId = (): string => {
    const caseId = (route.params.id as string)?.trim() || ''
    return caseId
}

/**
 * 通知ECharts重新调整大小（核心修复：直接调用echarts实例resize，而非触发window.resize）
 */
const resizeEcharts = () => {
    // 等待DOM更新完成
    nextTick(() => {
        // 遍历页面中所有echarts实例并resize
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

/**
 * 加载案例数据
 */
const loadCaseData = async () => {
    try {
        isLoading.value = true
        const caseId = getValidCaseId()

        if (!caseId) {
            ElMessage.warning('案例ID不能为空')
            await router.push({ name: 'Home' })
            return
        }

        const caseData = caseStore.getCaseById(caseId)
        if (!caseData) {
            ElMessage.error('未找到该案例数据')
            await router.push({ name: 'Home' })
            return
        }

        // 补充默认基础信息
        caseInfo.value = {
            ...caseData,
            basicInfo: caseData.basicInfo || {
                scenario: '适用于企业数据可视化展示、业务监控、决策分析等场景',
                techStack: 'Vue3 + TypeScript + ECharts 5 + ECharts-GL + Grid布局',
                adaptTerminal: '16:9大屏/LED拼接屏/PC端（推荐分辨率1920*1080）',
                dataAccess: 'JSON/REST API/WebSocket，支持增量数据更新'
            }
        }

        // 动态导入组件
        const componentPath = `/src/components/case/${caseData.category}/${caseData.component}.vue`
        const modules = import.meta.glob('/src/components/case/**/*.vue')

        if (!modules[componentPath]) {
            throw new Error(`组件路径不存在：${componentPath}`)
        }

        const module = await modules[componentPath]()
        caseComponent.value = module.default

        // 组件加载完成后调整ECharts大小
        resizeEcharts()

    } catch (error) {
        console.error('[案例数据加载失败]', error)
        ElMessage.error('案例加载失败，请稍后重试')
        caseInfo.value = null
        caseComponent.value = null
    } finally {
        isLoading.value = false
    }
}

// 交互方法
const toggleCollect = () => {
    isCollected.value = !isCollected.value
    ElMessage.success(isCollected.value ? '收藏成功' : '取消收藏成功')
}

const downloadTemplate = () => {
    if (!caseInfo.value) return
    const link = document.createElement('a')
    link.href = `/downloads/${caseInfo.value.id}.zip`
    link.download = `${caseInfo.value.name}-模板源码.zip`
    link.click()
    ElMessage.success('模板下载成功，请注意查收')
}

const openFullPreview = () => {
    showFullPreview.value = true
    // 弹窗打开后调整ECharts大小（替代触发window.resize）
    resizeEcharts()
}

const refreshFullPreview = () => {
    caseComponent.value = null
    setTimeout(() => {
        loadCaseData()
        ElMessage.success('预览刷新成功')
    }, 100)
}

const copyReuseCode = () => {
    const code = `// 大屏组件引入示例
import ${caseInfo.value?.component} from '@/components/case/${caseInfo.value?.category}/${caseInfo.value?.component}.vue'

// ECharts自适应配置
const initChart = () => {
  const chart = echarts.init(document.getElementById('chart'))
  chart.setOption(option)
  window.addEventListener('resize', () => chart.resize())
}`
    navigator.clipboard.writeText(code).then(() => {
        ElMessage.success('核心配置复制成功')
    })
}

const goToDetail = (id: string) => {
    router.push({ name: 'CaseDetail', params: { id } })
}

// 监听路由变化（修复：移除deep: true，因为id是字符串）
watch(
    () => route.params.id,
    () => loadCaseData(),
    { immediate: true }
)

// 监听窗口resize（核心修复：直接调整ECharts，而非触发新的resize事件）
const resizeHandler = () => resizeEcharts()
window.addEventListener('resize', resizeHandler)

// 组件卸载时清理监听
onUnmounted(() => {
    window.removeEventListener('resize', resizeHandler)
})
</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.case-detail-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 20px;
    min-height: calc(100vh - 64px);
    background-color: #f5f7fa;
}

// 骨架屏样式
.case-skeleton {
    width: 100%;
    background-color: #fff;
    border-radius: 8px;
    padding: 20px;
    box-shadow: $shadow;

    .case-preview-skeleton {
        background-color: $card-bg;
        border-radius: 8px;
        width: 100%;
    }
}

// 空状态样式
.empty-case {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 80vh;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: $shadow;
}

// 响应式适配
@media (max-width: 768px) {
    .case-detail-container {
        padding: 10px;
        min-height: calc(100vh - 64px);
    }
}
</style>
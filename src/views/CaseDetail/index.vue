<template>
    <div class="case-detail-container">
        <!-- 加载状态 -->
        <el-skeleton v-if="isLoading" :loading="isLoading" animated class="case-skeleton">
            <template #template>
                <div class="case-preview-skeleton" style="height: 80vh;"></div>
            </template>
        </el-skeleton>

        <!-- 案例在线体验区 -->
        <div class="case-preview" v-else-if="caseInfo">
            <div class="preview-container">
                <!-- 大屏适配布局 -->
                <DashboardLayout>
                    <!-- 动态渲染案例组件 -->
                    <component :is="caseComponent" v-if="caseComponent" />
                    <div v-else class="empty-component">暂无可用的案例组件</div>
                </DashboardLayout>
            </div>
        </div>

        <!-- 空状态 -->
        <div class="empty-case" v-else>
            <el-empty description="暂无案例数据"></el-empty>
        </div>
    </div>
</template>

<script setup lang="ts">
interface CaseInfo {
    id: string
    name: string
    category: string
    component: string
    tags?: string[]
    desc?: string
}

// 路由与Vue核心依赖
import { ref, watch, type Component } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// 业务依赖
import { useCaseStore } from '@/stores/caseStore'
import DashboardLayout from '@/components/layout/DashboardLayout.vue'

// UI组件
import { ElMessage, ElEmpty, ElSkeleton } from 'element-plus'

// 路由实例
const route = useRoute()
const router = useRouter()

// Store 实例
const caseStore = useCaseStore()

// 响应式状态
const caseInfo = ref<CaseInfo | null>(null)       // 案例基础信息
const caseComponent = ref<Component | null>(null) // 动态加载的案例组件
const isLoading = ref<boolean>(true)              // 数据加载状态

/**
 * 安全获取路由中的案例ID（处理空值/空格）
 */
const getValidCaseId = (): string => {
    const caseId = (route.params.id as string)?.trim() || ''
    return caseId
}

/**
 * 加载案例完整数据（信息+组件）
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
        caseInfo.value = caseData

        // 🔥 修复动态导入：手动解析@别名，拼接绝对路径
        const componentPath = `/src/components/case/${caseData.category}/${caseData.component}.vue`
        // 方式1：使用import.meta.glob预加载（推荐，Vite支持）
        const modules = import.meta.glob('/src/components/case/**/*.vue')
        const module = await modules[componentPath]()
        
        // 方式2：若方式1不行，直接拼接绝对路径（不使用@别名）
        // const module = await import(`/src/components/case/${caseData.category}/${caseData.component}.vue`)

        caseComponent.value = module.default

    } catch (error) {
        console.error('[案例数据加载失败]', error)
        ElMessage.error('案例加载失败，请稍后重试')
        caseInfo.value = null
        caseComponent.value = null
    } finally {
        isLoading.value = false
    }
}

// 监听路由参数变化，重新加载案例
watch(
    () => route.params.id,
    () => loadCaseData(),
    { immediate: true, deep: true }
)
</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.case-detail-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 20px;
    min-height: calc(100vh - 80px); // 适配全局Header高度，避免遮挡

    // 骨架屏样式
    .case-skeleton {
        width: 100%;

        .case-preview-skeleton {
            background-color: $card-bg;
            border-radius: 8px;
            box-shadow: $shadow;
        }
    }

    // 空状态样式
    .empty-case {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 80vh;
    }

    .case-preview {
        .preview-container {
            height: 80vh;
            background-color: $card-bg;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: $shadow;

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
}

// 响应式适配
@media (max-width: 768px) {
    .case-detail-container {
        padding: 10px;

        .case-preview .preview-container {
            height: 50vh;
        }
    }
}
</style>
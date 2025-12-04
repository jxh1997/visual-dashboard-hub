<template>
    <header class="header">
        <div class="container">
            <!-- 非详情页：Logo + 导航 + 搜索 -->
            <div v-if="!isCaseDetailPage" class="normal-header">
                <div class="logo">
                    <router-link to="/" class="logo-link">
                        <h1>可视化大屏集合</h1>
                    </router-link>
                </div>

                <!-- 导航菜单（移动端折叠） -->
                <nav class="nav" :class="{ 'nav-mobile': isMobile }">
                    <router-link to="/" class="nav-item" :class="{ active: $route.name === 'Home' }"
                        @click="handleNavClick">
                        首页
                    </router-link>
                    <router-link to="/about" class="nav-item" :class="{ active: $route.name === 'About' }"
                        @click="handleNavClick">
                        关于
                    </router-link>
                    <!-- 移动端折叠按钮 -->
                    <el-button v-if="isMobile && showMobileNav" :icon="Close" class="nav-close-btn"
                        @click="showMobileNav = false" />
                </nav>

                <!-- 搜索 + 移动端导航触发 -->
                <div class="header-actions">
                    <!-- 移动端导航按钮 -->
                    <el-button v-if="isMobile && !showMobileNav" :icon="Menu" class="nav-toggle-btn"
                        @click="showMobileNav = true" />

                    <!-- 搜索框 -->
                    <div class="search" :class="{ 'search-mobile': isMobile }">
                        <el-input v-model="searchKeyword" placeholder="搜索案例/模板/场景..." :prefix-icon="Search"
                            size="small" @input="handleSearch" @keyup.enter="handleSearchEnter" clearable maxlength="30"
                            show-word-limit />
                    </div>
                </div>
            </div>

            <!-- 详情页：返回 + 案例信息 + 占位 -->
            <div v-else class="detail-header">
                <!-- 返回按钮（增加加载态） -->
                <el-button type="text" :icon="ArrowLeft" @click="goBack" class="back-btn" :loading="isGoingBack"
                    :disabled="isGoingBack">
                    返回
                </el-button>

                <!-- 案例信息（超出省略） -->
                <div class="case-info">
                    <h2 class="case-name" :title="currentCase?.name || '案例详情'">
                        {{ currentCase?.name || '案例详情' }}
                    </h2>
                    <div class="case-tags" :title="currentCase?.tags?.join(' | ') || ''">
                        <el-tag v-for="tag in currentCase?.tags || []" :key="tag" size="small" type="info"
                            class="tag-item">
                            {{ tag }}
                        </el-tag>
                    </div>
                </div>

                <!-- 占位（保持布局对齐） -->
                <div class="placeholder"></div>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted, onUnmounted, shallowRef } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCaseStore } from '@/stores/caseStore'
import type { CaseItem } from '@/types/case'
import { ArrowLeft, Close, Menu, Search } from '@element-plus/icons-vue'

// 初始化依赖
const caseStore = useCaseStore()
const router = useRouter()
const route = useRoute()

// 响应式状态（优化：shallowRef 减少深层监听开销）
const searchKeyword = shallowRef(caseStore.searchKeyword)
const isGoingBack = ref(false) // 返回按钮加载态
const showMobileNav = ref(false) // 移动端导航展开状态
const isMobile = ref(false) // 是否为移动端

// 优化：缓存计算属性结果，减少重复计算
const isCaseDetailPage = computed(() => route.name === 'CaseDetail')
const currentCase = computed<CaseItem | undefined>(() => {
    if (!isCaseDetailPage.value) return undefined
    const caseId = (route.params.id as string)?.trim()
    if (!caseId) return undefined
    return caseStore.getCaseById(caseId)
})

/**
 * 监听窗口大小，判断是否为移动端
 */
const handleResize = () => {
    isMobile.value = window.innerWidth < 768
    // 移动端窗口变化时关闭导航
    if (isMobile.value && showMobileNav.value) {
        showMobileNav.value = false
    }
}

/**
 * 返回上一页（优化：防重复触发 + 友好提示）
 */
const goBack = async () => {
    if (isGoingBack.value) return // 防重复点击
    isGoingBack.value = true

    try {
        // 有历史记录则返回，否则跳首页
        if (window.history.length > 1) {
            await router.go(-1)
        } else {
            await router.push('/')
            ElMessage.info('已返回首页')
        }
    } catch (error) {
        console.error('返回失败：', error)
        await router.push('/')
        ElMessage.warning('返回失败，已跳转首页')
    } finally {
        isGoingBack.value = false
    }
}

/**
 * 处理搜索输入（优化：防抖 + 非详情页生效）
 */
const handleSearch = () => {
    if (isCaseDetailPage.value) return
    // 防抖：500ms内只执行一次
    clearTimeout(window.searchTimer)
    window.searchTimer = setTimeout(() => {
        caseStore.setSearchKeyword(searchKeyword.value.trim())
        // 分类页搜索跳首页
        if (route.name === 'Category') {
            router.push('/').catch(err => console.error('跳转首页失败：', err))
        }
    }, 500)
}

/**
 * 搜索框回车触发（优化体验）
 */
const handleSearchEnter = () => {
    if (!searchKeyword.value.trim()) return
    handleSearch()
}

/**
 * 移动端导航点击后关闭（优化体验）
 */
const handleNavClick = () => {
    if (isMobile.value) {
        showMobileNav.value = false
    }
}

// 初始化监听
onMounted(() => {
    // 初始化移动端判断
    handleResize()
    window.addEventListener('resize', handleResize)

    // 初始化搜索关键词
    searchKeyword.value = caseStore.searchKeyword
})

// 清理监听（优化性能）
onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
    clearTimeout(window.searchTimer)
})

// 优化：仅监听必要的路由变化
watch(
    () => [route.fullPath, isCaseDetailPage.value],
    ([newPath, isDetail]) => {
        // 详情页清空搜索关键词
        if (isDetail) {
            searchKeyword.value = ''
        } else {
            searchKeyword.value = caseStore.searchKeyword
        }
        // 移动端路由变化关闭导航
        if (isMobile.value) {
            showMobileNav.value = false
        }
    },
    { immediate: true, deep: false } // 关闭deep，减少性能开销
)

// 扩展：给window添加timer类型（TS类型提示）
declare global {
    interface Window {
        searchTimer: number
    }
}
</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.header {
    width: 100%;
    background-color: #fff;
    box-shadow: $shadow;
    position: sticky;
    top: 0;
    z-index: 100;
    transition: box-shadow 0.2s ease;

    // 滚动时增强阴影（优化视觉）
    &:not(:hover) {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    }
}

.container {
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    height: 64px;
    width: 100%;
    box-sizing: border-box;
}

// 非详情页样式（优化）
.normal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    .logo {
        .logo-link {
            display: inline-block;
            text-decoration: none;

            h1 {
                font-size: 20px;
                color: $primary-color;
                cursor: pointer;
                margin: 0;
                font-weight: 600;
                transition: color 0.2s ease;

                &:hover {
                    color: $primary-color-rgb;
                }
            }
        }
    }

    .nav {
        display: flex;
        gap: 32px;

        // 移动端导航展开样式
        &.nav-mobile {
            position: fixed;
            top: 64px;
            left: 0;
            right: 0;
            background-color: #fff;
            flex-direction: column;
            gap: 0;
            padding: 16px 20px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            z-index: 99;

            .nav-item {
                padding: 12px 0;
                border-bottom: 1px solid $border-color-light;
            }

            .nav-close-btn {
                position: absolute;
                top: 16px;
                right: 20px;
                padding: 4px;
            }
        }

        .nav-item {
            font-size: 16px;
            color: $text-primary;
            font-weight: 500;
            transition: all 0.2s ease;
            text-decoration: none;
            position: relative;

            &:hover {
                color: $primary-color;
            }

            &.active {
                color: $primary-color;

                // 新增：活跃状态下划线
                &::after {
                    content: '';
                    position: absolute;
                    bottom: -4px;
                    left: 0;
                    width: 100%;
                    height: 2px;
                    background-color: $primary-color;
                    border-radius: 1px;
                }
            }
        }
    }

    .header-actions {
        display: flex;
        align-items: center;
        gap: 12px;

        .nav-toggle-btn,
        .nav-close-btn {
            padding: 4px;
            color: $text-primary;

            &:hover {
                color: $primary-color;
                background-color: $bg-hover;
            }
        }

        .search {
            width: 240px;

            // 移动端搜索框样式
            &.search-mobile {
                width: 100%;
                max-width: 240px;
            }

            :deep(.el-input__wrapper) {
                border-radius: 4px;
                box-shadow: none;
                border-color: $border-color;
                transition: border-color 0.2s ease;

                &:hover,
                &:focus-within {
                    border-color: $primary-color;
                }
            }
        }
    }
}

// 详情页样式（优化）
.detail-header {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 16px;
    width: 100%;

    // 返回按钮（优化 hover 反馈）
    .back-btn {
        color: $primary-color;
        font-size: 14px;
        padding: 6px 12px;
        border-radius: 4px;
        transition: all 0.2s ease;

        &:hover:not(:disabled) {
            color: #0f7ae5;
            background-color: #f0f7ff;
        }

        &:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }
    }

    // 案例信息（优化超出省略）
    .case-info {
        flex: 1;
        display: flex;
        align-items: center;
        gap: 16px;
        overflow: hidden;

        .case-name {
            font-size: 18px;
            color: $text-primary;
            font-weight: 500;
            margin: 0;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .case-tags {
            display: flex;
            gap: 8px;
            flex-wrap: nowrap;
            overflow: hidden;

            .tag-item {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                max-width: 120px;
            }
        }
    }

    // 占位（保持布局对齐）
    .placeholder {
        width: 240px; // 与搜索框宽度一致
        flex-shrink: 0;
    }
}

// 响应式适配（完善）
@media (max-width: 768px) {
    .container {
        padding: 0 16px;
    }

    .normal-header {
        .nav {
            display: none; // 默认隐藏移动端导航
        }

        .header-actions .search {
            width: 180px;
        }
    }

    .detail-header {
        gap: 8px;

        .case-info {
            gap: 8px;

            .case-name {
                font-size: 16px;
            }

            .case-tags {
                gap: 4px;
            }
        }

        .placeholder {
            width: 80px; // 移动端缩小占位宽度
        }
    }
}
</style>
<template>
    <header class="header">
        <div class="container">
            <!-- 非详情页：显示 Logo + 导航 + 搜索 -->
            <div v-if="!isCaseDetailPage" class="normal-header">
                <!-- Logo -->
                <div class="logo">
                    <router-link to="/">
                        <h1>可视化大屏集合</h1>
                    </router-link>
                </div>

                <!-- 导航菜单 -->
                <nav class="nav">
                    <router-link to="/" class="nav-item" :class="{ active: $route.name === 'Home' }">
                        首页
                    </router-link>
                    <router-link to="/about" class="nav-item" :class="{ active: $route.name === 'About' }">
                        关于
                    </router-link>
                </nav>

                <!-- 搜索框 -->
                <div class="search">
                    <el-input v-model="searchKeyword" placeholder="搜索案例..." prefix-icon="el-icon-search" size="small"
                        @input="handleSearch" />
                </div>
            </div>

            <!-- 详情页：显示 返回按钮 + 案例名称 + 案例信息 -->
            <div v-else class="detail-header">
                <!-- 返回按钮 -->
                <el-button type="text" icon="el-icon-arrow-left" @click="goBack" class="back-btn">
                    返回
                </el-button>

                <!-- 案例信息 -->
                <div class="case-info">
                    <h2 class="case-name">{{ currentCase?.name || '案例详情' }}</h2>
                    <div class="case-tags">
                        <el-tag v-for="tag in currentCase?.tags || []" :key="tag" size="small" type="info">
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
import { ref, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCaseStore } from '@/stores/caseStore'
import type { CaseItem } from '@/types/case'

const caseStore = useCaseStore()
const router = useRouter()
const route = useRoute()
const searchKeyword = ref(caseStore.searchKeyword)

// 1. 判断是否为案例详情页（路由名称为 CaseDetail）
const isCaseDetailPage = computed(() => route.name === 'CaseDetail')

// 2. 获取当前案例信息（从路由参数id匹配）
const currentCase = computed<CaseItem | undefined>(() => {
    if (!isCaseDetailPage.value) return undefined
    const caseId = route.params.id as string
    return caseStore.getCaseById(caseId)
})

// 3. 返回上一页/首页（兼容无历史记录的情况）
const goBack = () => {
    // 有历史记录则返回上一页，否则跳回首页
    if (window.history.length > 1) {
        router.go(-1)
    } else {
        router.push('/')
    }
}

// 4. 监听搜索输入（仅非详情页生效）
const handleSearch = () => {
    if (isCaseDetailPage.value) return // 详情页不处理搜索
    caseStore.setSearchKeyword(searchKeyword.value)
    // 如果在分类页，搜索时跳回首页
    if (route.name === 'Category') {
        router.push('/')
    }
}

// 5. 初始化搜索关键词
watch(
    () => caseStore.searchKeyword,
    (val) => {
        searchKeyword.value = val
    },
    { immediate: true }
)

// 6. 监听路由变化（确保切换页面时状态更新）
watch(
    () => route.fullPath,
    () => {
        // 详情页清空搜索关键词（可选）
        if (isCaseDetailPage.value) {
            searchKeyword.value = ''
        } else {
            searchKeyword.value = caseStore.searchKeyword
        }
    },
    { immediate: true }
)
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
}

// 非详情页样式（原有样式保留）
.normal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    .logo {
        h1 {
            font-size: 20px;
            color: $primary-color;
            cursor: pointer;
            margin: 0;
        }
    }

    .nav {
        display: flex;
        gap: 32px;

        .nav-item {
            font-size: 16px;
            color: $text-primary;
            font-weight: 500;
            transition: color 0.2s;

            &:hover,
            &.active {
                color: $primary-color;
            }
        }
    }

    .search {
        width: 240px;
    }
}

// 详情页样式
.detail-header {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 16px;
    width: 100%;

    // 返回按钮
    .back-btn {
        color: $primary-color;
        font-size: 14px;
        padding: 4px 8px;

        &:hover {
            color: #0f7ae5;
            background-color: #f0f7ff;
        }
    }

    // 案例信息
    .case-info {
        flex: 1; // 占满中间空间
        display: flex;
        align-items: center;
        .case-name {
            font-size: 18px;
            color: $text-primary;
            font-weight: 500;
            margin-right: 20px;
        }

        .case-tags {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
        }
    }

    // 占位（保持右侧空白，与非详情页布局对齐）
    .placeholder {
        width: 240px; // 与搜索框宽度一致
    }
}

// 响应式适配（可选）
@media (max-width: 768px) {
    .container {
        padding: 0 16px;
    }

    .normal-header .search {
        width: 180px;
    }

    .detail-header .placeholder {
        width: 180px;
    }

    .case-info .case-name {
        font-size: 16px;
    }
}
</style>
<template>
    <div class="home-page">
        <!-- 类型分类（确保v-for正确遍历） -->
        <div class="category-nav" v-if="caseStore.categories.length > 0">
            <div class="category-item" v-for="(category, index) in caseStore.categories"
                :key="`category-${index}`"
                :class="{ active: caseStore.activeCategory === category.type }"
                @click="handleCategoryClick(category.type)">
                <el-icon :size="28" class="category-icon">
                    <component :is="category.icon" />
                </el-icon>
                <span>{{ category.name }}</span>
                <p>{{ category.desc }}</p>
            </div>
        </div>
        <!-- 分类为空兜底 -->
        <div class="category-empty" v-else>
            <el-empty description="暂无分类数据" />
        </div>

        <!-- 高频模板 -->
        <div class="case-list">
            <div class="list-header">
                <h2>{{ caseStore.activeCategory ? caseStore.currentCategoryInfo?.name : '🔥 热门案例' }}</h2>
                <el-button type="text" @click="resetFilter" v-if="caseStore.activeCategory || caseStore.searchKeyword">
                    重置筛选
                </el-button>
            </div>

            <div class="case-grid">
                <div class="case-card" v-for="(caseItem, index) in caseStore.filteredCaseList"
                    :key="`case-${caseItem.id}-${index}`" @click="goToCaseDetail(caseItem.id)">
                    <div class="case-cover">
                        <img :src="caseItem.cover" :alt="caseItem.name" />
                    </div>
                    <div class="case-info">
                        <h3>{{ caseItem.name }}</h3>
                        <div class="case-tags">
                            <el-tag size="mini" v-for="(tag, tagIndex) in caseItem.tags"
                                :key="`tag-${tag}-${tagIndex}`">
                                {{ tag }}
                            </el-tag>
                        </div>
                        <p class="case-desc">{{ caseItem.desc }}</p>
                    </div>
                </div>

                <div class="empty" v-if="caseStore.filteredCaseList.length === 0">
                    <el-empty
                        :description="caseStore.activeCategory ? `暂无${caseStore.currentCategoryInfo?.name}相关案例` : '暂无匹配案例'" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useCaseStore } from '@/stores/caseStore.ts'
import { useRouter } from 'vue-router'

const caseStore = useCaseStore()
const router = useRouter()

const handleCategoryClick = (type: string) => {
    console.log('点击分类：', type) // 调试用
    caseStore.setActiveCategory(caseStore.activeCategory === type ? '' : type)
}

// 4. 跳转到案例详情
const goToCaseDetail = (id: string) => {
    caseStore.setActiveCaseId(id)
    router.push({ name: 'CaseDetail', params: { id } }).catch(err => console.log('路由跳转失败：', err))
}

// 5. 重置筛选
const resetFilter = () => {
    caseStore.resetFilter()
}

</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

// 全局样式兜底（确保分类容器显示）
.home-page {
    padding: 20px;
    padding-top: 0;
    max-width: 1400px;
    margin: 0 auto;
    min-height: calc(100vh - 64px);
    background-color: #f5f7fa; // 兜底背景色

    // 分类容器必现样式
    .category-nav {
        display: flex !important;
        gap: 16px;
        margin-bottom: 32px;
        overflow-x: auto;
        padding-bottom: 12px;
        scrollbar-width: none;
        padding-top: 20px;

        &::-webkit-scrollbar {
            display: none;
        }

        // 分类项基础样式（强制显示）
        .category-item {
            flex: 1;
            min-width: 180px;
            padding: 24px 16px;
            border-radius: 12px;
            background-color: #ffffff !important;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08) !important;
            cursor: pointer;
            transition: all 0.3s ease;
            border: 2px solid transparent;
            text-align: center;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;

            // 选中态
            &.active {
                border-color: #409eff !important;
                background-color: rgba(64, 158, 255, 0.05) !important;

                span {
                    color: #409eff !important;
                    font-weight: 700 !important;
                }

                .el-icon {
                    color: #409eff !important;
                }
            }

            &:hover {
                transform: translateY(-6px);
                box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
            }

            // 图标样式（强制显示）
            .el-icon {
                font-size: 28px;
                color: #409eff;
                margin-bottom: 12px;
                display: block !important;
            }

            span {
                font-size: 16px;
                font-weight: 600;
                display: block;
                margin-bottom: 6px;
                color: #303133;
            }

            p {
                font-size: 12px;
                color: #909399;
                line-height: 1.4;
                margin: 0;
            }
        }
    }

    // 分类为空样式
    .category-empty {
        padding: 40px 0;
        text-align: center;
        background-color: #fff;
        border-radius: 12px;
        margin-bottom: 32px;
    }

    // 案例列表样式
    .case-list {
        .list-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding: 0 4px;

            h2 {
                font-size: 22px;
                color: #303133;
                margin: 0;
                font-weight: 600;
            }

            el-button {
                color: #409eff;
                font-size: 14px;
            }
        }

        .case-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 24px;
        }

        .case-card {
            background-color: #ffffff;
            border-radius: 12px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
            overflow: hidden;
            cursor: pointer;
            transition: all 0.3s ease;

            &:hover {
                transform: translateY(-6px);
                box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
            }

            .case-cover {
                width: 100%;
                height: 180px;
                overflow: hidden;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.4s ease;
                }

                &:hover img {
                    transform: scale(1.08);
                }
            }

            .case-info {
                padding: 20px 16px;

                h3 {
                    font-size: 16px;
                    margin-bottom: 10px;
                    color: #303133;
                    font-weight: 500;
                }

                .case-tags {
                    margin-bottom: 8px;
                    display: flex;
                    flex-wrap: wrap;
                    gap: 6px;

                    el-tag {
                        background-color: rgba(64, 158, 255, 0.1);
                        color: #409eff;
                        border: none;
                        font-size: 12px;
                    }
                }

                .case-desc {
                    font-size: 12px;
                    color: #909399;
                    line-height: 1.5;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    margin: 0;
                }
            }
        }

        .empty {
            grid-column: 1 / -1;
            padding: 60px 0;
            text-align: center;
            background-color: #ffffff;
            border-radius: 12px;
            margin-top: 20px;
        }
    }
}

// 响应式适配
@media (max-width: 768px) {
    .home-page {
        padding: 16px;
    }

    .category-nav {
        gap: 12px !important;
        margin-bottom: 24px !important;

        .category-item {
            min-width: 140px !important;
            padding: 16px 12px !important;

            .el-icon {
                font-size: 22px !important;
            }

            span {
                font-size: 14px !important;
            }
        }
    }

    .case-list .list-header h2 {
        font-size: 18px;
    }

    .case-grid {
        grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)) !important;
        gap: 16px !important;
    }
}
</style>
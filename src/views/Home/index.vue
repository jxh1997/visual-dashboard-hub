<template>
    <div class="home-page">
        <!-- 分类导航 -->
        <div class="category-nav">
            <div class="category-item" v-for="category in categories" :key="category.type"
                @click="handleCategoryClick(category.type)">
                <el-icon :class="category.icon"></el-icon>
                <span>{{ category.name }}</span>
                <p>{{ category.desc }}</p>
            </div>
        </div>

        <!-- 案例列表 -->
        <div class="case-list">
            <div class="list-header">
                <h2>热门案例</h2>
                <el-button type="text" @click="resetFilter" v-if="activeCategory || searchKeyword">
                    重置筛选
                </el-button>
            </div>

            <div class="case-grid">
                <div class="case-card" v-for="caseItem in filteredCaseList" :key="caseItem.id"
                    @click="goToCaseDetail(caseItem.id)">
                    <div class="case-cover">
                        <img :src="caseItem.cover" :alt="caseItem.name" />
                    </div>
                    <div class="case-info">
                        <h3>{{ caseItem.name }}</h3>
                        <div class="case-tags">
                            <el-tag size="mini" v-for="tag in caseItem.tags" :key="tag">{{ tag }}</el-tag>
                        </div>
                        <p class="case-desc">{{ caseItem.desc }}</p>
                    </div>
                </div>

                <div class="empty" v-if="filteredCaseList.length === 0">
                    <el-empty description="暂无匹配案例" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useCaseStore } from '@/stores/caseStore'
import { useRouter } from 'vue-router'

const caseStore = useCaseStore()
const router = useRouter()

// 解构状态
const {
    categories,
    filteredCaseList,
    activeCategory,
    searchKeyword,
    setActiveCategory,
    resetFilter
} = caseStore

// 分类点击
const handleCategoryClick = (type: string) => {
    setActiveCategory(type)
}

// 跳转到案例详情
const goToCaseDetail = (id: string) => {
    console.log(3333, id);
    router.push({ name: 'CaseDetail', params: { id } })
}
</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.home-page {
    padding: 20px 0;
}

.category-nav {
    display: flex;
    gap: 20px;
    margin-bottom: 30px;
    overflow-x: auto;
    padding-bottom: 10px;

    .category-item {
        flex: 1;
        min-width: 180px;
        padding: 20px;
        border-radius: 8px;
        background-color: $card-bg;
        box-shadow: $shadow;
        cursor: pointer;
        transition: all 0.3s;

        &:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
        }

        el-icon {
            font-size: 24px;
            color: $primary-color;
            margin-bottom: 8px;
        }

        span {
            font-size: 16px;
            font-weight: 500;
            display: block;
            margin-bottom: 4px;
        }

        p {
            font-size: 12px;
            color: $text-secondary;
            line-height: 1.4;
        }
    }
}

.case-list {
    .list-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;

        h2 {
            font-size: 20px;
            color: $text-primary;
        }
    }

    .case-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 20px;
    }

    .case-card {
        background-color: $card-bg;
        border-radius: 8px;
        box-shadow: $shadow;
        overflow: hidden;
        cursor: pointer;
        transition: all 0.3s;

        &:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
        }

        .case-cover {
            width: 100%;
            height: 180px;
            overflow: hidden;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: transform 0.3s;
            }

            &:hover img {
                transform: scale(1.05);
            }
        }

        .case-info {
            padding: 16px;

            h3 {
                font-size: 16px;
                margin-bottom: 8px;
                color: $text-primary;
            }

            .case-tags {
                margin-bottom: 8px;
                display: flex;
                flex-wrap: wrap;
                gap: 4px;
            }

            .case-desc {
                font-size: 12px;
                color: $text-secondary;
                line-height: 1.4;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }
        }
    }

    .empty {
        grid-column: 1 / -1;
        padding: 40px 0;
    }
}
</style>
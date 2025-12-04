<template>
    <div class="case-actions">
        <div class="actions-inner">
            <el-button type="primary" :icon="FullScreen" @click="$emit('openFullPreview')">
                全屏预览
            </el-button>
            <el-button :icon="Star" @click="$emit('toggleCollect')">
                {{ isCollected ? '取消收藏' : '收藏模板' }}
            </el-button>
            <el-button :icon="Download" @click="$emit('downloadTemplate')">
                下载模板
            </el-button>
            <el-button type="text" @click="$emit('showPreviewTips')" class="tips-btn">
                交互说明
            </el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Star, Download, FullScreen } from '@element-plus/icons-vue'

// 响应式状态
const isCollected = ref(false)

// 定义事件
defineEmits(['openFullPreview', 'toggleCollect', 'downloadTemplate', 'showPreviewTips'])
</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.case-actions {
    background-color: #fff;
    border-radius: 8px;
    padding: 16px 24px;
    margin-bottom: 20px;
    box-shadow: $shadow;

    .actions-inner {
        display: flex;
        gap: 12px;
        align-items: center;

        .tips-btn {
            margin-left: auto;
            color: $text-secondary;
        }
    }
}

// 响应式适配
@media (max-width: 768px) {
    .case-actions {
        padding: 12px 16px;

        .actions-inner {
            flex-wrap: wrap;
            gap: 8px;
        }
    }
}
</style>
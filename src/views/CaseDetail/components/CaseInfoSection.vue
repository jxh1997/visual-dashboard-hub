<template>
    <div class="case-info-section">
        <div class="info-inner">
            <!-- 基础信息 -->
            <div class="info-grid">
                <div class="info-card">
                    <h3 class="card-title">适用场景</h3>
                    <p class="card-content">{{ basicInfo?.scenario || '暂无描述' }}</p>
                </div>
                <div class="info-card">
                    <h3 class="card-title">技术栈</h3>
                    <p class="card-content">{{ basicInfo?.techStack || 'Vue3 + ECharts 5 + Element Plus' }}</p>
                </div>
                <div class="info-card">
                    <h3 class="card-title">适配终端</h3>
                    <p class="card-content">{{ basicInfo?.adaptTerminal || '16:9大屏/PC端（1920*1080）' }}</p>
                </div>
                <div class="info-card">
                    <h3 class="card-title">数据接入</h3>
                    <p class="card-content">{{ basicInfo?.dataAccess || 'JSON/API/WebSocket' }}</p>
                </div>
            </div>

            <!-- 复用指南 -->
            <div class="reuse-guide">
                <h3 class="guide-title">快速复用指南</h3>
                <div class="guide-steps">
                    <div class="step-item">
                        <span class="step-num">1</span>
                        <div class="step-content">
                            <h4>环境准备</h4>
                            <p>安装依赖：npm install echarts echarts-gl element-plus</p>
                        </div>
                    </div>
                    <div class="step-item">
                        <span class="step-num">2</span>
                        <div class="step-content">
                            <h4>组件引入</h4>
                            <p>将组件复制到项目/components/case目录，按需引入</p>
                        </div>
                    </div>
                    <div class="step-item">
                        <span class="step-num">3</span>
                        <div class="step-content">
                            <h4>数据替换</h4>
                            <p>修改src/api/case.ts中的接口地址，替换为业务真实数据</p>
                        </div>
                    </div>
                </div>
                <el-button type="text" icon="el-icon-copy-document" @click="$emit('copyReuseCode')">
                    复制核心配置
                </el-button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ElButton } from 'element-plus'

// 接收props
defineProps<{
    basicInfo?: {
        scenario?: string
        techStack?: string
        adaptTerminal?: string
        dataAccess?: string
    }
}>()

// 定义事件
defineEmits(['copyReuseCode'])
</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.case-info-section {
    background-color: #fff;
    border-radius: 8px;
    padding: 24px;
    margin-bottom: 20px;
    box-shadow: $shadow;

    .info-inner {
        max-width: 1300px;
        margin: 0 auto;
    }

    .info-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 20px;
        margin-bottom: 30px;

        .info-card {
            padding: 16px;
            border: 1px solid $border-color;
            border-radius: 8px;

            .card-title {
                font-size: 16px;
                font-weight: 600;
                color: $text-primary;
                margin: 0 0 8px 0;
            }

            .card-content {
                font-size: 14px;
                color: $text-secondary;
                line-height: 1.6;
                margin: 0;
            }
        }
    }

    .reuse-guide {
        .guide-title {
            font-size: 16px;
            font-weight: 600;
            color: $text-primary;
            margin: 0 0 16px 0;
        }

        .guide-steps {
            display: flex;
            flex-direction: column;
            gap: 16px;
            margin-bottom: 16px;

            .step-item {
                display: flex;
                gap: 12px;
                align-items: flex-start;

                .step-num {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 24px;
                    height: 24px;
                    background-color: $primary-color;
                    color: #fff;
                    border-radius: 50%;
                    font-size: 12px;
                    font-weight: 600;
                    flex-shrink: 0;
                }

                .step-content {
                    flex: 1;

                    h4 {
                        font-size: 14px;
                        font-weight: 600;
                        margin: 0 0 4px 0;
                    }

                    p {
                        font-size: 13px;
                        color: $text-secondary;
                        margin: 0;
                    }
                }
            }
        }
    }
}

// 响应式适配
@media (max-width: 768px) {
    .info-grid {
        grid-template-columns: 1fr !important;
    }
}
</style>
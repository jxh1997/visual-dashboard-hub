<template>
    <div class="china-map-3d">
        中国地图 3D 组件
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.china-map-3d {
    width: 100%;
    height: 100%;
    padding: 20px;

    .map-border {
        width: 100%;
        height: 100%;
        padding: 20px;
    }

    .map-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;

        h3 {
            font-size: 18px;
            color: $text-primary;
            margin: 0;
        }

        .map-info {
            span {
                margin-left: 20px;
                color: $text-secondary;
                font-size: 14px;

                &:first-child {
                    margin-left: 0;
                }
            }
        }
    }

    .tooltip-content {
        h4 {
            margin: 0 0 8px 0;
            color: #333;
        }

        p {
            margin: 4px 0;
            color: #666;
        }
    }
}
</style>
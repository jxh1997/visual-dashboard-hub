<template>
    <div class="main-layout">
        <!-- 页头 -->
        <header-component />
        <!-- 主内容区 -->
        <main class="main-content">
            <router-view />
        </main>
        <!-- 页脚 -->
        <footer-component />
    </div>
</template>

<script setup lang="ts">
import HeaderComponent from '@/components/common/Header.vue'
import FooterComponent from '@/components/common/Footer.vue'
</script>

<style scoped lang="scss">
.main-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.main-content {
    flex: 1;
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    // padding: 20px;
}
</style>
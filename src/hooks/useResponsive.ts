// src/hooks/useResponsive.ts
import { ref, onMounted, onUnmounted, computed } from "vue";

export const useResponsive = () => {
  // 窗口尺寸
  const windowWidth = ref<number>(window.innerWidth);
  const windowHeight = ref<number>(window.innerHeight);

  // 监听窗口 resize 事件
  const handleResize = () => {
    windowWidth.value = window.innerWidth;
    windowHeight.value = window.innerHeight;
  };

  onMounted(() => {
    window.addEventListener("resize", handleResize);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", handleResize);
  });

  // 设备类型判断（根据实际需求调整阈值）
  const isMobile = computed(() => windowWidth.value < 768); // 移动端
  const isTablet = computed(
    () => windowWidth.value >= 768 && windowWidth.value < 1200
  ); // 平板
  const isDesktop = computed(() => windowWidth.value >= 1200); // 桌面端
  const isLargeScreen = computed(() => windowWidth.value >= 1920); // 大屏

  // 设计稿与实际屏幕的缩放比例（可选，用于特殊场景计算）
  const scaleRatio = computed(() => {
    return {
      widthRatio: windowWidth.value / 1920,
      heightRatio: windowHeight.value / 1080,
    };
  });

  return {
    windowWidth,
    windowHeight,
    isMobile,
    isTablet,
    isDesktop,
    isLargeScreen,
    scaleRatio,
  };
};

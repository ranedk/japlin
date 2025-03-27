<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup>
import { useThemeStore } from "@/stores/theme";

// Only run on client
onMounted(() => {
  const themeStore = useThemeStore();
  themeStore.initTheme();
});
</script>

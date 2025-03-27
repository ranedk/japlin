<template>
  <div>
    <UButton
      :color="themeStore.isDark ? 'gray' : 'yellow'"
      class="theme-toggle-btn"
      icon
      @click="themeStore.toggleTheme()"
      aria-label="Toggle theme"
    >
      <Icon v-if="themeStore.isDark" name="uil:moon" class="text-lg" />
      <Icon v-else name="uil:sun" class="text-lg" />
    </UButton>
  </div>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'
import { onMounted } from 'vue'

const themeStore = useThemeStore()

onMounted(() => {
  themeStore.initTheme()
})
</script>

<style scoped>
.theme-toggle-btn {
  @apply transition-all duration-300;
}
</style>

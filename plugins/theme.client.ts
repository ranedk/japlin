export default defineNuxtPlugin((nuxtApp) => {
  // Wait for app to be mounted before initializing the theme
  nuxtApp.hook("app:mounted", () => {
    // Import dynamically to avoid SSR issues
    import("@/stores/theme").then(({ useThemeStore }) => {
      const themeStore = useThemeStore();
      themeStore.initTheme();
    });
  });
});

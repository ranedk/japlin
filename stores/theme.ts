import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDark: false
  }),
  
  actions: {
    toggleTheme() {
      this.isDark = !this.isDark
      this.updateThemeClass()
      this.savePreference()
    },
    
    initTheme() {
      // Check localStorage first
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme) {
        this.isDark = savedTheme === 'dark'
      } else {
        // Otherwise check system preference
        this.isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      }
      
      this.updateThemeClass()
    },
    
    updateThemeClass() {
      // Update document class for Tailwind dark mode
      if (this.isDark) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    },
    
    savePreference() {
      localStorage.setItem('theme', this.isDark ? 'dark' : 'light')
    }
  }
})

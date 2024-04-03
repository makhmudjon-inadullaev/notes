<template>
    <div class="dark:bg-gray-800 relative box-border h-[100vh] transition-colors overflow-auto">
      <RouterView></RouterView>
    </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  const theme = localStorage.getItem('theme')
  if(theme) {
    document.body.classList.add(theme)
  }
})
</script>
<style scoped>
</style>

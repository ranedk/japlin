<template>
  <div class="container mx-auto px-4 py-12 max-w-4xl">
    <div class="mb-6">
      <AppNavbar />
    </div>

    <h1 class="text-3xl font-bold mb-8 text-indigo-700">Addition</h1>

    <Addition />
  </div>
</template>

<script setup lang="ts">
import { useHead } from "#app";

useHead({
  title: "Addition - Mathematics Learning Guide",
  meta: [
    {
      name: "description",
      content: "Learn how to add numbers and solve addition problems",
    },
  ],
});
</script>

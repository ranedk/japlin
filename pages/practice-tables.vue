<template>
  <div class="container mx-auto px-4 py-12 max-w-4xl">
    <div class="mb-6">
      <AppNavbar />
    </div>

    <h1 class="text-3xl font-bold mb-8 text-indigo-700">Practice Tables</h1>

    <PracticeTable />
  </div>
</template>

<script setup lang="ts">
import { useHead } from "#app";

useHead({
  title: "Practice Tables - Mathematics Learning Guide",
  meta: [
    {
      name: "description",
      content: "Interactive multiplication tables to improve your skills",
    },
  ],
});
</script>

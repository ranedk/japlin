<template>
  <div class="container mx-auto px-4 py-12 max-w-4xl">
    <div class="mb-6">
      <AppNavbar />
    </div>

    <h1 class="text-3xl font-bold mb-8 text-indigo-700 dark:text-indigo-400">
      Practice Tables
    </h1>

    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <p class="mb-4 dark:text-gray-200">
        Content for practice tables will be placed here.
      </p>
    </div>
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

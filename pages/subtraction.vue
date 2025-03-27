<template>
  <div class="container mx-auto px-4 py-12 max-w-4xl">
    <div class="mb-6">
      <AppNavbar />
    </div>

    <h1 class="text-3xl font-bold mb-8 text-indigo-700">Subtraction</h1>

    <Subtraction />
  </div>
</template>

<script setup lang="ts">
import { useHead } from "#app";

useHead({
  title: "Subtraction - Mathematics Learning Guide",
  meta: [
    {
      name: "description",
      content: "Master the concept of subtraction with step-by-step examples",
    },
  ],
});
</script>

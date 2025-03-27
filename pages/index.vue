<template>
  <div class="container mx-auto px-4 py-12 max-w-4xl">
    <h1 class="text-3xl font-bold text-center mb-10 text-indigo-700">
      Mathematics Learning Guide
    </h1>

    <div class="bg-white rounded-lg shadow-lg overflow-hidden">
      <!-- Header -->
      <div class="bg-indigo-600 py-4 px-6">
        <h2 class="text-xl font-semibold text-white">Table of Contents</h2>
      </div>

      <!-- Content list -->
      <ul class="divide-y divide-gray-200">
        <li
          v-for="(item, index) in tableOfContents"
          :key="index"
          class="group hover:bg-indigo-50 transition-colors duration-200"
        >
          <NuxtLink
            :to="item.path"
            class="flex items-center py-4 px-6 group-hover:text-indigo-700"
          >
            <div
              class="w-10 h-10 flex items-center justify-center bg-indigo-100 rounded-full text-indigo-600 font-bold mr-4"
            >
              {{ index + 1 }}
            </div>
            <div>
              <h3 class="font-medium text-lg">{{ item.title }}</h3>
              <p class="text-gray-600 text-sm">{{ item.description }}</p>
            </div>
            <div class="ml-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-400 group-hover:text-indigo-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </div>

    <!-- Additional info card -->
    <div class="mt-8 bg-indigo-50 rounded-lg p-6 border border-indigo-100">
      <h3 class="text-lg font-medium text-indigo-700 mb-2">Getting Started</h3>
      <p class="text-indigo-900">
        Select a topic from the table of contents above to start learning. Each
        section contains explanations, examples, and interactive exercises to
        help you master the concept.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from "#app";
interface ContentItem {
  title: string;
  description: string;
  path: string;
}

const tableOfContents: ContentItem[] = [
  {
    title: "Addition",
    description: "Learn how to add numbers and solve addition problems",
    path: "/addition",
  },
  {
    title: "Subtraction",
    description: "Master the concept of subtraction with step-by-step examples",
    path: "/subtraction",
  },
  {
    title: "Practice Tables",
    description: "Interactive multiplication tables to improve your skills",
    path: "/practice-tables",
  },
];

useHead({
  title: "Table of Contents - Mathematics Learning Guide",
  meta: [
    {
      name: "description",
      content:
        "Explore our comprehensive mathematics learning guide with sections on addition, subtraction, and practice tables.",
    },
  ],
});
</script>

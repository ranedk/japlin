<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
    <h2 class="text-xl font-semibold text-indigo-700 dark:text-indigo-400 mb-2">
      Your Score
    </h2>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="text-center p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded">
        <div class="text-2xl font-bold text-indigo-700 dark:text-indigo-400">
          {{ score.totalScore }}
        </div>
        <div class="text-sm text-gray-600 dark:text-gray-400">
          Correct Answers
        </div>
      </div>
      <div class="text-center p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded">
        <div class="text-2xl font-bold text-indigo-700 dark:text-indigo-400">
          {{ score.questionsAnswered }}
        </div>
        <div class="text-sm text-gray-600 dark:text-gray-400">
          Questions Answered
        </div>
      </div>
      <div class="text-center p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded">
        <div class="text-2xl font-bold text-indigo-700 dark:text-indigo-400">
          {{ accuracy.toFixed(1) }}%
        </div>
        <div class="text-sm text-gray-600 dark:text-gray-400">Accuracy</div>
      </div>
      <div class="text-center p-2">
        <UButton
          color="info"
          variant="soft"
          @click="resetScores"
          icon="i-heroicons-arrow-path"
          label="Reset"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useScoreStore } from "~/stores/score";
import { storeToRefs } from "pinia";

const scoreStore = useScoreStore();
const { totalScore, questionsAnswered, accuracy } = storeToRefs(scoreStore);
const score = scoreStore;

function resetScores() {
  scoreStore.resetScores();
}
</script>

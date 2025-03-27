<template>
  <div class="bg-white rounded-lg shadow-lg p-6">
    <Scoring />

    <div class="mb-8">
      <h2 class="text-xl font-semibold text-indigo-700 mb-4">
        Addition Problem
      </h2>

      <div class="flex justify-center">
        <div class="font-mono text-right text-xl md:text-2xl">
          <div class="mb-2">{{ formatNumber(firstNumber) }}</div>
          <div class="border-b-2 border-gray-400 pb-2">
            + {{ formatNumber(secondNumber) }}
          </div>

          <form @submit.prevent="checkAnswer">
            <div class="mt-2 flex items-center space-x-2">
              <UButton
                type="submit"
                color="primary"
                :loading="checking"
                :disabled="!userAnswer"
              >
                Check
              </UButton>
              <input
                ref="answerInput"
                v-model="userAnswer"
                type="text"
                class="rtl font-mono text-right text-xl md:text-2xl p-2 border rounded w-32 md:w-40"
                :class="{
                  'border-red-500': showWrong,
                  'border-green-500': showSuccess,
                }"
                pattern="[0-9]*"
                inputmode="numeric"
                autocomplete="off"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="flex justify-center">
      <div v-if="showWrong" class="text-red-500 mt-2">
        That's not correct. Try again!
      </div>
      <div v-if="showSuccess" class="text-green-500 mt-2">
        Correct! Well done!
      </div>
    </div>

    <div class="flex justify-center mt-6">
      <UButton
        @click="generateNewProblem"
        color="primary"
        variant="soft"
        icon="i-heroicons-arrow-path"
      >
        New Problem
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useScoreStore } from "~/stores/score";

const scoreStore = useScoreStore();
const firstNumber = ref(0);
const secondNumber = ref(0);
const userAnswer = ref("");
const correctAnswer = ref(0);
const showWrong = ref(false);
const showSuccess = ref(false);
const checking = ref(false);
const answerInput = ref<HTMLInputElement | null>(null);

// Generate random number with specified number of digits
function generateRandomNumber(digits: number): number {
  const min = Math.pow(10, digits - 1);
  const max = Math.pow(10, digits) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate new addition problem with 3 or 4 digit numbers
function generateNewProblem() {
  // Randomly choose between 3 and 4 digit numbers
  const digitCount1 = Math.random() > 0.5 ? 3 : 4;
  const digitCount2 = Math.random() > 0.5 ? 3 : 4;

  firstNumber.value = generateRandomNumber(digitCount1);
  secondNumber.value = generateRandomNumber(digitCount2);
  correctAnswer.value = firstNumber.value + secondNumber.value;

  userAnswer.value = "";
  showWrong.value = false;
  showSuccess.value = false;

  // Focus on the answer input
  setTimeout(() => {
    answerInput.value?.focus();
  }, 100);
}

// Format number with thousand separators
function formatNumber(num: number): string {
  return num.toString();
}

// Check user's answer
async function checkAnswer() {
  if (!userAnswer.value) return;

  const userNum = parseInt(userAnswer.value.replace(/,/g, ""), 10);

  checking.value = true;

  // Simulate a small delay for feedback
  await new Promise((resolve) => setTimeout(resolve, 300));

  checking.value = false;

  if (userNum === correctAnswer.value) {
    showSuccess.value = true;
    showWrong.value = false;
    scoreStore.correct();

    // Generate a new problem after a short delay
    setTimeout(() => {
      generateNewProblem();
    }, 1500);
  } else {
    scoreStore.wrong();
    showWrong.value = true;
    showSuccess.value = false;
  }
}

onMounted(() => {
  generateNewProblem();
});
</script>

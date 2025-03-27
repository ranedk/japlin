<template>
  <div class="bg-white rounded-lg shadow-lg p-6">
    <Scoring />

    <div class="mb-8">
      <h2 class="text-xl font-semibold text-indigo-700 mb-4">
        Multiplication Tables Practice
      </h2>

      <div class="mb-6">
        <h3 class="font-medium mb-2">Select tables to practice:</h3>
        <div class="flex flex-wrap gap-2">
          <UCheckbox
            v-for="num in 11"
            :key="num + 2"
            :model-value="tableSelections[num + 2]"
            @update:model-value="toggleTable(num + 2)"
            :label="`${num + 2}`"
          />
        </div>
        <div v-if="!hasSelectedTables" class="text-red-500 mt-2 text-sm">
          Please select at least one table to practice
        </div>
      </div>

      <div v-if="hasSelectedTables" class="flex justify-center">
        <div class="font-mono text-center text-xl md:text-2xl">
          <div class="mb-6 flex items-center justify-center">
            <span class="text-3xl">{{ firstNumber }}</span>
            <span class="mx-4">×</span>
            <span class="text-3xl">{{ secondNumber }}</span>
          </div>

          <form @submit.prevent="checkAnswer">
            <div class="mt-2 flex items-center justify-center space-x-2">
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
                class="font-mono text-center text-xl md:text-2xl p-2 border rounded w-32 md:w-40"
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
        :disabled="!hasSelectedTables"
      >
        New Problem
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
const scoreStore = useScoreStore();

// Object to track selections for tables 2-12
const tableSelections = ref({
  2: true,
  3: true,
  4: true,
  5: true,
  6: false,
  7: false,
  8: false,
  9: false,
  10: false,
  11: false,
  12: false,
});
const firstNumber = ref(0);
const secondNumber = ref(0);
const userAnswer = ref("");
const correctAnswer = ref(0);
const showWrong = ref(false);
const showSuccess = ref(false);
const checking = ref(false);
const answerInput = ref<HTMLInputElement | null>(null);

// Toggle the selection state of a table
function toggleTable(tableNumber: number) {
  tableSelections.value[tableNumber] = !tableSelections.value[tableNumber];

  // If at least one table is selected, generate a new problem
  if (hasSelectedTables.value) {
    generateNewProblem();
  }
}

// Compute whether any tables are selected
const hasSelectedTables = computed(() => {
  return Object.values(tableSelections.value).some((value) => value);
});

// Get array of selected tables
const getSelectedTables = computed(() => {
  return Object.entries(tableSelections.value)
    .filter(([_, isSelected]) => isSelected)
    .map(([table, _]) => parseInt(table));
});

// Generate new multiplication problem from selected tables
function generateNewProblem() {
  if (!hasSelectedTables.value) return;

  const selectedTables = getSelectedTables.value;

  // Choose a random table from the selected ones
  const randomTableIndex = Math.floor(Math.random() * selectedTables.length);
  const tableNumber = selectedTables[randomTableIndex];

  // Decide which number should be the table number
  const isFirstNumberTheTable = Math.random() > 0.5;

  if (isFirstNumberTheTable) {
    firstNumber.value = tableNumber;
    secondNumber.value = Math.floor(Math.random() * 12) + 1; // Random number from 1 to 10
  } else {
    firstNumber.value = Math.floor(Math.random() * 12) + 1; // Random number from 1 to 10
    secondNumber.value = tableNumber;
  }

  correctAnswer.value = firstNumber.value * secondNumber.value;

  userAnswer.value = "";
  showWrong.value = false;
  showSuccess.value = false;

  // Focus on the answer input
  setTimeout(() => {
    answerInput.value?.focus();
  }, 100);
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
  if (hasSelectedTables.value) {
    generateNewProblem();
  }
});
</script>

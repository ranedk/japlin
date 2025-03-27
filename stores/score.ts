import { defineStore } from "pinia";

interface ScoreState {
  totalScore: number;
  questionsAnswered: number;
}

export const useScoreStore = defineStore("score", {
  state: (): ScoreState => ({
    totalScore: 0,
    questionsAnswered: 0,
  }),

  actions: {
    correct() {
      this.totalScore++;
      this.questionsAnswered++;
    },
    wrong() {
      this.questionsAnswered++;
    },

    resetScores() {
      this.totalScore = 0;
      this.questionsAnswered = 0;
    },
  },

  getters: {
    accuracy: (state) => {
      if (state.questionsAnswered === 0) return 0;
      return (state.totalScore / state.questionsAnswered) * 100;
    },
  },
});

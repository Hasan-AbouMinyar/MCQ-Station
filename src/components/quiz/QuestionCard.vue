<template>
  <v-card class="question-card elevation-2 mb-6">
    <v-card-text class="pa-6">
      <!-- Question Number & Text -->
      <div class="d-flex align-start mb-6">
        <v-chip color="primary" class="ml-3" label>
          <v-icon small right class="ml-1">mdi-help-circle</v-icon>
          {{ questionNumber }}
        </v-chip>
        <h3 class="text-h6 flex-grow-1">{{ question.question }}</h3>
      </div>

      <!-- Options -->
      <v-radio-group
        v-model="selectedOption"
        @change="onAnswerSelect"
        :disabled="answered"
      >
        <v-card
          v-for="option in question.options"
          :key="option.id"
          class="option-card mb-3"
          :class="getOptionClass(option.id)"
          outlined
        >
          <v-card-text class="pa-4">
            <v-radio
              :value="option.id"
              :color="getOptionColor(option.id)"
            >
              <template v-slot:label>
                <div class="d-flex align-center justify-space-between flex-grow-1">
                  <span class="text-body-1">{{ option.text }}</span>
                  <v-icon
                    v-if="answered && option.id === question.correctAnswer"
                    color="success"
                  >
                    mdi-check-circle
                  </v-icon>
                  <v-icon
                    v-if="answered && option.id === selectedOption && option.id !== question.correctAnswer"
                    color="error"
                  >
                    mdi-close-circle
                  </v-icon>
                </div>
              </template>
            </v-radio>
          </v-card-text>
        </v-card>
      </v-radio-group>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'QuestionCard',
  props: {
    question: {
      type: Object,
      required: true
    },
    questionNumber: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      selectedOption: null,
      answered: false
    };
  },
  methods: {
    onAnswerSelect(value) {
      if (this.answered) return;
      
      this.answered = true;
      const isCorrect = value === this.question.correctAnswer;
      
      this.$emit('answer', {
        questionId: this.question.id,
        selectedAnswer: value,
        correctAnswer: this.question.correctAnswer,
        isCorrect
      });
    },
    getOptionClass(optionId) {
      if (!this.answered) return '';
      
      if (optionId === this.question.correctAnswer) {
        return 'correct-answer';
      }
      
      if (optionId === this.selectedOption && optionId !== this.question.correctAnswer) {
        return 'wrong-answer';
      }
      
      return '';
    },
    getOptionColor(optionId) {
      if (!this.answered) return 'primary';
      
      if (optionId === this.question.correctAnswer) {
        return 'success';
      }
      
      if (optionId === this.selectedOption) {
        return 'error';
      }
      
      return 'grey';
    },
    reset() {
      this.selectedOption = null;
      this.answered = false;
    }
  }
};
</script>

<style scoped>
.question-card {
  border-radius: 12px;
}

.option-card {
  transition: all 0.3s ease;
  cursor: pointer;
  border-radius: 8px;
}

.option-card:hover {
  background-color: #f5f5f5;
}

.correct-answer {
  background-color: #e8f5e9 !important;
  border-color: #4caf50 !important;
}

.wrong-answer {
  background-color: #ffebee !important;
  border-color: #f44336 !important;
}
</style>

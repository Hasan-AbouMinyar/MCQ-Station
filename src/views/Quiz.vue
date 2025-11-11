<template>
  <v-container fluid class="fill-height pa-0">
    <v-row no-gutters class="fill-height">
      <!-- Left Panel - Info & Progress -->
      <v-col cols="12" md="4" class="bg-primary">
        <v-sheet color="primary" class="fill-height d-flex flex-column pa-8">
          <div class="d-flex align-center mb-8">
            <v-btn 
              icon 
              variant="tonal"
              color="white"
              @click="this.$router.push({ name: 'QuizOptions', params: { subjectId: this.subjectId } })"
              class="ml-4"
            >
              <v-icon>mdi-arrow-right</v-icon>
            </v-btn>
            <div>
              <div class="text-white text-caption text-uppercase">اختبار</div>
              <h2 class="text-white text-h6 font-weight-bold">{{ subjectInfo.name }}</h2>
            </div>
          </div>

          <div class="mb-8">
            <div class="d-flex justify-space-between align-center mb-2">
              <span class="text-white font-weight-bold">التقدم</span>
              <span class="text-white font-weight-bold">{{ Math.round(progress) }}%</span>
            </div>
            <v-progress-linear
              :model-value="progress"
              color="white"
              height="8"
              rounded
            ></v-progress-linear>
          </div>

          <div class="text-center mb-8">
            <v-chip 
              color="white"
              variant="tonal"
              size="large"
              class="font-weight-bold"
            >
              {{ currentQuestionIndex + 1 }} / {{ questions.length }}
            </v-chip>
          </div>

          <v-spacer></v-spacer>

          <v-row class="text-center">
            <v-col cols="4">
              <div class="text-success text-h4 font-weight-bold">{{ correctAnswers }}</div>
              <div class="text-white text-caption">إجابات صحيحة</div>
            </v-col>
            <v-col cols="4">
              <div class="text-error text-h4 font-weight-bold">{{ wrongAnswers }}</div>
              <div class="text-white text-caption">إجابات خاطئة</div>
            </v-col>
            <v-col cols="4">
              <div class="text-white text-h4 font-weight-bold">{{ unanswered }}</div>
              <div class="text-white text-caption">أسئلة متبقية</div>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>

      <!-- Right Panel - Question & Options -->
      <v-col cols="12" md="8" class="bg-grey-lighten-4">
        <v-sheet color="grey-lighten-4" class="fill-height d-flex flex-column pa-8 overflow-y-auto">
          <v-container class="flex-grow-1 d-flex flex-column">
            <v-chip 
              color="primary"
              variant="tonal"
              class="mb-4 align-self-start"
            >
              سؤال {{ currentQuestionIndex + 1 }}
            </v-chip>
            
            <h3 class="text-h5 font-weight-bold mb-8">{{ currentQuestion.question }}</h3>
            
            <v-radio-group v-model="selectedAnswer" :disabled="answered" class="mb-8">
              <v-card
                v-for="(option, index) in currentQuestion.options"
                :key="index"
                class="mb-4"
                :color="getOptionColor(index)"
                :variant="getOptionVariant(index)"
                :border="getOptionBorder(index)"
                @click="!answered && selectOption(index)"
              >
                <v-card-text class="pa-4">
                  <v-row no-gutters align="center">
                    <v-col cols="auto">
                      <v-avatar 
                        :color="getAvatarColor(index)" 
                        size="40"
                        class="ml-4"
                      >
                        <span class="font-weight-bold">{{ String.fromCharCode(65 + index) }}</span>
                      </v-avatar>
                    </v-col>
                    <v-col>
                      <span class="text-body-1">{{ option }}</span>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-radio-group>

            <v-spacer></v-spacer>

            <v-row class="mt-4">
              <v-col cols="auto">
                <v-btn
                  variant="outlined"
                  size="large"
                  :disabled="currentQuestionIndex === 0"
                  @click="previousQuestion"
                >
                  <v-icon class="ml-2">mdi-arrow-right</v-icon>
                  السابق
                </v-btn>
              </v-col>
              
              <v-col>
                <v-btn
                  v-if="currentQuestionIndex < questions.length - 1"
                  color="primary"
                  size="large"
                  block
                  :disabled="!answered"
                  @click="nextQuestion"
                >
                  التالي
                  <v-icon class="mr-2">mdi-arrow-left</v-icon>
                </v-btn>
                
                <v-btn
                  v-else
                  color="success"
                  size="large"
                  block
                  :disabled="!answered"
                  @click="finishQuiz"
                >
                  <v-icon class="ml-2">mdi-check-circle</v-icon>
                  إنهاء الاختبار
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-sheet>
      </v-col>
    </v-row>

    <v-snackbar
      v-model="showSnackbar"
      :color="snackbarColor"
      location="top"
      :timeout="1500"
    >
      <span class="font-weight-bold">{{ snackbarText }}</span>
    </v-snackbar>
  </v-container>
</template>

<script>
import subjectsList from '../data/subjects-list.json';

export default {
  name: 'Quiz',
  props: ['subjectId'],
  data() {
    return {
      questions: [],
      currentQuestionIndex: 0,
      selectedAnswer: null,
      answered: false,
      answers: {},
      showSnackbar: false,
      snackbarText: '',
      snackbarColor: '',
    };
  },
  computed: {
    subjectInfo() {
      return subjectsList.find(s => s.id === this.subjectId) || {};
    },
    currentQuestion() {
      return this.questions[this.currentQuestionIndex] || {};
    },
    correctAnswers() {
      return Object.values(this.answers).filter(a => a.isCorrect).length;
    },
    wrongAnswers() {
      return Object.values(this.answers).filter(a => !a.isCorrect).length;
    },
    unanswered() {
      return this.questions.length - Object.keys(this.answers).length;
    },
    progress() {
      if (this.questions.length === 0) return 0;
      return ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
    }
  },
  watch: {
    currentQuestionIndex() {
      const saved = this.answers[this.currentQuestionIndex];
      if (saved) {
        this.selectedAnswer = saved.selectedAnswer;
        this.answered = true;
      } else {
        this.selectedAnswer = null;
        this.answered = false;
      }
    }
  },
  async created() {
    await this.loadQuestions();
  },
  methods: {
    async loadQuestions() {
      try {
        const questionsModule = await import(`../data/subjects/${this.subjectId}.json`);
        const rawQuestions = questionsModule.default || questionsModule;
        
        let filteredQuestions = rawQuestions;
        
        // فلترة الأسئلة حسب الشابتر إذا تم اختياره
        const chapterId = this.$route.query.chapter;
        if (chapterId) {
          filteredQuestions = rawQuestions.filter(q => q.chapter && q.chapter.id === chapterId);
        }
        
        this.questions = filteredQuestions.map((q) => ({
          id: q.id,
          question: q.question,
          options: q.options.map(opt => opt.text),
          correctAnswer: q.options.findIndex(opt => opt.id === q.correctAnswer)
        }));
      } catch (error) {
        console.error("Failed to load questions:", error);
        this.$router.push('/subjects');
      }
    },
    selectOption(index) {
      if (!this.answered) {
        this.selectedAnswer = index;
        this.checkAnswer();
      }
    },
    checkAnswer() {
      const isCorrect = this.selectedAnswer === this.currentQuestion.correctAnswer;
      this.answered = true;
      
      this.answers[this.currentQuestionIndex] = {
        selectedAnswer: this.selectedAnswer,
        correctAnswer: this.currentQuestion.correctAnswer,
        isCorrect
      };

      this.snackbarText = isCorrect ? 'إجابة صحيحة!' : 'إجابة خاطئة';
      this.snackbarColor = isCorrect ? 'success' : 'error';
      this.showSnackbar = true;
    },
    getOptionColor(index) {
      if (!this.answered) {
        return this.selectedAnswer === index ? 'primary' : 'white';
      }
      if (index === this.currentQuestion.correctAnswer) {
        return 'success';
      }
      if (index === this.selectedAnswer) {
        return 'error';
      }
      return 'grey-lighten-2';
    },
    getOptionVariant(index) {
      if (!this.answered) {
        return this.selectedAnswer === index ? 'tonal' : 'elevated';
      }
      return 'tonal';
    },
    getOptionBorder(index) {
      if (!this.answered && this.selectedAnswer === index) {
        return 'primary md';
      }
      return true;
    },
    getAvatarColor(index) {
      if (!this.answered) {
        return this.selectedAnswer === index ? 'primary' : 'grey-lighten-2';
      }
      if (index === this.currentQuestion.correctAnswer) {
        return 'success';
      }
      if (index === this.selectedAnswer) {
        return 'error';
      }
      return 'grey-lighten-2';
    },
    nextQuestion() {
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
      }
    },
    previousQuestion() {
      if (this.currentQuestionIndex > 0) {
        this.currentQuestionIndex--;
      }
    },
    finishQuiz() {
      this.$router.push({ name: 'QuizOptions', params: { subjectId: this.subjectId } });
    }
  }
};
</script>


<template>
  <v-app style="background: #F6F9FC;">
    <!-- Top Bar -->
    <v-app-bar elevation="0" color="white" height="72" style="border-bottom: 1px solid #E3E9EF;">
      <v-container class="d-flex align-center" style="max-width: 1200px;">
        <v-btn icon variant="text" size="small" @click="$router.push('/')">
          <v-icon>mdi-home</v-icon>
        </v-btn>
        <h2 style="color: #2B3445; font-weight: 600; font-size: 18px; margin-right: 16px;">
          نتائج الاختبار
        </h2>
      </v-container>
    </v-app-bar>

    <v-main>
      <v-container class="py-8" style="max-width: 800px;">
        
        <!-- Main Result Card -->
        <v-card rounded="xl" class="pa-8 text-center mb-4" style="border: 1px solid #E3E9EF;">
          <v-sheet
            :color="getResultBadgeColor() + '15'"
            rounded="circle"
            width="120"
            height="120"
            class="mx-auto mb-6 d-flex align-center justify-center"
          >
            <v-icon
              :color="getResultBadgeColor()"
              size="60"
            >
              {{ getResultIcon() }}
            </v-icon>
          </v-sheet>

          <h2 style="font-size: 32px; font-weight: 700; color: #2B3445; margin-bottom: 8px;">
            {{ getResultMessage() }}
          </h2>
          
          <p style="font-size: 16px; color: #7D879C; margin-bottom: 24px;">
            {{ getPerformanceMessage() }}
          </p>

          <div 
            style="font-size: 64px; font-weight: 700; margin-bottom: 32px;"
            :style="{ color: getResultBadgeColor() }"
          >
            {{ scorePercentage }}%
          </div>

          <v-divider class="my-6"></v-divider>

          <!-- Stats Grid -->
          <v-row class="mb-6">
            <v-col cols="4">
              <v-sheet color="success" rounded="lg" class="pa-4" style="opacity: 0.1;"></v-sheet>
              <div style="position: relative; margin-top: -60px;">
                <div style="font-size: 32px; font-weight: 700; color: #33D067;">
                  {{ correctCount }}
                </div>
                <div style="font-size: 14px; color: #7D879C; margin-top: 4px;">
                  إجابة صحيحة
                </div>
              </div>
            </v-col>
            <v-col cols="4">
              <v-sheet color="error" rounded="lg" class="pa-4" style="opacity: 0.1;"></v-sheet>
              <div style="position: relative; margin-top: -60px;">
                <div style="font-size: 32px; font-weight: 700; color: #E94560;">
                  {{ wrongCount }}
                </div>
                <div style="font-size: 14px; color: #7D879C; margin-top: 4px;">
                  إجابة خاطئة
                </div>
              </div>
            </v-col>
            <v-col cols="4">
              <v-sheet color="grey-300" rounded="lg" class="pa-4" style="opacity: 0.1;"></v-sheet>
              <div style="position: relative; margin-top: -60px;">
                <div style="font-size: 32px; font-weight: 700; color: #2B3445;">
                  {{ totalQuestions }}
                </div>
                <div style="font-size: 14px; color: #7D879C; margin-top: 4px;">
                  إجمالي الأسئلة
                </div>
              </div>
            </v-col>
          </v-row>

          <!-- Progress Circle -->
          <div class="mb-6">
            <v-progress-circular
              :model-value="scorePercentage"
              :size="150"
              :width="12"
              :color="getResultBadgeColor()"
            >
              <div style="text-align: center;">
                <div style="font-size: 28px; font-weight: 700; color: #2B3445;">
                  {{ correctCount }}<span style="font-size: 18px; color: #7D879C;">/{{ totalQuestions }}</span>
                </div>
                <div style="font-size: 12px; color: #7D879C; margin-top: 4px;">
                  الدرجة
                </div>
              </div>
            </v-progress-circular>
          </div>
        </v-card>

        <!-- Action Buttons -->
        <v-row class="mb-4">
          <v-col cols="12" sm="6">
            <v-btn
              block
              size="x-large"
              color="primary"
              rounded="lg"
              elevation="0"
              @click="retryQuiz"
            >
              <v-icon size="20" class="ml-2">mdi-refresh</v-icon>
              إعادة الاختبار
            </v-btn>
          </v-col>
          <v-col cols="12" sm="6">
            <v-btn
              block
              size="x-large"
              variant="outlined"
              rounded="lg"
              @click="$router.push('/subjects')"
              style="border-color: #E3E9EF; color: #2B3445;"
            >
              <v-icon size="20" class="ml-2">mdi-arrow-right</v-icon>
              المواد الأخرى
            </v-btn>
          </v-col>
        </v-row>

        <!-- Performance Alert -->
        <v-alert
          :color="getAlertColor()"
          variant="tonal"
          rounded="lg"
          prominent
        >
          <div class="d-flex align-center">
            <v-icon size="32" class="ml-3">{{ getAlertIcon() }}</v-icon>
            <div>
              <div style="font-weight: 600; font-size: 16px; color: #2B3445; margin-bottom: 4px;">
                {{ getAlertTitle() }}
              </div>
              <div style="font-size: 14px; color: #7D879C;">
                {{ getAlertDescription() }}
              </div>
            </div>
          </div>
        </v-alert>

      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'Results',
  props: ['subjectId'],
  data() {
    return {
      answers: {},
      totalQuestions: 0
    };
  },
  computed: {
    correctCount() {
      return Object.values(this.answers).filter(a => a.isCorrect).length;
    },
    wrongCount() {
      return Object.values(this.answers).filter(a => !a.isCorrect).length;
    },
    scorePercentage() {
      if (this.totalQuestions === 0) return 0;
      return Math.round((this.correctCount / this.totalQuestions) * 100);
    }
  },
  created() {
    if (this.$route.params.answers) {
      this.answers = this.$route.params.answers;
      this.totalQuestions = this.$route.params.totalQuestions;
    } else {
      this.$router.push('/subjects');
    }
  },
  methods: {
    getResultIcon() {
      if (this.scorePercentage >= 90) return 'mdi-trophy-award';
      if (this.scorePercentage >= 70) return 'mdi-star-circle';
      if (this.scorePercentage >= 50) return 'mdi-thumb-up';
      return 'mdi-chart-line';
    },
    getResultMessage() {
      if (this.scorePercentage >= 90) return 'ممتاز جداً!';
      if (this.scorePercentage >= 70) return 'أحسنت!';
      if (this.scorePercentage >= 50) return 'جيد';
      return 'يمكنك التحسن';
    },
    getResultBadgeColor() {
      if (this.scorePercentage >= 70) return '#33D067';
      if (this.scorePercentage >= 50) return '#FFC107';
      return '#E94560';
    },
    getPerformanceMessage() {
      if (this.scorePercentage >= 90) return 'أداء استثنائي! لديك إتقان تام للموضوع';
      if (this.scorePercentage >= 70) return 'أداء جيد جداً! لديك فهم قوي للموضوع';
      if (this.scorePercentage >= 50) return 'أداء مقبول، المزيد من التدريب سيحسن نتيجتك';
      return 'يُنصح بمراجعة المادة وإعادة المحاولة';
    },
    getAlertColor() {
      if (this.scorePercentage >= 70) return 'success';
      if (this.scorePercentage >= 50) return 'warning';
      return 'info';
    },
    getAlertIcon() {
      if (this.scorePercentage >= 70) return 'mdi-check-circle';
      if (this.scorePercentage >= 50) return 'mdi-alert-circle';
      return 'mdi-information';
    },
    getAlertTitle() {
      if (this.scorePercentage >= 90) return 'نتيجة ممتازة!';
      if (this.scorePercentage >= 70) return 'أداء جيد!';
      if (this.scorePercentage >= 50) return 'يمكنك التحسن';
      return 'استمر في المحاولة';
    },
    getAlertDescription() {
      if (this.scorePercentage >= 90) return 'لقد أظهرت مستوى عالٍ من الفهم والإتقان للموضوع';
      if (this.scorePercentage >= 70) return 'أنت على الطريق الصحيح، استمر في التعلم';
      if (this.scorePercentage >= 50) return 'راجع الموضوع مرة أخرى وحاول مجدداً';
      return 'لا تستسلم، المزيد من المراجعة سيساعدك على التحسن';
    },
    retryQuiz() {
      this.$router.push({ name: 'Quiz', params: { subjectId: this.subjectId } });
    }
  }
};
</script>

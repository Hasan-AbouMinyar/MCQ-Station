<template>
  <v-container fluid class="fill-height bg-grey-lighten-4">
    <v-row justify="center" align="center" class="fill-height">
      <v-col cols="12" md="8" lg="6">
        <v-card elevation="4" class="pa-8">
          <div class="d-flex align-center mb-6">
            <v-btn 
              icon 
              variant="text"
              @click="$router.push('/subjects')"
              class="ml-4"
            >
              <v-icon>mdi-arrow-right</v-icon>
            </v-btn>
            <div>
              <div class="text-caption text-grey">اختبار</div>
              <h2 class="text-h5 font-weight-bold">{{ subjectInfo.name }}</h2>
            </div>
          </div>

          <v-divider class="mb-6"></v-divider>

          <h3 class="text-h6 font-weight-bold mb-4">اختر نوع الاختبار</h3>

          <v-radio-group v-model="selectedMode" class="mb-6">
            <v-card
              class="mb-4 pa-4"
              :color="selectedMode === 'all' ? 'primary' : 'white'"
              :variant="selectedMode === 'all' ? 'tonal' : 'elevated'"
              @click="selectedMode = 'all'"
            >
              <v-radio value="all" class="d-none"></v-radio>
              <div class="d-flex align-center">
                <v-icon :color="selectedMode === 'all' ? 'primary' : 'grey'" size="40" class="ml-4">
                  mdi-file-document-multiple
                </v-icon>
                <div>
                  <div class="text-subtitle-1 font-weight-bold">
                    جميع الأسئلة
                  </div>
                  <div class="text-caption text-grey">
                    اختبر معلوماتك في كل المادة
                  </div>
                </div>
              </div>
            </v-card>

            <v-card
              class="mb-4 pa-4"
              :color="selectedMode === 'chapter' ? 'primary' : 'white'"
              :variant="selectedMode === 'chapter' ? 'tonal' : 'elevated'"
              @click="selectedMode = 'chapter'"
            >
              <v-radio value="chapter" class="d-none"></v-radio>
              <div class="d-flex align-center">
                <v-icon :color="selectedMode === 'chapter' ? 'primary' : 'grey'" size="40" class="ml-4">
                  mdi-book-open-page-variant
                </v-icon>
                <div>
                  <div class="text-subtitle-1 font-weight-bold">
                    اختبار حسب الفصل
                  </div>
                  <div class="text-caption text-grey">
                    اختر فصلاً معيناً للاختبار
                  </div>
                </div>
              </div>
            </v-card>
          </v-radio-group>

          <v-expand-transition>
            <div v-if="selectedMode === 'chapter'">
              <h4 class="text-subtitle-1 font-weight-bold mb-3">اختر الفصل</h4>
              <v-select
                v-model="selectedChapter"
                :items="chapters"
                item-title="name"
                item-value="id"
                variant="outlined"
                placeholder="اختر الفصل"
                class="mb-4"
              >
                <template v-slot:item="{ props, item }">
                  <v-list-item v-bind="props">
                    <template v-slot:prepend>
                      <v-icon>mdi-book</v-icon>
                    </template>
                    <template v-slot:append>
                      <v-chip size="small" color="primary">
                        {{ getChapterQuestionsCount(item.raw.id) }} سؤال
                      </v-chip>
                    </template>
                  </v-list-item>
                </template>
              </v-select>
            </div>
          </v-expand-transition>

          <v-btn
            color="primary"
            size="large"
            block
            :disabled="selectedMode === 'chapter' && !selectedChapter"
            @click="startQuiz"
          >
            <v-icon class="ml-2">mdi-play-circle</v-icon>
            ابدأ الاختبار
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import subjectsList from '../data/subjects-list.json';

export default {
  name: 'QuizOptions',
  props: ['subjectId'],
  data() {
    return {
      selectedMode: 'all',
      selectedChapter: null,
      questions: [],
      chapters: []
    };
  },
  computed: {
    subjectInfo() {
      return subjectsList.find(s => s.id === this.subjectId) || {};
    }
  },
  async created() {
    await this.loadQuestions();
    this.extractChapters();
  },
  methods: {
    async loadQuestions() {
      try {
        const questionsModule = await import(`../data/subjects/${this.subjectId}.json`);
        this.questions = questionsModule.default || questionsModule;
      } catch (error) {
        console.error("Failed to load questions:", error);
        this.$router.push('/subjects');
      }
    },
    extractChapters() {
      const chaptersMap = new Map();
      this.questions.forEach(q => {
        if (q.chapter) {
          if (!chaptersMap.has(q.chapter.id)) {
            chaptersMap.set(q.chapter.id, {
              id: q.chapter.id,
              name: q.chapter.name
            });
          }
        }
      });
      this.chapters = Array.from(chaptersMap.values());
      
      // إذا لم يكن هناك فصول، نضيف فصل افتراضي
      if (this.chapters.length === 0) {
        this.chapters = [{ id: 'all', name: 'جميع الأسئلة' }];
      }
    },
    getChapterQuestionsCount(chapterId) {
      return this.questions.filter(q => q.chapter && q.chapter.id === chapterId).length;
    },
    startQuiz() {
      const params = {
        subjectId: this.subjectId
      };
      
      if (this.selectedMode === 'chapter' && this.selectedChapter) {
        params.chapter = this.selectedChapter;
      }
      
      this.$router.push({ 
        name: 'Quiz', 
        params,
        query: this.selectedMode === 'chapter' ? { chapter: this.selectedChapter } : {}
      });
    }
  }
};
</script>

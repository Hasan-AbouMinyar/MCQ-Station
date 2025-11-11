<template>
  <div style="background: #F8F9FA;">
    <!-- Page Header -->
    <div style="
      background: linear-gradient(135deg, #3A5A78 0%, #343A40 100%);
      padding: 60px 0 80px;
      position: relative;
      overflow: hidden;
    ">
      <div style="
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=');
        opacity: 0.3;
      "></div>
      
      <v-container style="max-width: 1200px; position: relative;">
        <v-btn
          icon
          variant="outlined"
          size="large"
          @click="$router.push('/')"
          style="border: 2px solid rgba(255,255,255,0.3); color: white; margin-bottom: 24px;"
        >
          <v-icon>mdi-arrow-right</v-icon>
        </v-btn>
        
        <h1 style="
          font-size: 48px;
          font-weight: 800;
          color: white;
          margin-bottom: 16px;
          line-height: 1.2;
        ">
          المواد الدراسية
        </h1>
        
        <p style="
          font-size: 18px;
          color: rgba(255,255,255,0.9);
          max-width: 600px;
        ">
          اختر المادة التي تريد اختبار معلوماتك فيها وابدأ رحلتك التعليمية الآن
        </p>
      </v-container>
    </div>

    <v-main>
      <v-container class="py-12" style="max-width: 1200px; margin-top: -40px; position: relative; z-index: 2;">
        
        <!-- Subjects Grid -->
        <v-row>
          <v-col
            v-for="subject in subjects"
            :key="subject.id"
            cols="12"
            sm="6"
            md="4"
          >
            <v-card
              @click="startQuiz(subject.id)"
              class="subject-card h-100"
              elevation="0"
              style="
                cursor: pointer;
                transition: all 0.3s;
                border: 1px solid #dee2e6;
                border-radius: 12px;
                overflow: hidden;
              "
            >
              <!-- Card Header with Color -->
              <div :style="`
                background: linear-gradient(135deg, ${subject.color} 0%, ${getDarkerShade(subject.color)} 100%);
                padding: 32px 24px;
                position: relative;
                overflow: hidden;
              `">
                <div style="
                  position: absolute;
                  top: -20px;
                  left: -20px;
                  width: 100px;
                  height: 100px;
                  background: rgba(255,255,255,0.1);
                  border-radius: 50%;
                "></div>
                
                <v-icon 
                  :color="'white'" 
                  size="56"
                  style="position: relative; z-index: 1;"
                >
                  {{ subject.icon }}
                </v-icon>
              </div>
              
              <v-card-text class="pa-6">
                <h3 style="
                  font-size: 22px;
                  font-weight: 700;
                  color: #3A5A78;
                  margin-bottom: 12px;
                ">
                  {{ subject.name }}
                </h3>
                
                <p style="
                  font-size: 15px;
                  color: #6c757d;
                  margin-bottom: 20px;
                  line-height: 1.7;
                  min-height: 60px;
                ">
                  {{ subject.description }}
                </p>

                <v-divider class="mb-4"></v-divider>

                <div class="d-flex align-center justify-space-between">
                  <div class="d-flex align-center">
                    <v-icon :color="subject.color" size="20" class="ml-2">mdi-file-document</v-icon>
                    <span style="font-size: 14px; font-weight: 600; color: #3A5A78;">
                      {{ getQuestionsCount(subject.id) }} سؤال
                    </span>
                  </div>
                  
                  <v-btn
                    :color="subject.color"
                    variant="tonal"
                    size="small"
                    elevation="0"
                    style="font-weight: 700; text-transform: none;"
                  >
                    ابدأ الآن
                    <v-icon size="16" class="mr-1">mdi-arrow-left</v-icon>
                  </v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Empty State -->
        <v-row v-if="subjects.length === 0">
          <v-col cols="12">
            <v-card class="pa-12 text-center" elevation="0" style="border: 2px dashed #dee2e6;">
              <v-icon size="100" color="grey-200">mdi-folder-open-outline</v-icon>
              <h3 style="
                font-size: 24px;
                font-weight: 700;
                color: #3A5A78;
                margin-top: 24px;
                margin-bottom: 12px;
              ">
                لا توجد مواد متاحة
              </h3>
              <p style="font-size: 16px; color: #6c757d;">
                يرجى إضافة مواد من ملفات JSON
              </p>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import subjectsList from '../data/subjects-list.json';

export default {
  name: 'SubjectsList',
  data() {
    return {
      subjects: [],
      questionsCache: {},
      breadcrumbs: [
        { title: 'الرئيسية', disabled: false, to: '/' },
        { title: 'المواد', disabled: true }
      ]
    };
  },
  async created() {
    this.subjects = subjectsList;
    await this.loadAllQuestions();
  },
  methods: {
    async loadAllQuestions() {
      for (const subject of this.subjects) {
        try {
          const questions = await import(`../data/subjects/${subject.id}.json`);
          this.questionsCache[subject.id] = questions.default || questions;
        } catch (error) {
          this.questionsCache[subject.id] = [];
        }
      }
    },
    getQuestionsCount(subjectId) {
      return this.questionsCache[subjectId]?.length || 0;
    },
    startQuiz(subjectId) {
      this.$router.push({ name: 'QuizOptions', params: { subjectId } });
    },
    getDarkerShade(hexColor) {
      if (!hexColor) return '#000000';
      let r = parseInt(hexColor.slice(1, 3), 16);
      let g = parseInt(hexColor.slice(3, 5), 16);
      let b = parseInt(hexColor.slice(5, 7), 16);
      r = Math.floor(r * 0.8);
      g = Math.floor(g * 0.8);
      b = Math.floor(b * 0.8);
      return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }
  }
};
</script>

<style scoped>
.subject-card {
  position: relative;
}

.subject-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 32px rgba(58, 90, 120, 0.1) !important;
  border-color: #3A5A78 !important;
}

.subject-card::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: #3A5A78;
  transform: scaleX(0);
  transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.subject-card:hover::after {
  transform: scaleX(1);
}
</style>


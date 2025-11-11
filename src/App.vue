<template>
  <v-app style="background: #f5f5f5;">
    <!-- Global App Header -->
    <AppHeader :title="'MCQ Station'" :showHomeButton="true" />

    <v-main>
      <router-view />
    </v-main>

    <v-footer 
      color="#192f59" 
      class="py-12"
      dark
    >
      <v-container style="max-width: 1200px;">
        <v-row>
          <v-col cols="12" md="4" class="mb-6">
            <div class="d-flex align-center mb-4">
              <v-icon size="36" color="white" class="ml-3">mdi-school</v-icon>
              <div>
                <div style="font-size: 22px; font-weight: 800; line-height: 1;">
                  MCQ Station
                </div>
                <div style="font-size: 10px; font-weight: 600; color: #e91e63; letter-spacing: 1px; margin-top: 2px;">
                  EDUCATIONAL PLATFORM
                </div>
              </div>
            </div>
            <p style="color: rgba(255,255,255,0.8); font-size: 14px; line-height: 1.7;">
              منصة تعليمية احترافية توفر اختبارات تفاعلية في جميع المواد الدراسية
            </p>
          </v-col>
          
          <v-col cols="12" md="4" class="mb-6">
            <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 16px; color: white;">
              روابط سريعة
            </h3>
            <div class="d-flex flex-column gap-2">
              <a href="/" style="color: rgba(255,255,255,0.8); text-decoration: none; font-size: 14px;">
                <v-icon size="16" class="ml-2">mdi-chevron-left</v-icon>
                الصفحة الرئيسية
              </a>
              <a href="/subjects" style="color: rgba(255,255,255,0.8); text-decoration: none; font-size: 14px;">
                <v-icon size="16" class="ml-2">mdi-chevron-left</v-icon>
                المواد الدراسية
              </a>
            </div>
          </v-col>
          
          <v-col cols="12" md="4" class="mb-6">
            <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 16px; color: white;">
              تواصل معنا
            </h3>
            <div class="d-flex align-center gap-2">
              <a href="https://t.me/abouminyar" target="_blank" style="color: rgba(255,255,255,0.8); text-decoration: none; display: flex; align-items: center; gap: 8px;">
                <v-icon color="white" size="24">mdi-telegram</v-icon>
                <span style="font-size: 14px;">Telegram</span>
              </a>
            </div>
          </v-col>
        </v-row>
        
        <v-divider style="border-color: rgba(255,255,255,0.1); margin: 32px 0 24px;"></v-divider>
        
        <v-row>
          <v-col cols="12" class="text-center">
            <p style="color: rgba(255,255,255,0.7); font-size: 14px; margin: 0;">
              © 2025 MCQ Station. جميع الحقوق محفوظة  
              <a href="https://hasan-abouminyar.vercel.app" target="_blank" style="color: #17A2B8; text-decoration: none; font-weight: bold;">
                Hasan Abouminyar
              </a>
            </p>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
import AppHeader from './components/layout/AppHeader.vue';

export default {
  name: 'App',
  components: { AppHeader }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap');

* {
  font-family: 'Cairo', sans-serif !important;
}
</style>

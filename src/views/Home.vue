<template>
  <div>
    <!-- Hero Section - Full Screen -->
    <v-container fluid class="pa-0">
      <v-row no-gutters>
        <v-col cols="12">
          <v-sheet
            class="d-flex align-center justify-center"
            :style="{
              background: 'linear-gradient(rgba(58, 90, 120, 0.85), rgba(58, 90, 120, 0.85)), url(/hero-image.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              minHeight: '100vh'
            }"
          >
            <v-container class="text-center">
              <v-row justify="center">
                <v-col cols="12" md="8">
                  <h1 class="text-h1 text-white font-weight-black mb-6">
                    MCQ Station
                  </h1>
                  
                  <p class="text-h6 text-white mb-10" style="opacity: 0.95;">
                    منصة تعليمية احترافية توفر اختبارات تفاعلية في جميع المواد الدراسية
                  </p>

                  <v-btn
                    color="mycolor"
                    size="x-large"
                    elevation="4"
                    @click="$router.push('/subjects')"
                    class="px-10"
                  >
                    <v-icon class="ml-2">mdi-play-circle</v-icon>
                    ابدأ الآن
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>


<script>
export default {
  name: 'Home'
};
</script>

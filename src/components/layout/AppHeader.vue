<template>
  <v-app-bar 
    app 
    color="white" 
    elevation="0"
    height="80"
    style="border-bottom: 1px solid #dee2e6;"
  >
    <v-container style="max-width: 1200px;">
      <div class="d-flex align-center justify-space-between w-100">
        <v-btn icon @click="goHome" v-if="showBackButton" size="large">
          <v-icon color="primary">mdi-arrow-right</v-icon>
        </v-btn>

        <div class="d-flex align-center" @click="goHome" style="cursor: pointer;">
          <v-icon size="40" color="primary" class="ml-3">mdi-school</v-icon>
          <div>
            <div style="
              font-size: 24px;
              font-weight: 800;
              color: #3A5A78;
              line-height: 1;
              letter-spacing: 0.5px;
            ">
              MCQ Station
            </div>
            <div style="
              font-size: 11px;
              font-weight: 600;
              color: #8C9DAA;
              letter-spacing: 1.5px;
              margin-top: 2px;
            ">
              EDUCATIONAL PLATFORM
            </div>
          </div>
        </div>

        <v-spacer></v-spacer>

        <div class="d-flex gap-2">
          <v-btn 
            icon 
            v-if="showHomeButton" 
            @click="goHome"
            size="large"
            color="primary"
          >
            <v-icon>mdi-home</v-icon>
          </v-btn>
        </div>
      </div>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  name: 'AppHeader',
  props: {
    title: {
      type: String,
      default: 'MCQ Station'
    },
    showBackButton: {
      type: Boolean,
      default: false
    },
    showHomeButton: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    goHome() {
      this.$router.push({ name: 'Home' });
    }
  }
};
</script>

<style scoped>
.v-app-bar {
  box-shadow: 0 2px 12px rgba(25, 47, 89, 0.08) !important;
}
</style>

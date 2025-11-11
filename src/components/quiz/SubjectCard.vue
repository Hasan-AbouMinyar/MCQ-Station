<template>
  <v-card
    class="subject-card elevation-4"
    hover
    @click="$emit('select', subject.id)"
  >
    <v-card-text class="pa-6">
      <div class="d-flex flex-column align-center text-center">
        <!-- Icon -->
        <v-avatar
          size="80"
          :color="subject.color"
          class="mb-4 white--text elevation-2"
        >
          <v-icon size="40" color="white">{{ subject.icon }}</v-icon>
        </v-avatar>

        <!-- Title -->
        <h3 class="text-h5 font-weight-bold mb-2">
          {{ subject.name }}
        </h3>

        <!-- Description -->
        <p class="text-body-2 text--secondary mb-4">
          {{ subject.description }}
        </p>

        <!-- Questions Count -->
        <v-chip
          :color="subject.color"
          text-color="white"
          class="mb-4"
        >
          <v-icon small right class="ml-1">mdi-help-circle</v-icon>
          {{ questionsCount }} سؤال
        </v-chip>

        <!-- Start Button -->
        <v-btn
          block
          :color="subject.color"
          dark
          elevation="0"
          large
        >
          <v-icon right class="ml-2">mdi-play</v-icon>
          ابدأ الاختبار
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'SubjectCard',
  props: {
    subject: {
      type: Object,
      required: true
    },
    questionsCount: {
      type: Number,
      default: 0
    }
  }
};
</script>

<style scoped>
.subject-card {
  transition: all 0.3s ease;
  cursor: pointer;
  border-radius: 12px;
}

.subject-card:hover {
  transform: translateY(-8px);
}
</style>

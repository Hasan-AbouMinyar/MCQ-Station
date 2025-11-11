<template>
  <v-card class="progress-card elevation-2 mb-4">
    <v-card-text class="pa-4">
      <div class="d-flex align-center justify-space-between mb-2">
        <span class="text-body-1 font-weight-medium">
          السؤال {{ current }} من {{ total }}
        </span>
        <span class="text-body-2 text--secondary">
          {{ percentage }}%
        </span>
      </div>
      <v-progress-linear
        :value="percentage"
        color="primary"
        height="8"
        rounded
      ></v-progress-linear>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'ProgressBar',
  props: {
    current: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    }
  },
  computed: {
    percentage() {
      return Math.round((this.current / this.total) * 100);
    }
  }
};
</script>

<style scoped>
.progress-card {
  border-radius: 12px;
}
</style>

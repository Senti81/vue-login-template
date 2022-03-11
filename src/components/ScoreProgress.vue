<template>
  <div class="d-flex flex-row align-center my-4">
    <div     
      flat
      class="px-6"
      >{{index + 1 }}.
    </div>
    <v-progress-linear
      color="green"
      height="25"
      striped
      :value="calculateValue"
      :buffer-value="calculateValue"
      >
      <!-- <template v-slot:default="{ value }">
          <strong>{{ value }}</strong>
        </template> -->
    </v-progress-linear>
  </div>
</template>

<script>
export default {
  props: ['item', 'index'],
  computed: {
    calculateValue() {
      return Math.ceil(this.item * 100 / 105)
      // return 100
    }
  }
}
</script>

<style>

</style>
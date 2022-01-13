<template>
  <v-snackbar
    v-model="$store.state.snackbar.show"
    elevation="24"    
    timeout="3000"
    transition="scale-transition"
    >
      {{ $store.state.snackbar.text }}
  </v-snackbar>
</template>

<script>
export default {

}
</script>

<style>

</style>
<template>
  <v-container fluid>
    <ShowTask v-if="show"/>       
    <NoTask v-else/>
  </v-container>
</template>

<script>
import NoTask from '@/components/NoTask.vue'
import ShowTask from '@/components/ShowTask.vue'
import { format } from 'date-fns'

export default {
  components: {
    ShowTask,
    NoTask
  },
  computed: {
    show() {
      return format(new Date(), 'H') >= this.$store.state.START && format(new Date(), 'H') < this.$store.state.END
    }
  } 
}
</script>

<style>

</style>
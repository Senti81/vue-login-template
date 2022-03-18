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
      const startTime = this.$store.state.START
      const endTime = this.$store.state.END
      const mockedTime = this.$store.getters.getMock.hour

      if (this.$store.getters.getMock) {
        return mockedTime >= startTime && mockedTime < endTime
      }
      return format(new Date(), 'H') >= startTime && format(new Date(), 'H') < endTime
    }
  } 
}
</script>

<style>

</style>
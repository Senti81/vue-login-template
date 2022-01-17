<template>
    <v-toolbar-title>
      {{ date }}
    </v-toolbar-title>
</template>

<script>
import { format } from 'date-fns'

export default {
  data() {
    return {
      date: ''
    }
  },
  methods: {
    getDate() {
      this.date = 'Tag ' + format(new Date(), 'i') + ' - ' + format(new Date(), 'H:mm')
      setTimeout(this.getDate, 60000)
    }
  },
  mounted() {
    this.getDate()
  }
}
</script>

<style>

</style>
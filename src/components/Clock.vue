<template>
  <div class="text-subtitle-1 ml-4">
    {{ date }}
  </div>
</template>

<script>
import { format } from 'date-fns'
import { de } from 'date-fns/locale'

export default {
  data() {
    return {
      date: ''
    }
  },
  methods: {
    getDate() {
      this.date = format(new Date(), 'd. MMMM, H:mm', { locale: de })
      setTimeout(this.getDate, 10000)
    }
  },
  mounted() {
    this.getDate()
  }
}
</script>

<style>

</style>
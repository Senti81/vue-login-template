<template>
    <v-toolbar-title>
      {{ date }}
    </v-toolbar-title>
</template>

<script>
import { format } from 'date-fns'
import axios from 'axios'

export default {
  data() {
    return {
      date: ''
    }
  },
  methods: {
    async setMock() {
      const result = await axios(process.env.VUE_APP_BASEURL + '/config')
      const payload = {
        day: result.data.day,
        hour: result.data.hour
      }
      this.$store.commit('setMock', payload)
      console.log(result.data.day)
    },
    async getDate() {
      await this.$store.dispatch('isInProgress')
      if (process.env.VUE_APP_USEMOCK == 'true') {
        const result = await axios(process.env.VUE_APP_BASEURL + '/config')
        const payload = {
          day: result.data.day,
          hour: result.data.hour
        }
        this.$store.commit('setMock', payload)
        this.date = 'Tag ' + payload.day  + ' - ' + payload.hour + ':00'
      } else {
        this.date = 'Tag ' + format(new Date(), 'i') + ' - ' + format(new Date(), 'H:mm')
        setTimeout(this.getDate, 60000)
      }
    }
  },
  mounted() {
    this.getDate()
  }
}
</script>

<style>

</style>
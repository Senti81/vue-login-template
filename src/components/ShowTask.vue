<template>
  <v-card
    class="grey lighten-3 pa-2 mt-2"
    elevation="12"
    >
    <v-card-text>
      <v-text-field
        :label="label"
        type="text"
        v-model="solution"
        required
        >
      </v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-btn            
        class="pa-4 mt-4"
        color="primary"
        @click="submit"
        >
        Lösung einreichen
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { format } from 'date-fns'
import axios from 'axios'

export default {
  data() {
    return {
      day: format(new Date(), 'i'),
      solution: ''
    }
  },
  computed: {
    label() {
      return 'Lösung für Tag ' + this.day
    }
  },
  methods: {
    async submit() {
      const payload = {
        day: this.day,
        data: {
          username: this.$store.getters.getUser.username,
          solution: this.solution
        }
      }
      this.$store.dispatch('submitSolution', payload)
    },
    async hasAlreadySubmitted() {
      const result = await axios.get(process.env.VUE_APP_BASEURL + `/scores/player?name=${this.$store.getters.getUser.username}`, this.$store.getters.getHeader)
      if (result.data === '') {
        this.$router.push('/')      
      } else 
      if (this.day == result.data.points.length) {
        this.$store.commit('showSnackbar', 'Tagesaufgabe bereits gelöst')
        this.$router.push('/')
      }
    }
  },
  mounted() {
    this.hasAlreadySubmitted()
  }
}
</script>

<style>

</style>
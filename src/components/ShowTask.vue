<template>
  <v-card
    class="grey lighten-3 pa-2 mt-2"
    elevation="12"
    >
    <v-card-title>
      {{task}}
    </v-card-title>
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
      task: '',
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
    async getQuest() {

      // Get Score for player
      const result = await axios.get(process.env.VUE_APP_BASEURL + `/scores/player?name=${this.$store.getters.getUser.username}`, this.$store.getters.getHeader)
      
      // Error handling - redirect to dashboard
      if (result.data === '') {
        this.$router.push('/')      
      } else
      
      // Player has already submitted daily quest
      if (this.day == result.data.points.length) {
        this.$store.commit('showSnackbar', 'Tagesaufgabe bereits gelöst')
        this.$router.push('/')
      } else 
      
      // Show daily quest
      {
        const result = await axios.get(process.env.VUE_APP_BASEURL + `/tasks/${this.day}`, this.$store.getters.getHeader)
        this.task = result.data.description
      }
    },
  },
  mounted() {
    this.getQuest()
  }
}
</script>

<style>

</style>
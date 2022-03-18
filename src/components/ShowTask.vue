<template>
  <v-card
    class="mx-auto"
    max-width="620"
    elevation="12"
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="text-overline mb-4 text-center">
          OVERLINE
        </div>
        <v-list-item-title class="text-h5 mb-1">
          {{task}}
        </v-list-item-title>
        <v-img            
          aspect-ratio="1.0"
          :src="image"
          max-height="300"
          contain                    
        >
        </v-img>
        <div
          class="mt-4 text-body-1 text-justify"
          >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit saepe rem neque temporibus eos maxime, iure nulla, odio aperiam animi dolores quidem ullam voluptatem sit minima sed laboriosam delectus consequuntur perspiciatis et recusandae, totam est aliquam! Pariatur distinctio, sint eum illum, ad culpa itaque aspernatur doloribus tempora odit aliquam! Quidem?</div>
      </v-list-item-content>
    </v-list-item>
    <v-card-actions>
      <v-text-field
        class="mx-4"
        :placeholder="label"
        v-model="solution"
      >
      </v-text-field>
      <v-btn
        outlined
        rounded
        text
        @click="submit"
      >
        Absenden
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
      image: '',
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
      this.$router.push('/')
    },
    async getQuest() {

      // Check if a game is in progress
      const scores = await axios.get(process.env.VUE_APP_BASEURL + '/scores/', this.$store.getters.getHeader)
      if (scores.data.length === 0) {
        this.$router.push('/')
        return
      }

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
        this.image = result.data.img
        this.task = result.data.description
      }
    },
  },
  mounted() {
    if (this.$store.getters.getMock.day)  {
      this.day = this.$store.getters.getMock.day
    }
    this.getQuest()
  }
}
</script>

<style>

</style>
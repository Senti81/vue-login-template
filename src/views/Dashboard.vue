<template>
  <v-container>
    <v-card
      v-if="!this.$store.getters.isStarted"
      class="grey lighten-3 pa-2 ma-2"
      elevation="12"
      max-width="800"
      >
      <v-icon class="ma-2">mdi-information</v-icon>
      <v-spacer></v-spacer>
      <v-card-title class="text-md-h4">Erklär-Text.</v-card-title>
      <v-card-subtitle class="mt-2">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae, totam repellendus! Voluptates, necessitatibus voluptas. Accusamus, ullam molestiae! Illo quas optio beatae facilis amet inventore minima libero autem repellat minus debitis quasi rem tenetur ab dolore, reprehenderit molestiae totam similique. Dolorum reprehenderit vel labore aut corporis repudiandae aspernatur iste sapiente impedit.</v-card-subtitle>
    </v-card>
    <div v-else>
      <v-card
        class="grey lighten-3 pa-2 ma-2"
        elevation="12"
        max-width="800"
        >
        <div v-if="show">
          <ScoreProgress
            v-for="(item, index) in value"
            :key="index"
            :item="item"
            :index="index"
            />
        </div>
        <NoProgress v-else/>
      </v-card>
      <v-card
        v-show="this.$store.getters.isAdmin"
        class="mt-4 mx-auto pa-6"
        max-width="800"
        >
        <v-list-item v-for="score in scores" :key="score.id">
          {{score.username}}: {{score.points}}
        </v-list-item>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import ScoreProgress from '@/components/ScoreProgress.vue'
import NoProgress from '@/components/NoProgress.vue'
import axios from 'axios'
import { format } from 'date-fns'

export default {
  components: {
    ScoreProgress,
    NoProgress
  },
  data() {
    return {
      show: false,
      value: [],
      scores: []
    }
  },
  methods: {
    async showResults() {
      const result = await axios.get(process.env.VUE_APP_BASEURL + '/scores/')
      this.scores = result.data
      let pointsArray = []
      result.data.forEach(element => {
        pointsArray.push(element.points)
      });
      this.value = pointsArray
      this.show = true
    },
  },
  mounted() {
    // this.$store.dispatch('isInProgress')
    let currentHour
    if (this.$store.getters.getMock.hour) {
      currentHour = this.$store.getters.getMock.hour
    } else {
      currentHour = format(new Date(), 'H')
    }
    if (currentHour >= this.$store.state.END) {
      this.showResults()
    }
  }
}
</script>

<style>

</style>
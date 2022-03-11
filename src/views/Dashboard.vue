<template>
  <v-container>
    <v-card
      class="mt-4 mx-auto pa-6"
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
      value: []
    }
  },
  methods: {
    async showResults() {
      const result = await axios.get(process.env.VUE_APP_BASEURL + '/scores/')
      let pointsArray = []
      result.data.forEach(element => {
        pointsArray.push(element.points)
      });
      this.value = pointsArray
      this.show = true
    },
  },
  mounted() {
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
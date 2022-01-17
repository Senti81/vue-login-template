<template>
  <v-container>
    <v-divider></v-divider>
    <v-col>
      <v-sparkline
        v-if="show"
        :gradient="['#C8E6C9','#1B5E20']"
        gradient-direction="right"
        height="100vh"
        auto-line-width
        :value="value"
        line-width="20px"
        show-labels
        type="bar"
      ></v-sparkline>
      <p v-else class="text-center body-1">
        Ergebnisse werden hier täglich um {{$store.state.RESULT_SHOW}} Uhr eingeblendet.
      </p>
    </v-col>
  </v-container>
</template>

<script>
import axios from 'axios'
import { format } from 'date-fns'

export default {
  data() {
    return {
      show: false,
      value: [],
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
    const currentHour = format(new Date(), 'H')
    if (currentHour >= this.$store.state.RESULT_SHOW) {
      this.showResults()
    }
  }
}
</script>

<style>

</style>
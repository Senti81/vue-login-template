<template>
  <v-card        
    class="grey lighten-3 pa-4"
    min-height="90vh"
    elevation="12"
    >
    <v-card
      v-for="(user, index) in userList"
      :key="user.id"
      class="grey lighten-3 mt-4"
      >
      <v-card-title>{{user.name}}</v-card-title>
      <v-card-subtitle>{{user.username}}</v-card-subtitle>
      <v-card-text>
        <v-text-field
          v-model="solution[index]"
          label="Name"
          type="text"
          required
          >
        </v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn            
          class="pa-4"
          color="primary"
          @click="submit(user.username, solution[index])"
          >
          Abschicken
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-card>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      userList: [],
      solution: []
    }
  },
  methods: {
    async loadUserList() {
      const result = await axios.get(process.env.VUE_APP_BASEURL + '/users', this.$store.getters.getHeader)
      this.userList = result.data
    },
    submit(username, solution) {
      console.log(username, solution);
    }
  },
  mounted() {
    this.loadUserList()
  }
}
</script>

<style>

</style>
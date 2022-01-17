<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="3">
        <v-card        
          class="grey lighten-3 pa-4"
          min-height="90vh"
          elevation="12"
          >
          <v-card-title>Neuen Benutzer registrieren</v-card-title>
          <v-card-text>
            <v-text-field
              label="Name"
              type="text"
              v-model="name"
              required
              >
            </v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn            
              class="pa-4 mt-4"
              color="primary"
              @click="save"
              >
              Benutzer anlegen
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" sm="9">
        <UserList/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UserList from '@/components/UserList.vue'
export default {
  components: {
    UserList
  },
  data() {
    return {
      name: ''
    }
  },
  methods: {
    async save() {
      await this.$store.dispatch('registerUser', { username: this.name, password: 'maus1234'})
      this.name = ''
    }
  }
}
</script>

<style>

</style>
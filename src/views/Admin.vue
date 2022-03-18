<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="4">
        <v-card        
          class="grey lighten-3 pa-4"
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
              block    
              class="pa-4 mt-4"
              color="primary"
              @click="save"
              >
              Benutzer anlegen
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card        
          class="grey lighten-3 pa-4"
          elevation="12"
          >
          <v-card-title>Spiel</v-card-title>
          <v-card-actions>
            <v-col>
              <v-btn
                block                          
                class="pa-4 mt-4"
                color="success"
                @click="startGame"
                >
                Start
              </v-btn>
              <v-btn
                block                          
                class="pa-4 mt-4"
                color="error"
                @click="stopGame"
                >
                Reset
              </v-btn>
            </v-col>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card        
          class="grey lighten-3 pa-4"
          elevation="12"
          >
          <v-card-title>Tag / Uhrzeit</v-card-title>
          <v-card-actions>
            <v-col>
              <v-card-text>
                <v-text-field
                  label="Tag"
                  type="number"
                  v-model="day"
                  required
                  >
                </v-text-field>
              </v-card-text>
              <v-card-text>
                <v-text-field
                  label="Stunde"
                  type="number"
                  v-model="hour"
                  required
                  >
                </v-text-field>
              </v-card-text>
              <v-btn
                block                          
                class="pa-4 mt-4"
                color="primary"
                @click="setConfig"
                >
                Speichern
              </v-btn>
            </v-col>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UserList from '@/components/UserList.vue'
import axios from 'axios'
export default {
  components: {
    UserList
  },
  data() {
    return {
      name: '',
      day: '',
      hour: ''
    }
  },
  methods: {
    async getConfig() {
      const result = await axios.get(process.env.VUE_APP_BASEURL + '/config')
      this.day = result.data.day
      this.hour = result.data.hour
    },
    async setConfig() {
      const payload = {
        day: this.day,
        hour: this.hour
      }
      await axios.put(process.env.VUE_APP_BASEURL + '/config', payload)
    },
    async save() {
      await this.$store.dispatch('registerUser', { username: this.name, password: 'maus1234'})
      this.name = ''
    },
    startGame() {
      this.$store.dispatch('startGame')
    },
    stopGame() {
      this.$store.dispatch('stopGame')
    }
  },
  mounted() {
    this.getConfig()
  }
}
</script>

<style>

</style>
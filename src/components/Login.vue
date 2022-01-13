<template>
  <v-main>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary" src="question-mark.jpg">
              <v-toolbar-title>Login</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  prepend-icon="mdi-account"
                  name="login"
                  label="Benutzername"
                  type="text"
                  v-model="username"
                ></v-text-field>
                <v-text-field
                  prepend-icon="mdi-lock"
                  name="password"
                  label="Passwort"
                  type="password"
                  v-model="password"
                  @keyup.enter="login"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn :disabled="disabled" color="primary" @click="login">Anmelden</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
      <Overlay v-show="this.$store.getters.isLoading"/>
    </v-container>
  </v-main>
</template>

<script>
import Overlay from '@/components/Overlay.vue'
export default {
   components: {
      Overlay      
   },
   data() {
      return {
         username: '',
         password: ''
      }
   },
   computed: {
      disabled() {
         return this.username.length == 0 || this.password.length < 4
      },
   },
   methods: {
      async login() {
         this.$store.commit('toggleLoading')
         this.error = false
         const payload = { username: this.username, password: this.password }
         const response = await this.$store.dispatch('verifyLogin', payload)
         const data = response.data
         if (!data.message) {
           if (!data.user.name) {
             this.$router.replace('/account')             
           } else {
             this.$router.replace('/')
           }
         } else {
           this.$store.commit('showSnackbar', 'Benutzername oder Passwort falsch')
           this.username = '',
           this.password = ''
         }
         this.$store.commit('toggleLoading')
      }
   }
}
</script>

<style>
</style>
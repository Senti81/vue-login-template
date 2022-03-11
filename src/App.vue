<template>
  <v-app>
    <Login v-if="!this.$store.getters.isAuthenticated"/>
    <Main v-else />
    <Snackbar/>
    <Overlay v-show="this.$store.getters.isLoading"/>
  </v-app>
</template>

<script>
import Login from '@/components/Login.vue'
import Main from '@/components/Main.vue'
import Snackbar from '@/components/Snackbar.vue'
import Overlay from '@/components/Overlay.vue'

export default {
  name: 'App',
  components: {
    Login,
    Main,
    Snackbar,
    Overlay
  }, 
  mounted() {
    const token = localStorage.getItem('user-token')
    if(token) 
      this.$store.dispatch('validateToken', token)
  }
}
</script>

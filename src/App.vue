<template>
  <v-app>
    <Login v-if="!this.$store.getters.isAuthenticated"/>
    <Main v-else />
    <Snackbar/>
  </v-app>
</template>

<script>
import Login from '@/components/Login.vue'
import Main from '@/components/Main.vue'
import Snackbar from '@/components/Snackbar.vue'

export default {
  name: 'App',
  components: {
    Login,
    Main,
    Snackbar
  },
  mounted() {
      const token = localStorage.getItem('user-token')
      if(token) 
        this.$store.dispatch('validateToken', token)
    }
};
</script>

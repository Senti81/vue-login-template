<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-img        
        class="pa-4 pt-7"
        src="question-mark.jpg"
        height="170"
      >
        <v-avatar size="70" class="mb-2" color="indigo">
         <span class="white--text text-h5">{{getInitials}}</span>
        </v-avatar>
        <div class="white--text text-subtitle-1 font-weight-bold">
          {{this.$store.getters.getUser.name}}
        </div>
        <div class="white--text text-subtitle-2">
          {{this.$store.getters.getUser.username}}
        </div>
      </v-img>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.to"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="this.$store.getters.isAdmin" to="/admin" key="admin">
          <v-list-item-icon>
            <v-icon>mdi-cog-outline</v-icon>
          </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Admin</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="logout" key="logout">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      dense       
      app
      color="primary"
      dark
      src="question-mark.jpg"
      >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>    
      <Clock v-show="this.$store.getters.isStarted"/>
    </v-app-bar>

    <v-main>
      <router-view/>
      <!--  -->
    </v-main>
  </v-app>
</template>

<script>
import Clock from '@/components/Clock.vue'
export default {
  components: {
    Clock
  },
  data() {
    return {
      drawer: null,
      items: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard', to: '/' },
        { title: 'Tagesaufgabe', icon: 'mdi-format-list-checks', to: '/task' }
      ],
    }
  },
  computed: {
    getInitials() {
      if (this.$store.getters.getUser.username) {
        const name = this.$store.getters.getUser.username
        return name.substring(0, 2).toUpperCase()
      }
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
      this.$router.replace('/login')
    }
  }
};
</script>

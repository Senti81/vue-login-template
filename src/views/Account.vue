<template>
  <v-container>
    <v-layout align-center justify-center>
      <v-col class="ma-8 px-6">
        <v-row>
          <p class="body-2">
            Wähle einen Namen, so wie er in der App angezeigt werden soll.
            Der Benutzername bleibt davon unberührt.
          </p>
        </v-row>
        <v-row>
          <v-text-field
            label="Name"
            type="text"
            v-model="name"
            :rules="nameRules"
            required
            >
          </v-text-field>
        </v-row>
        <v-row>
          <p class="body-2 mt-8">Ändere hier dein Standardpasswort:</p>
        </v-row>
        <v-row>
          <v-text-field
            label="Neues Passwort"
            :type="show1 ? 'text' : 'password'"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="passwordRules"
            v-model="password"
            @click:append="show1 = !show1"
            >
          </v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            label="Passwort wiederholen"
            :type="show2 ? 'text' : 'password'"
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="passwordRules"
            v-model="repeat"
            @click:append="show2 = !show2"
            >
          </v-text-field>
        </v-row>
        <v-row>
          <v-spacer></v-spacer>
          <v-btn
            block
            class="mt-4"
            :disabled="disabled"
            color="primary"
            @click="save"
            >
            Änderungen speichern
          </v-btn>
        </v-row>
      </v-col>
      <v-snackbar bottom v-model="snackbar">
        {{ msg }}
      </v-snackbar>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      name: this.$store.getters.getUser.name || '',
      nameRules: [
        v => !!v || 'Name ist ein Pflichtfeld',
        v => v.length <= 16 || 'Name darf nicht länger als 16 Zeichen sein'
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Passwort ist ein Pflichtfeld',
        v => v.length >= 6 || 'Passwort muss aus mindestens 6 Zeichen bestehen'
      ],
      repeat: '',
      show1: false,
      show2: false,
      snackbar: false,
      msg: ''
    }
  },
  computed: {
    disabled() {
      return this.password !== this.repeat || this.name.length === 0 || this.password.length < 6
    }
  },
  methods: {
    async save(){
      try {
        await this.$store.dispatch('updateUser', { name: this.name, password: this.password })
        this.$router.push('/')
        this.$store.commit('showSnackbar', 'Passwort geändert')
      } catch (error) {
        
      }
    }
  }
}
</script>

<style>

</style>
<template>
  <v-app id="inspire">
    <v-navigation-drawer class="oculto-impresion" v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title"> {{ email }} </v-list-item-title>
          <v-list-item-subtitle> Welcome </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider ></v-divider>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
          <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar class="oculto-impresion" app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>My App</v-toolbar-title>
    </v-app-bar>

    <v-main class="pa-5">
      <router-view />
    </v-main>

    <v-snackbar v-model="snackbar" :timeout="timeout">
      Hello, {{ email }}
      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>

export default {
  data: () => ({
    drawer: null,
    snackbar: null,
    timeout: 1500,
    isOnline: localStorage.getItem("isOnline"),
    email: localStorage.getItem("email"),
    items: [
      { title: "Billing", icon: "mdi-printer", to: 'billing'},
    ],
  }),
  methods: {
  },
  mounted() {
    if (this.isOnline) this.snackbar = true;
    else this.$router.push("/");
  },
};
</script>
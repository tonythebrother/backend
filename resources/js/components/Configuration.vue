<template>
  <v-app>
    <v-row justify="center">
      <v-col>
        <v-card elevation="15">
          <v-list three-line subheader>
            <v-subheader>User Controls</v-subheader>
            <v-list-item @click="logOut">
              <v-list-item-content>
                <v-list-item-icon>
                  <v-icon>mdi-account-arrow-right-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Log Out</v-list-item-title>
                <v-list-item-subtitle>Close your account</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-dialog v-model="dialog" hide-overlay persistent width="300">
              <v-card color="primary" dark>
                <v-card-text>
                  Please stand by
                  <v-progress-linear
                    indeterminate
                    color="white"
                    class="mb-0"
                  ></v-progress-linear>
                </v-card-text>
              </v-card>
            </v-dialog>
          </v-list>
          <v-divider></v-divider>
          <v-list three-line subheader>
            <v-subheader>General</v-subheader>
            <v-list-item>
              <v-list-item-action>
                <v-list-item-icon>
                  <v-icon :color="$vuetify.theme.dark ? `yellow` : `black`">
                    mdi-brightness-4
                  </v-icon>
                </v-list-item-icon>
                <v-switch
                  class="secondary pa-3 ma-0 rounded"
                  v-model="$vuetify.theme.dark"
                  inset
                  :label="
                    $vuetify.theme.dark
                      ? 'Activate Light Theme'
                      : 'Activate Dark Theme'
                  "
                >
                </v-switch>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    switch: false,
  }),
  methods: {
    logOut() {
      if (confirm("Are you sure?")) {
        this.dialog = !this.dialog;
        localStorage.removeItem("isOnline");
        localStorage.removeItem("email");
        setTimeout(() => (window.location.href = "/"), 1500);
      }
    }
  }
};
</script>
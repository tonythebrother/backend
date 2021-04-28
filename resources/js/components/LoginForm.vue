<template>
  <v-container>
    <v-row class="text-center">
      <v-col>
        <v-card class="pa-5 rounded-lg">
          <v-form ref="form" lazy-validation>
            <h1>Log In</h1>

            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              type="email"
              required
            ></v-text-field>

            <v-text-field
              v-model="pass"
              :rules="passRules"
              label="Password"
              type="password"
              required
            ></v-text-field>

            <v-btn color="primary" class="mr-4 mt-5" @click="logIn">
              Log In
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    pass: "",
    passRules: [
      (v) => !!v || "Password is required",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    isOnline: localStorage.getItem('isOnline')
  }),

  methods: {
    logIn() {
      if (this.$refs.form.validate()) {
        window.localStorage.setItem("isOnline", true);
        window.localStorage.setItem("email", this.email);
        this.$router.push("/home");
      }
    },
  },
  mounted() {
    if (this.isOnline) this.$router.push("/home");
  },
};
</script>

<template>
  <v-container class="log-in">
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-row justify="center" align="center" class="text-center">
          <v-col>
            <v-card elevation="10" class="pa-5 rounded-lg">
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

                <v-btn
                  color="primary"
                  class="mr-4 mt-5"
                  @click="logIn('false')"
                >
                  Log In
                </v-btn>

                <v-btn color="primary" class="mr-4 mt-5" @click="logIn('true')">
                  Sign In
                </v-btn>
              </v-form>

              <v-overlay :value="overlay">
                <v-progress-circular
                  indeterminate
                  size="64"
                ></v-progress-circular>
              </v-overlay>
            </v-card>
          </v-col>
        </v-row>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    pass: "",
    passRules: [(v) => !!v || "Password is required"],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    isOnline: localStorage.getItem("isOnline"),
    overlay: false,
  }),
  methods: {
    logIn(condition) {
      if (this.$refs.form.validate()) {
        this.overlay = !this.overlay;
        axios
          .post("/api/empleado", {
            email: this.email,
            password: this.pass,
            issignin: condition,
          })
          .then((response) => {
            if (response.data !== "Failed") {
              localStorage.setItem("isOnline", true);
              localStorage.setItem("email", response.data);
            } else alert("Usuario no encontrado");
          })
          .catch((err) => {
            console.log(err);
            this.overlay = !this.overlay;
          })
          .finally(() => this.$router.push("/billing"));
      }
    },
  },
  mounted() {
    if (this.isOnline) this.$router.push("/billing");
  },
};
</script>

<style>
</style>
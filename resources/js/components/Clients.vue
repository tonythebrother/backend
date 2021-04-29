<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col cols="6">
          <v-form ref="form" lazy-validation>
            <v-text-field
              v-model="name"
              :rules="nameRules"
              label="Name"
              required
              class="mb-5"
            ></v-text-field>

            <v-btn color="success" class="mb-3" @click="addClient"> Add </v-btn>
            <v-progress-linear
              :active="loading"
              :indeterminate="loading"
              color="teal"
            ></v-progress-linear>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-list>
        <template v-for="item in items">
          <v-list-item :key="item.id">
            <v-list-item-avatar>
              <v-img src="https://cdn.vuetifyjs.com/images/lists/1.jpg"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-html="item.nombre">{{
                item.nombre
              }}</v-list-item-title>
              <v-list-item-subtitle>{{
                item.created_at
              }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-icon color="red" @click="deleteClient(item.id)">
              mdi-trash-can-outline
            </v-icon>
          </v-list-item>
        </template>
      </v-list>
    </v-container>
  </v-app>
</template>
<script>
import axios from "axios";

export default {
  data: () => ({
    url: "/api/cliente",
    items: [],
    name: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length >= 3) || "Name must be more than 2 characters",
    ],
    loading: true,
  }),
  methods: {
    addClient() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        axios
          .post(this.url, {
            nombre: this.name,
          })
          .then((response) => {
            this.items.push(response.data);
          })
          .catch((err) => console.error(err))
          .finally(() => (this.loading = false));
      }
    },
    deleteClient(id) {
      this.loading = true;
      axios
        .delete(this.url + "/" + id)
        .then((response) => this.getClients())
        .catch((err) => console.error(err));
    },
    getClients() {
      axios
      .get(this.url)
      .then((response) => (this.items = response.data))
      .catch((err) => console.error(err))
      .finally(() => (this.loading = false));
    }
  },
  mounted() {
    this.getClients();
  },
};
</script>
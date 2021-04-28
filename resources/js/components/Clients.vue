<template>
  <v-app>
    <v-form ref="form" lazy-validation>
      <v-text-field
        v-model="name"
        :rules="nameRules"
        label="Name"
        required
      ></v-text-field>

      <v-btn color="success" class="mr-4" @click="addClient">
        Add
      </v-btn>
    </v-form>
    <v-list three-line>
      <template v-for="(item, index) in items">
        <v-list-item :key="index">
          <v-list-item-avatar>
            <v-img src="https://cdn.vuetifyjs.com/images/lists/1.jpg"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-html="item.nombre">{{
              item.nombre
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-app>
</template>
<script>
import axios from "axios";

export default {
  data: () => ({
    url: '/api/cliente',
    items: [],
    name: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length >= 3) || "Name must be more than 2 characters",
    ],
  }),
  methods: {
    addClient() {
        if (this.$refs.form.validate()) {
            axios.post(this.url, {
                nombre: this.name
            })
            .then(response => {
                this.items.push(response.data);
            })
            .catch(err => console.error(err));
        }
    },
  },
  mounted() {
    axios
      .get(this.url)
      .then((response) => (this.items = response.data))
      .catch((err) => console.error(err));
  },
};
</script>
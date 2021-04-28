<template>
  <v-app>
    <v-form ref="form" lazy-validation>
      <v-text-field
        v-model="name"
        :rules="nameRules"
        label="Name"
        required
        class="mb-5"
      ></v-text-field>

      <v-btn color="success" class="mr-4" @click="addClient">
        Add
      </v-btn>
    </v-form>
    <v-list three-line>
      <template v-for="(item, index) in items">
        <v-list-item :key="item.id">
          <v-list-item-avatar>
            <v-img src="https://cdn.vuetifyjs.com/images/lists/1.jpg"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-html="item.nombre">{{
              item.nombre
            }}</v-list-item-title>
          </v-list-item-content>

          <v-btn class="red" @click="deleteClient(item.id, index)">
            Delete
          </v-btn>

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
    deleteClient(id) {
      axios.delete(this.url + '/' + id).then(response => {
          this.items.splice(id, 1);
      })
    }
  },
  mounted() {
    axios
      .get(this.url)
      .then((response) => (this.items = response.data))
      .catch((err) => console.error(err));
  },
};
</script>
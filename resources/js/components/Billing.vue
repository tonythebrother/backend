<template>
  <v-row class="ml-10">
    <v-col>
      <h1 class="oculto-impresion">Simplified Billing System</h1>
      <v-form ref="form" lazy-validation>
        <v-row class="mb-8 oculto-impresion">
          <v-col cols="4">
            <v-select
              v-model="select"
              :items="items.description"
              :rules="[(v) => !!v || 'Item is required']"
              label="Item"
              required
            ></v-select>
          </v-col>
          <v-col cols="2">
            <v-text-field
              v-model="quantity"
              :rules="quantRules"
              label="Quantity"
              type="number"
              required
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-btn class="oculto-impresion mb-5" color="primary" @click="addItem()">
          Add Product
        </v-btn>
        <v-btn
          color="red"
          class="ml-4 mb-5 oculto-impresion"
          @click="list.pop()"
        >
          Remove Product
        </v-btn>
        <h3 class="oculto-impresion">Preview</h3>
        <div style="font-family: 'Times New Roman'" id="bill" class="pa-2">
          <h2>Nombre de Tienda</h2>
          <table
            style="
              font-size: 12px;
              border-top: 1px solid black;
              border-collapse: collapse;
            "
          >
            <tr>
              <td>Sucursal</td>
            </tr>
            <tr>
              <td>Direccion</td>
            </tr>
            <tr>
              <td>RNC</td>
            </tr>
            <tr>
              <td>Autorización de la DGII</td>
            </tr>
            <tr style="text-align: left">
              <th>DESCRIPCION</th>
              <th>CANTIDAD</th>
              <br>
              <th>VALOR</th>
            </tr>
            <tr v-for="item in list" :key="item.products">
              <td>{{ item.products }}</td>
              <td>{{ item.quantities }}</td>
              <td>{{ item.prices * item.quantities }}</td>
            </tr>
            <tr>
              <th>TOTAL</th>
              <td></td>
              <th>{{ getTotal() }}</th>
            </tr>
          </table>
        </div>
        <v-btn color="success" class="mt-5 oculto-impresion" @click="print()">
          Create bill
        </v-btn>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    select: null,
    items: {
      description: ["Papa LB.", "Platano Und.", "Salami Und.", "Aceite Galón"],
      prices: [25.0, 15.0, 85.0, 60.0],
    },
    quantity: null,
    quantRules: [(v) => !!v || "Quantity is required"],
    list: [],
    numItems: 0,
  }),

  methods: {
    validate() {
      return this.$refs.form.validate();
    },
    getTotal() {
      var prices = 0;
      if (this.list.length != 0) {
        for (let i = 0; i < this.list.length; i++)
          prices += this.list[i].prices * this.list[i].quantities;
      }
      return prices;
    },
    addItem() {
      if (this.validate()) {
        const item = {
          products: this.select,
          prices: this.getPrice(this.select),
          quantities: this.quantity,
        };

        const position = this.list.map((e) => e.products).indexOf(this.select);

        if (position === -1) {
          this.list.push(item);
        } else {
          this.list[position].quantities = parseFloat(this.quantity);
        }
      }
    },
    getPrice() {
      const index = this.items.description.indexOf(this.select);
      return this.items.prices[index];
    },
    print() {
      window.print();
    },
  },
};
</script>
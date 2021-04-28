<template>
  <v-app>
    <v-main>
      <transition name="fade">
        <router-view />
      </transition>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
@media print {
    .oculto-impresion,
    .oculto-impresion * {
        display: none !important;
    }
  }
</style>
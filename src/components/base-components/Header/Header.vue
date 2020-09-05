<template>
  <q-header reveal elevated class="bg-grey-1 text-black">
    <q-toolbar>
      <q-toolbar-title>
        <router-link class="text-decoration-none cursor-pointer text-light-blue-12" to="/">Dailies</router-link>
      </q-toolbar-title>"
      <DButton label="Register" @click="registerOpen = true"/>
      <Register :model="registerOpen" @model="closeRegister" v-if="!this.$store.state.isLoggedIn" />
    </q-toolbar>
  </q-header>
</template>
<script>
import DButton from "../DButton.vue";
import Register from "../../sub-components/Register.vue";
import { Component, Props } from "vue-property-decorator";
export default {
  name: "Header",
  components: {
    DButton,
    Register,
  },
  data() {
    return {
      registerOpen: false,
    };
  },
  methods: {
    openRegister() {
      this.registerOpen = true;
    },
    closeRegister() {
      this.registerOpen = false;
    },
  },
};
</script>
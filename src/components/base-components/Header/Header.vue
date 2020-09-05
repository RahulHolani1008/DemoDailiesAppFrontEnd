<template>
  <q-header reveal elevated class="bg-grey-1 text-black">
    <q-toolbar>
      <q-toolbar-title>
        <router-link class="text-decoration-none cursor-pointer text-light-blue-12" to="/">Dailies</router-link>
      </q-toolbar-title>"
      <DButton label="Register" @click="registerOpen = true" v-if="!this.$store.state.isLoggedIn" />
      <DButton label="Log Out" @click="logOutOpen = true" v-if="this.$store.state.isLoggedIn" />
      <Register :model="registerOpen" @model="closeRegister" />
      <LogOut :model="logOutOpen" @model="closeLogOut" />
    </q-toolbar>
  </q-header>
</template>
<script>
import DButton from "../DButton.vue";
import Register from "../../sub-components/Register.vue";
import LogOut from "../../sub-components/LogOut.vue";
import { Component, Props } from "vue-property-decorator";
export default {
  name: "Header",
  components: {
    DButton,
    Register,
    LogOut,
  },
  data() {
    return {
      registerOpen: false,
      logOutOpen: false,
    };
  },
  methods: {
    openRegister() {
      this.registerOpen = true;
    },
    closeRegister() {
      this.registerOpen = false;
    },
    openLogOut() {
      this.logOutOpen = true;
    },
    closeLogOut() {
      this.logOutOpen = false;
    },
  },
};
</script>
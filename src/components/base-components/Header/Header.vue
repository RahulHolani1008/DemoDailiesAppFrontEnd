<template>
  <q-header reveal elevated class="bg-primary-gray text-black">
    <q-toolbar>
      <q-toolbar-title>
          <router-link class="text-decoration-none cursor-pointer" to="/">Dailies</router-link>
      </q-toolbar-title>
      <Register :model="registerOpen" @medium="closeRegister" v-if="!this.$store.state.isLoggedIn"/>
    </q-toolbar>
  </q-header>
</template>
<script>
import DButton from "../../base-components/DButton.vue";
import Register from "../../sub-components/Register/Register.vue";
export default {
    name: "Header",
  components: {
    DButton,
    Register,
  },
  data() {
    return {
      registerOpen: false
    };
  },
  methods: {
    openLogin() {
      this.registerOpen = true;
    },
    closeLogin() {
      this.registerOpen = false;
    }
  }
};
</script>
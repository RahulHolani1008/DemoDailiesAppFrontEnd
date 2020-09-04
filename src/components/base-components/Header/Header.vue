<template>
  <q-header reveal elevated class="bg-primary-gray text-black">
    <q-toolbar>
      <q-toolbar-title>
          <router-link class="text-decoration-none cursor-pointer" to="/">Dailies</router-link>
      </q-toolbar-title>
      <Login :medium="loginOpen" @medium="closeLogin" />
      <ForgotPassword :medium="forgotOpen" />
    </q-toolbar>
  </q-header>
</template>
<script>
import BHButton from "../../base-components/BHButton.vue";
import Login from "../../sub-components/Login/Login.vue";
export default {
  components: {
    BHButton,
    Login,
    ForgotPassword
  },
  data() {
    return {
      loginOpen: false,
      forgotOpen: false
    };
  },
  methods: {
    openLogin() {
      this.loginOpen = true;
    },
    closeLogin() {
      this.loginOpen = false;
    }
  }
};
</script>
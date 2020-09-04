<template>
  <q-layout view="hHh lpR fff">
    <DHeader />
    <q-page-container>
      <router-view />
    </q-page-container>
    <DFooter />
  </q-layout>
</template>

<script>
import DFooter from "../components/base-components/Footer/Footer.vue";
import DHeader from "../components/base-components/Header/Header.vue";
export default {
  name: 'MainLayout',
  data () {
    return {
    }
  }
}
</script>

<template>
  <div>
    <q-dialog v-model="model" persistent>
      <q-card style="width: 450px;" class="q-py-xl q-px-xl">
          <q-card-actions align="center">
              Are you sure you want to log out?
              <div class="row q-pt-lg">
            <DButton label="Cancel" type="submit" class="q-px-md" @click="onCancel"/>
            <DButton label="Yes" textColor="light-blue-12" color="white" class="q-px-md" type="submit" @click="onLogOut" />
            </div>
          </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import Vue from "vue";
import { Component, Props } from "vue-property-decorator";
import DButton from "../base-components/DButton.vue";

import axios from "axios";
export default {
  Name: "Register",
  components: {
    DButton,
  },
  props: {
    model: {
      default: false
    }
  },
  data() {
    return {
    };
  },
  methods: {
    onLogOut() {
        this.$store.commit("changeUser", {
                id: 0,
                fullName: "",
                email: ""
              });
              this.$store.commit("changeIsTeacher", false);
              this.$store.commit("changeIsLoggedIn", false);
        this.$emit("model")
      },
      onCancel() {
          this.$emit("model")
      }
  }
};
</script>

<template>
  <div>
    <q-dialog v-model="model" persistent>
      <q-card class="rounded-borders q-py-xl q-px-xl">
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-card-section class="text-center">
            <q-icon
              name="close"
              v-close-popup
              v-on:click="closeManageGroups"
              style="font-size: 1.5rem; top: -20px; left: -20px; position: absolute;"
            />
            <div class="text-h5">Manage Children</div>
          </q-card-section>
          <div class="row">
            <div class="row col-6">
              <div class="bg-light-blue-12 text-white fs--18 q-px-md q-py-sm col-12">Select a Child</div>
              <ChildSelector class="col-12" :addNew="true" @click="getSelectedChild" />
            </div>
            <div class="row col-6 q-pt-xl">
              <DTextField
            class="q-mx-auto col-12 q-pl-lg"
            label="Full Name"
            type="text"
            :model="userName"
            @model="userNameEntered"
            :rules="nameRules"
          />
          <DTextField
            class="q-mx-auto col-12 q-pl-lg"
            label="Email"
            type="email"
            :model="userEmail"
            @model="userEmailEntered"
            :rules="emailRules"
          />
          <DButton class="q-mx-auto" label="Submit"></DButton>
          <DButton class="q-mx-auto" color="white" textColor="light-blue-12" label="Remove Child"></DButton>
            </div>
          </div>
        </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import Vue from "vue";
import { Component, Props } from "vue-property-decorator";
import DTextField from "../base-components/DTextField.vue";
import DButton from "../base-components/DButton.vue";
import ChildSelector from "./ChildSelector.vue";
import Login from "./Login.vue";

import axios from "axios";
export default {
  Name: "Register",
  components: {
    DTextField,
    DButton,
    ChildSelector,
    Login
  },
  props: {
    model: {
      default: false
    }
  },
  data() {
    return {
      emailRegEx: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      emailRules: [
        val => !!val || "Email is required",
        val => this.emailRegEx.test(val) || "Enter a valid email address"
      ],
      nameRules: [
        val => !!val || "Full Name is required"
      ],
      userName: "",
      userEmail: ""
    };
  },
  methods: {
    getSelectedChild(student) {
      if(student == "Add New") {
        this.userName = "";
        this.userEmail = "";
      }
      else {
        this.userName = student.name;
        this.userEmail = student.email;
      }
    },
    userEmailEntered(value) {
      this.userEmail = value;
    },
    userNameEntered(value) {
      this.userName = value;
    },
    closeManageGroups() {
      this.$emit("model");
    },
    onSubmit() {
    },
  }
};
</script>

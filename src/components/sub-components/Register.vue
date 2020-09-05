<template>
  <div>
    <q-dialog v-model="model" persistent>
      <q-card style="width: 450px;" class="q-py-xl q-px-xl">
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-card-section class="text-center">
            <q-icon
              name="close"
              v-close-popup
              v-on:click="closeRegister"
              style="font-size: 1.5rem; top: -20px; left: -20px; position: absolute;"
            />
            <DToggleButton :stringOptions="toggleButtonData" @model="toggleSelected" />
          </q-card-section>
          <DTextField
            class="q-mx-auto q-px-xl"
            label="Full Name"
            type="text"
            :model="userName"
            @model="userNameEntered"
            :rules="nameRules"
          />
          <DTextField
            class="q-mx-auto q-px-xl"
            label="Email"
            type="email"
            :model="userEmail"
            @model="userEmailEntered"
            :rules="emailRules"
          />
          <DTextField
            class="q-mx-auto q-px-xl"
            label="Password"
            :isPassword="true"
            @model="userPasswordEntered"
            :model="userPassword"
            :rules="passwordRules"
          />
          <q-card-actions align="center">
            <DButton label="Register" type="submit" />
          </q-card-actions>
          <q-card-section class="text-center light-blue-12 q-pa-none" v-on:click="loginModel = true">Already have an account? Login here.</q-card-section>
        </q-form>
      </q-card>
      <q-dialog v-model="secondDialog" persistent transition-show="scale" transition-hide="scale">
        <q-card class="text-black" style="width: 300px">
          <q-card-section class="q-pt-md text-center">
            {{
            notificationMessage
            }}
          </q-card-section>
          <q-card-actions align="center">
            <BHButton label="OK" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-dialog>
    <Login :model="loginModel" @model="closeRegister" />
  </div>
</template>
<script>
import Vue from "vue";
import { Component, Props } from "vue-property-decorator";
import DTextField from "../base-components/DTextField.vue";
import DButton from "../base-components/DButton.vue";
import DToggleButton from "../base-components/DToggleButton.vue";
import Login from "./Login.vue";

import axios from "axios";
export default {
  Name: "Register",
  components: {
    DTextField,
    DButton,
    DToggleButton,
    Login
  },
  props: {
    model: {
      default: false
    }
  },
  data() {
    return {
      secondDialog: false,
      notificationMessage: "",
      toggleButtonData: [
        { label: "I'm a Teacher", value: "Teacher" },
        { label: "I'm a Parent", value: "Parent" }
      ],
      emailRegEx: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      emailRules: [
        val => !!val || "Email is required",
        val => this.emailRegEx.test(val) || "Enter a valid email address"
      ],
      passwordRules: [
        val => !!val || "Password is required",
        val => val.length >= 6 || "Password length must be atleast 6 characters"
      ],
      nameRules: [
        val => !!val || "Full Name is required"
      ],
      userPassword: "",
      loginModel: false,
    };
  },
  methods: {
    toggleSelected(value) {
      this.toggleValue = value;
    },
    userPasswordEntered(value) {
      this.userPassword = value;
    },
    userNameEntered(value) {
      this.userName = value;
    },
    userEmailEntered(value) {
      this.userEmail = value;
    },
    closeRegister() {
      this.$emit("model");
    },
    onSubmit() {
      const APIURL = this.toggleValue == "Teacher" ? "teacher" : "parent";
      if (this.toggleValue == "") {
        this.showDialog("Please select between JobSeeker and JobPoster");
      } else {
        const response = axios({
          method: "POST",
          url: this.$store.state.apiBaseURL + "/dailies/" +APIURL+"/register",
          data: {
            emailAddress: this.userEmail,
            password: this.userPassword,
            fullName : this.userName
          },
          headers: {
            "content-type": "application/json"
          }
        })
          .then(response => {
            let responseMessage = response.data.message;
            let activeLogId = response.data.data.activeLogId;
            if (response.data.data.userId != 0) {
              this.$store.commit("changeUser", {
                id: response.data.data.userId,
                email: this.userEmail,
                password: this.userPassword,
                isJobSeeker: userTypeId == "jobSeeker" ? true : false,
                isJobPoster: this.userTypeId == "jobSeeker" ? false : true,
                activeLogId: activeLogId
              });
              this.$store.commit('changeisLoggedIn', true);
              if (this.toggleValue == "Teacher") {
                this.$store.commit('changeIsTeacher',true);
              }
              else{
                this.$store.commit('changeIsTeacher',false);
              }
              this.closeRegister();
            } else {
              this.showDialog(
                "This email already exists with us. Please try logging in."
              );
            }
          })
          .catch(err => {
            this.showDialog(
              "This email already exists with us. Please try logging in."
            );
            console.log("error: ", err.message);
          });
      }
    },
    closeRegister() {
      this.loginModel = false;
    },
    showDialog(message) {
      this.secondDialog = true;
      this.notificationMessage = message;
    }
  },
  computed: {
    userEmail: {
      get() {
        return this.$store.state.user.email;
      },
      set(value) {
        this.$store.state.user.email = value;
      }
    },
    userName: {
      get() {
        return this.$store.state.user.fullName;
      },
      set(value) {
        this.$store.state.user.fullName = value;
      }
    },
    toggleValue: {
      get() {
        const isTeacher = this.$store.state.isTeacher;
        if (isTeacher) {
          return "Teacher";
        } else {
          return "Parent";
        }
      },
      set(value) {
        if (value == "Teacher") {
          this.$store.state.isTeacher = true;
        } else {
          this.$store.state.isTeacher = false;
        }
      }
    }
  }
};
</script>

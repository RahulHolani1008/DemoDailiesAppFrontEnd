<template>
  <div>
    <q-dialog v-model="model" persistent>
      <q-card style="width: 450px;" class="q-py-xl q-px-xl">
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-card-section class="text-center">
            <q-icon
              name="close"
              v-close-popup
              v-on:click="closeLogin"
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
    </q-dialog>
    <Login :model="loginModel" @model="closeLogin" />
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
    closeLogin() {
      this.$emit("model");
    },
    onSubmit() {
      var userTypeId = this.toggleValue == "jobSeeker" ? 1 : 2;
      if (this.toggleValue == "") {
        this.showDialog("Please select between JobSeeker and JobPoster");
      } else {
        const response = axios({
          method: "POST",
          url: this.$store.state.apiBaseURL + "/user/login",
          data: {
            emailAddress: this.userEmail,
            password: this.userPassword,
            userTypeId: userTypeId,
            ipAddress: this.$store.state.ipAddress,
            deviceType: "System"
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
              localStorage.setItem(
                "token",
                JSON.stringify(response.data.data.jwtToken)
              );

              if (userTypeId == 2) {
                this.$router.push("/JobPoster/PostJob");
                this.$store.commit('changeisJobPoster', true);
                this.$store.commit('changeisLoggedIn', true);
                this.$store.commit('changeisLoggedOut',false);
                this.$store.commit('changeisJobSeeker',false);
              }
              else{
                this.$store.commit('changeisJobPoster', false);
                this.$store.commit('changeisLoggedIn', true);
                this.$store.commit('changeisLoggedOut',false);
                this.$store.commit('changeisJobSeeker',true);
              }
              this.closeLogin();
            } else {
              this.showDialog(
                "Please check your email and password combination and try again"
              );
            }
          })
          .catch(err => {
            this.showDialog(
              "Please check your email and password combination and try again"
            );
            console.log("error: ", err.message);
          });
      }
    },
    closeLogin() {
      this.loginModel = false;
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

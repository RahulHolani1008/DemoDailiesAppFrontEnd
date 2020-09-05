<template>
  <div>
    <q-dialog v-model="model" persistent>
      <q-card class="rounded-borders  full-width q-py-xl q-px-xl">
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-card-section class="text-center">
            <q-icon
              name="close"
              v-close-popup
              v-on:click="closeLogin"
              style="font-size: 1.5rem; top: -20px; left: -20px; position: absolute;"
            />
            <div class="text-h5">Manage Children</div>
          </q-card-section>
          <div class="row">
            <div class="row col-6">
              <div class="bg-light-blue-12 text-white fs--18 q-px-md q-py-sm col-12">Select a Child</div>
              <ChildSelector class="col-12" :addNew="true" />
            </div>
            <div class="row col-6">
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
    };
  },
  methods: {
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

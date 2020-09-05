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
              <ChildSelector
                class="col-12"
                :addNew="true"
                @click="getSelectedChild"
                :studentList="studentList"
              />
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
              <DButton
                class="q-mx-auto q-pt-sm"
                color="white"
                textColor="light-blue-12"
                label="Remove Child"
                type="button"
                @click="removeChild"
              ></DButton>
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
    Login,
  },
  props: {
    model: {
      default: false,
    },
  },
  data() {
    return {
      emailRegEx: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      emailRules: [
        (val) => !!val || "Email is required",
        (val) => this.emailRegEx.test(val) || "Enter a valid email address",
      ],
      nameRules: [(val) => !!val || "Full Name is required"],
      userName: "",
      userEmail: "",
      userId: null,
      studentList: [],
    };
  },
  methods: {
    getSelectedChild(student) {
      if (student == "Add New") {
        this.userName = "";
        this.userEmail = "";
        this.userId = null;
      } else {
        this.userName = student.fullName;
        this.userEmail = student.email;
        this.userId = student.id;
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
      if (this.userId) {
        const response = axios({
          method: "POST",
          url: this.$store.state.apiBaseURL + "/dailies/student/enroll",
          data: {
            id: this.userId,
            email: this.userEmail,
            fullName: this.userName,
            parentId: this.$store.state.user.id,
          },
          headers: {
            "content-type": "application/json",
          },
        })
          .then((response) => {
            if (response.status == 200) {
              this.studentList.forEach((student) => {
                if (student.id == this.userId) {
                  student.fullName = response.data.fullName;
                  student.email = response.data.email;
                }
              });
            } else {
              console.log("error: ", response);
            }
          })
          .catch((err) => {
            console.log("error: ", err.message);
          });
      } else {
        const response = axios({
          method: "POST",
          url: this.$store.state.apiBaseURL + "/dailies/student/enroll",
          data: {
            email: this.userEmail,
            fullName: this.userName,
            parentId: this.$store.state.user.id,
          },
          headers: {
            "content-type": "application/json",
          },
        })
          .then((response) => {
            if (response.status == 200) {
              this.studentList.push(response.data);
            } else {
              console.log("error: ", response);
            }
          })
          .catch((err) => {
            console.log("error: ", err.message);
          });
      }
    },
    removeChild() {
      axios
        .delete(
          this.$store.state.apiBaseURL +
            "/dailies/student/deletestudent/" +
            this.userId
        )
        .then((response) => {
          this.studentList = this.studentList.filter(
            (student) => student.id != this.userId
          );
          this.userName = "";
          this.userEmail = "";
          this.userId = null;
          this.$emit("deleted");
        })
        .catch((err) => {
          console.log("error", err);
        });
    },
  },
  created() {
    axios
      .get(
        this.$store.state.apiBaseURL +
          "/dailies/student/getStudents/" +
          this.$store.state.user.id
      )
      .then((response) => {
        this.studentList = response.data;
      })
      .catch((err) => {
        console.log("error", err);
      });
  },
};
</script>

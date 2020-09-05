<template>
  <div>
    <div class="row q-px-xl q-pt-lg q-pb-none">
      <div
        class="col-lg-4 col-md-6 col-sm-12 col-xs-12 q-pa-md"
        v-for="classes in classData"
        :key="classes.id"
        v-show="(classes.id == 0 && isTeacher) || (classes.id != 0)"
      >
        <div :class="{'bg-images' : classes.id != 0}">
          <q-card
            class="rounded-borders q-card-custom q-pa-lg relative-position bg-black"
            v-for="teacher in teacherData"
            :key="teacher.id"
            v-show="teacher.id == classes.teacherId || (classes.id == 0 && isTeacher)"
          >
            <q-card-section class="text-h4 text-white">{{classes.className}}</q-card-section>
            <q-card-section class="fs--22 absolute left-25 bottom-100 text-white">
              <span class="text-grey">By</span>
              <span class="q-ml-sm">{{teacher.fullName}}</span>
            </q-card-section>
            <q-card-actions class="absolute bottom-right-30">
              <DButton
                label="View Details"
                class="q-ml-auto"
                color="light-blue-12"
                @click="routeToViewDetails(classes, teacher)"
                v-if="!((classes.id == 0 && isTeacher))"
              />
              <DButton
                label="Add class"
                class="q-ml-auto"
                color="light-blue-12"
                @click="addClass"
                v-else
              />
              <DButton
                label="Enroll Now"
                class="q-ml-sm q-mr-none"
                @click="openpopup(classes)"
                v-if="!isTeacher"
              />
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>
    <div class="row q-pb-sm" v-if="!isTeacher">
      <div class="col-xs-3 col-sm-4 col-md-5 col-lg-10"></div>
      <DButton
        label="Manage Children"
        class="q-my-md justify-end col-xs-8 col-md-7 col-lg-2 q-pl-lg"
        @click="ManageChildrenModel = true"
      />
    </div>
    <EnrollNow :model="EnrollNowModel" @model="closeEnrollNow" :selectedClass="selectedClass" />
    <Register :model="RegisterModel" @model="closeRegister" />
    <ManageChildren :model="ManageChildrenModel" @model="closeManageChildren" />
  </div>
</template>

<script>
import DButton from "../components/base-components/DButton.vue";
import EnrollNow from "../components/sub-components/EnrollNow.vue";
import Register from "../components/sub-components/Register.vue";
import ManageChildren from "../components/sub-components/ManageChildren.vue";
import { Component, Props } from "vue-property-decorator";
import axios from "axios";
export default {
  components: {
    DButton,
    EnrollNow,
    Register,
    ManageChildren,
  },
  name: "HomePage",
  data() {
    return {
      classData: [
        {
          id: 0,
          className: "Add a class",
          teacherName: this.$store.state.user.fullName,
        },
      ],
      EnrollNowModel: false,
      RegisterModel: false,
      selectedClass: {},
      ManageChildrenModel: false,
      teacherData: [],
    };
  },
  methods: {
    openpopup(classes) {
      this.selectedClass = classes;
      this.EnrollNowModel = true;
    },
    addClass() {
      this.$router.push({
        name: "AddNewClass",
      });
    },
    closeEnrollNow() {
      this.EnrollNowModel = false;
    },
    closeRegister() {
      this.RegisterModel = false;
    },
    closeManageChildren() {
      this.ManageChildrenModel = false;
    },
    closeAddNewClass() {
      this.addNewClassModel = false;
    },
    getData() {
      if (this.isTeacher) {
        axios
          .get(
            this.$store.state.apiBaseURL +
              "/dailies/class/getclass/" +
              this.$store.state.user.id
          )
          .then((response) => {
            console.log("Success " + JSON.stringify(response));
            this.classData.push(...response.data);
          })
          .catch((err) => {
            console.log("error", err);
          });
      } else {
        axios
          .get(
            this.$store.state.apiBaseURL + "/dailies/class/getavailableclasses"
          )
          .then((response) => {
            console.log("Success " + JSON.stringify(response));
            this.classData = response.data;
          })
          .catch((err) => {
            console.log("error", err);
          });
      }
      axios
        .get(this.$store.state.apiBaseURL + "/dailies/teacher/getall")
        .then((response) => {
          response.data.forEach((teacher) => {
            this.teacherData.push({
              id: teacher.id,
              fullName: teacher.fullName,
            });
          });
        })
        .catch((err) => {
          console.log("error", err);
        });
    },
    routeToViewDetails(classes, teacher) {
      this.$router.push({
        name: "ViewDetails",
        params: {
          id: classes.id,
          className: classes.className,
          teacherName: teacher.fullName,
          daysOfWeek: classes.daysOfWeek,
          startTime: classes.startTime,
          endTime: classes.endTime,
          description: classes.description,
          countOfStudent: classes.countOfStudent,
        },
      });
    },
  },
  created() {
    this.getData();
  },
  watch: {
    isLoggedIn: function (value) {
      this.getData();
    },
  },
  computed: {
    isTeacher: {
      get() {
        return this.$store.state.isTeacher;
      },
      set(value) {
        this.$store.commit("changeIsTeacher", value);
      },
    },
    isLoggedIn: {
      get() {
        return this.$store.state.isLoggedIn;
      },
      set(value) {
        this.$store.commit("changeIsLoggedIn", value);
      },
    },
  },
};
</script>

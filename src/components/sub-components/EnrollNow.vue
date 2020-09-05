<template>
  <q-dialog v-model="model" persistent>
    <q-card class="rounded-borders my-card full-height" style="width: 434px;">
      <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg" style="height: 29vh;" />
      <q-card-section class="text-h4">{{selectedClass.className}}</q-card-section>
      <q-card-section class="q-py-none fs--18">
        <span class="text-grey">Taken By</span>
        <span class="q-ml-sm">{{selectedClass.teacherName}}</span>
      </q-card-section>
      <q-card-section class="q-py-none fs--18">
        <p class="q-mb-none">
          <span class>{{selectedClass.days}}</span>
          <span class="q-ml-sm text-grey">from</span>
          <span class="q-ml-sm">{{selectedClass.startTime}}</span>
          <span class="q-ml-sm text-grey">to</span>
          <span class="q-ml-sm">{{selectedClass.endTime}}</span>
        </p>

        <p class="q-mb-none">
          <span class="text-grey">Seats Available :</span>
          <span class="q-ml-sm">{{selectedClass.countOfStudent}}</span>
        </p>
      </q-card-section>

      <q-card-section>
        <div class="bg-light-blue-12 text-white fs--18 q-px-md q-py-sm">Select a Child</div>
        <ChildSelector @click="getSelectedChild" :studentList="studentList" />
      </q-card-section>
      <q-separator />

      <q-card-actions align="right">
        <q-btn v-close-popup flat color="light-blue-12" label="Cancel" @click="closePopup" />
        <DButton v-close-popup flat label="Add Student" @click="addStudent" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
import ChildSelector from "./ChildSelector.vue";
import DButton from "../base-components/DButton.vue";
import { Component, Props } from "vue-property-decorator";
import axios from "axios";
export default {
  components: {
    ChildSelector,
    DButton,
  },
  props: {
    model: {
      default: false,
    },

    selectedClass: {
      title: "",
      teacherName: "",
      days: "",
      startTime: "",
      endTime: "",
      desc: "",
      numberOfSeats: null,
    },
  },
  data() {
    return {
      studentList: [],
      student: {},
    };
  },
  methods: {
    getSelectedChild(student) {
      this.student = student;
    },
    closePopup() {
      this.$emit("model");
    },
    addStudent() {
      const response = axios({
        method: "POST",
        url: this.$store.state.apiBaseURL + "/dailies/student/enroll",
        data: {
          classId: this.selectedClass.id,
          id: this.student.id,
          parentId: this.$store.state.user.id,
          email: this.student.email,
          fullName: this.student.fullName,
        },
        headers: {
          "content-type": "application/json",
        },
      })
        .then((response) => {
          if (response.status == 200) {
            this.$emit("enrolled");
          } else {
          }
        })
        .catch((err) => {
          console.log("error: ", err.message);
        });
      this.closePopup();
    },
    getData() {
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
  },
  created() {
    this.getData();
  },
  watch: {
    model: function (value) {
      this.getData();
    },
  },
};
</script>

<template>
  <div class="row view-details-row q-my-md q-mx-xl">
    <div class="col-lg-6 col-md-5 col-xs-12 q-pr-md">
      <q-img src="../assets/pexels-photo-289740.jpeg" />
    </div>

    <div class="col-lg-6 col-md-7 col-xs-12 q-pl-md q-pr-lg">
      <q-card-section class="text-h4">{{className}}</q-card-section>
      <q-card-section class="q-py-none q-pb-sm text-body2 text-grey">{{description}}</q-card-section>
      <q-card-section class="q-py-none fs--18">
        <p class="d-inline-block q-mb-none">
          <span class="text-grey">Taken By</span>
          <span class="q-ml-sm">{{teacherName}}</span>
        </p>

        <p class="d-inline-block float-right q-ml-lg q-mb-none">
          <span class="text-grey">Seats Available :</span>
          <span class="q-ml-sm">{{countOfStudent}}</span>
        </p>

        <p class="d-inline-block float-right q-mb-none">
          <span class>{{daysOfWeek}}</span>
          <span class="q-ml-sm text-grey">from</span>
          <span class="q-ml-sm">{{startTime}}</span>
          <span class="q-ml-sm text-grey">to</span>
          <span class="q-ml-sm">{{endTime}}</span>
        </p>
      </q-card-section>

      <q-card-section>
        <div class="bg-light-blue-12 text-white fs--18 q-px-md q-py-sm q-mt-md">Select a Child</div>
        <ChildSelector :studentList="studentList" @click="getSelectedChild" />
      </q-card-section>
      <q-card-actions align="right" class="q-pr-md">
        <DButton label="Add Student" @click="addStudent" v-if="!this.$store.state.isTeacher" />
        <DButton label="Remove Student" @click="removeStudent" v-else />
      </q-card-actions>
    </div>
  </div>
</template>

<script>
import DButton from "../components/base-components/DButton.vue";
import ChildSelector from "../components/sub-components/ChildSelector.vue";
import { Component, Props } from "vue-property-decorator";
import axios from "axios";
export default {
  props: {
    className: {
      default: "",
    },
    id: {
      default: 0,
    },
    teacherName: {
      default: "",
    },
    daysOfWeek: {
      default: "",
    },
    startTime: {
      default: "",
    },
    endTime: {
      default: "",
    },
    description: {
      default: "",
    },
    countOfStudent: {
      default: null,
    },
  },
  components: {
    DButton,
    ChildSelector,
  },
  name: "ViewDetails",
  data() {
    return {
      student: {},
      studentList: [],
    };
  },
  methods: {
    getSelectedChild(student) {
      this.student = student;
    },
    addStudent() {
      const response = axios({
        method: "POST",
        url: this.$store.state.apiBaseURL + "/dailies/student/enroll",
        data: {
          classId: this.id,
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
            this.countOfStudent -= 1;
            if (this.countOfStudent == 0) {
              this.$router.push("/");
            }
          } else {
          }
        })
        .catch((err) => {
          console.log("error: ", err.message);
        });
      this.closePopup();
    },
    removeStudent() {
      axios
        .delete(
          this.$store.state.apiBaseURL +
            "/dailies/student/deletestudent/" +
            this.id +
            "/" +
            this.student.id
        )
        .then((response) => {
          this.studentList = this.studentList.filter(
            (student) => student.id != this.student.id
          );
        })
        .catch((err) => {
          console.log("error", err);
        });
    },
  },
  created() {
    if (this.$store.state.isTeacher) {
      axios
        .get(
          this.$store.state.apiBaseURL +
            "/dailies/student/getStudents/" +
            this.id
        )
        .then((response) => {
          this.studentList = response.data;
        })
        .catch((err) => {
          console.log("error", err);
        });
    } else {
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
    }
  },
};
</script>

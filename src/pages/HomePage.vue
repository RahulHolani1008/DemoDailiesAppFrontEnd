<template>
  <div>
    <div class="row q-px-xl q-pt-lg q-pb-none">
      <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12 q-pa-md" 
      v-for="classes in classData" :key="classes.id"
      v-show="(classes.id == 0 && isTeacher) || (classes.id != 0)"
      >
        <div :class="{'bg-images' : classes.id != 0}">
          <q-card class="rounded-borders  q-card-custom q-pa-lg relative-position bg-black">
            <q-card-section class="text-h4 text-white">{{classes.title}}</q-card-section>
            <q-card-section class="fs--22 absolute left-25 bottom-100 text-white">
              <span class="text-grey">By</span>
              <span class="q-ml-sm">{{classes.teacherName}}</span>
            </q-card-section>
            <q-card-actions class="absolute bottom-right-30">
              <DButton
                label="View Details"
                class="q-ml-auto"
                color="light-blue-12"
                @click="routeToViewDetails(classes)"
              />
              <DButton label="Enroll Now" class="q-ml-sm q-mr-none" @click="openpopup(classes)" v-if="!isTeacher"/>
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>
    <div class="row q-pb-sm" v-if="!isTeacher">
      <div class="col-xs-3 col-sm-4 col-md-5 col-lg-10"></div>
      <DButton label="Manage Children" class="q-my-md justify-end col-xs-8 col-md-7 col-lg-2 q-pl-lg" @click="ManageChildrenModel = true" />
    </div>
    <EnrollNow :model="EnrollNowModel" @model="closeEnrollNow()" :selectedClass="selectedClass" />
    <Register :model="RegisterModel" @model="closeRegister()" />
    <ManageChildren :model="ManageChildrenModel" @model="closeManageChildren()" />
  </div>
</template>

<script>
import DButton from "../components/base-components/DButton.vue";
import EnrollNow from "../components/sub-components/EnrollNow.vue";
import Register from "../components/sub-components/Register.vue";
import ManageChildren from "../components/sub-components/ManageChildren.vue";
import { Component, Props } from "vue-property-decorator";
export default {
  components: {
    DButton,
    EnrollNow,
    Register,
    ManageChildren
  },
  name: "HomePage",
  data() {
    return {
      classData: [
        {
          id: 0,
          title: "Add a class",
          teacherName: this.$store.state.user.fullName
        },
        {
          id: 1,
          title: "Class IX A",
          teacherName: "Maximillan",
          days: "Mon - Wed",
          startTime: "7 PM",
          endTime: "8 PM",
          desc:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          numberOfSeats: 2,
        },
        {
          id: 2,
          title: "Class IX b",
          teacherName: "Avnish Parmar",
          days: "Mon - Wed",
          startTime: "7 PM",
          endTime: "8 PM",
          desc:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          numberOfSeats: 3,
        },
        {
          id: 3,
          title: "Class IX c",
          teacherName: "John Doe",
          days: "Mon - Wed",
          startTime: "7 PM",
          endTime: "8 PM",
          desc:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          numberOfSeats: 1,
        },
        {
          id: 4,
          title: "Class IX d",
          teacherName: "Rahul Holani",
          days: "Mon - Wed",
          startTime: "7 PM",
          endTime: "8 PM",
          desc:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          numberOfSeats: 2,
        },
        {
          id: 5,
          title: "Class IX e",
          teacherName: "Lorem Ipsum",
          days: "Mon - Wed",
          startTime: "7 PM",
          endTime: "8 PM",
          desc:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          numberOfSeats: 4,
        },
        {
          id: 6,
          title: "Class IX f",
          teacherName: "Maximillan",
          days: "Mon - Wed",
          startTime: "7 PM",
          endTime: "8 PM",
          desc:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          numberOfSeats: 1,
        },
      ],
      EnrollNowModel: false,
      RegisterModel: false,
      selectedClass: {},
      ManageChildrenModel: false
    };
  },
  methods: {
    openpopup(classes) {
      this.selectedClass = classes;
      this.EnrollNowModel = true;
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
    routeToViewDetails(classes) {
      this.$router.push({
        name: "ViewDetails",
        params: {
          id: classes.id,
          title: classes.title,
          teacherName: classes.teacherName,
          days: classes.days,
          startTime: classes.startTime,
          endTime: classes.endTime,
          desc: classes.desc,
          numberOfSeats: classes.numberOfSeats,
        },
      });
    },
  },
  computed: {
    isTeacher: {
      get() {
        this.$store.state.isTeacher;
      },
      set(value) {
        this.$store.commit("changeIsTeacher",value)
      }
    }
  }};
</script>

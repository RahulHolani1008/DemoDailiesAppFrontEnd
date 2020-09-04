<template>
  <div>
    <div class="row q-pa-xl">
      <div class="col-lg-4 col-md-6 col-sm-12 q-pa-md" v-for="classes in classData" :key="classes">
        <div class="bg-images">
          <q-card class="q-card-custom q-pa-lg relative-position bg-black">
            <q-card-section class="text-h4 text-white">{{classes.title}}</q-card-section>
            <q-card-section class="fs--22 absolute left-25 bottom-100 text-white">
              <span class="text-grey">By</span>
              <span class="q-ml-sm">{{classes.teacherName}}</span>
            </q-card-section>
            <q-card-actions class="absolute bottom-right-30">
              <DButton label="View Details" class="q-ml-auto" color="blue" />
              <DButton label="Enroll Now" class="q-ml-md" @click="openpopup(classes)" />
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>
    <EnrollNow :model="EnrollNowModel" @model="closeEnrollNow()" :selectedClass="selectedClass" />
  </div>
</template>

<script>
import DButton from "../components/base-components/DButton.vue";
import EnrollNow from "../components/sub-components/EnrollNow.vue";
export default {
  components: {
    DButton,
    EnrollNow,
  },
  name: "HomePage",
  data() {
    return {
      classData: [
        {
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
      selectedClass: {},
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
  },
};
</script>

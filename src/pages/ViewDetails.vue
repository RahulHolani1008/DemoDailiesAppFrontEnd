<template>
  <div class="row view-details-row q-my-md q-mx-xl">
    <div class="col-lg-6 col-md-5 col-xs-12 q-pr-md">
      <q-img src="../assets/pexels-photo-289740.jpeg" />
    </div>

    <div class="col-lg-6 col-md-7 col-xs-12 q-pl-md q-pr-lg">
      <q-card-section class="text-h4">{{title}}</q-card-section>
      <q-card-section class="q-py-none q-pb-sm text-body2 text-grey">{{desc}}</q-card-section>
      <q-card-section class="q-py-none fs--18">
        <p class="d-inline-block q-mb-none">
          <span class="text-grey">Taken By</span>
          <span class="q-ml-sm">{{teacherName}}</span>
        </p>

        <p class="d-inline-block float-right q-ml-lg q-mb-none">
          <span class="text-grey">Seats Available :</span>
          <span class="q-ml-sm">{{numberOfSeats}}</span>
        </p>

        <p class="d-inline-block float-right q-mb-none">
          <span class>{{days}}</span>
          <span class="q-ml-sm text-grey">from</span>
          <span class="q-ml-sm">{{startTime}}</span>
          <span class="q-ml-sm text-grey">to</span>
          <span class="q-ml-sm">{{endTime}}</span>
        </p>
      </q-card-section>

      <q-card-section>
        <div class="bg-dailies-blue text-white fs--18 q-px-md q-py-sm">Select a Child</div>
        <q-list bordered>
          <q-item clickable v-ripple v-for="student in studentList" :key="student">
            <q-item-section avatar>
              <q-avatar rounded>
                <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
              </q-avatar>
            </q-item-section>
            <q-item-section>{{ student }}</q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
      <q-card-actions align="right" class="q-pr-md">
        <DButton label="Add Student" class="bg-dailies-blue" />
      </q-card-actions>
    </div>
  </div>
</template>

<script>
import DButton from "../components/base-components/DButton.vue";
export default {
  props: {
    title: {
      default: "",
    },
    teacherName: {
      default: "",
    },
    days: {
      default: "",
    },
    startTime: {
      default: "",
    },
    endTime: {
      default: "",
    },
    desc: {
      default: "",
    },
    numberOfSeats: {
      default: null,
    },
  },
  components: {
    DButton,
  },
  name: "ViewDetails",
  data() {
    return {
      studentList: [
        "Tarun Khanthuriya",
        "Kanchan Tiwari",
        "Rishabh Songirkar",
        "Vinus Agrawal",
      ],
    };
  },
  methods: {},
};
</script>

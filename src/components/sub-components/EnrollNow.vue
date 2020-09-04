<template>
  <q-dialog v-model="model" persistent>
    <q-card class="my-card" style="width: 434px; overflow: hidden;">
      <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg" />
      <q-card-section class="text-h4">{{selectedClass.title}}</q-card-section>
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
          <span class="q-ml-sm">{{selectedClass.numberOfSeats}}</span>
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
      <q-separator />

      <q-card-actions align="right">
        <q-btn v-close-popup flat color="primary" label="Cancel" @click="closePopup()" />
        <q-btn v-close-popup flat color="primary" label="Add Student" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
export default {
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
      studentList: [
        "Tarun Khanthuriya",
        "Kanchan Tiwari",
        "Rishabh Songirkar",
        "Vinus Agrawal",
      ],
    };
  },
  methods: {
    closePopup() {
      this.$emit("model");
    },
  },
};
</script>

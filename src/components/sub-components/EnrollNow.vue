<template>
  <q-dialog v-model="model" persistent>
    <q-card class="rounded-borders  my-card full-height" style="width: 434px;">
      <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg" style="height: 29vh;" />
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
        <div class="bg-light-blue-12 text-white fs--18 q-px-md q-py-sm">Select a Child</div>
        <ChildSelector />
      </q-card-section>
      <q-separator />

      <q-card-actions align="right">
        <q-btn v-close-popup flat color="primary" label="Cancel" @click="closePopup" />
        <DButton v-close-popup flat color="primary" label="Add Student" @click="addStudent"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
import ChildSelector from "./ChildSelector.vue";
import DButton from "../base-components/DButton.vue";
import { Component, Props } from "vue-property-decorator";
export default {
  components: {
    ChildSelector,
    DButton
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
      
    };
  },
  methods: {
    closePopup() {
      this.$emit("model");
    },
    addStudent() {
      this.closePopup();
    }
  },
};
</script>

<template>
  <div class="row view-details-row q-my-md q-mx-xl">
    <div class="col-lg-6 col-md-5 col-xs-12 q-pr-md">
      <q-img src="../assets/pexels-photo-289740.jpeg" />
    </div>
    <q-form class="col-lg-6 col-md-7 col-xs-12 q-pl-md q-pr-lg" @submit="onSubmit">
      <div>
        <q-card-section class="text-h4">
          <DTextField :model="title" @model="getTitle" label="Class Title" :rules="titleRules" />
        </q-card-section>
        <q-card-section class="q-py-none q-pb-sm text-body2 text-grey">
          <DTextArea :model="desc" @model="getDesc" />
        </q-card-section>
        <q-card-section class="fs--18">
          <div class="col-12">
            <div class="row col-12">
              <DSelect
                label="Start Day"
                :outlined="true"
                :stringOptions="weekDays"
                :model="startDay"
                :isMultiple="false"
                @model="getStartDay"
                class="col-6 q-pr-sm"
              />
              <DSelect
                label="End Day"
                :outlined="true"
                :stringOptions="weekDays"
                :model="endDay"
                :isMultiple="false"
                @model="getEndDay"
                class="col-6 q-pl-sm"
              />
            </div>
            <div class="row col-12">
              <div class="col-6">
                <q-input
                  label="Start Time"
                  v-model="startTime"
                  color="primary"
                  outlined
                  label-color="primary"
                  bg-color="white"
                  mask="##:## SS"
                  class="q-pt-sm q-pr-sm"
                >
                  <template v-slot:append>
                    <q-icon name="access_time" class="text-primary cursor-pointer">
                      <q-popup-proxy transition-show="scale" transition-hide="scale">
                        <q-time color="light-blue-12" mask="hh:mm A" v-model="startTime" />
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <div class="col-6">
                <q-input
                  label="End Time"
                  outlined
                  color="primary"
                  label-color="primary"
                  v-model="endTime"
                  bg-color="white"
                  mask="##:## SS"
                  class="q-pt-sm col-3 q-pl-sm"
                >
                  <template v-slot:append>
                    <q-icon name="access_time" class="text-primary cursor-pointer">
                      <q-popup-proxy transition-show="scale" transition-hide="scale">
                        <q-time color="light-blue-12" mask="hh:mm A" v-model="endTime" />
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </div>
          </div>
          <p class="d-inline-block q-mt-md">
            <span class="text-grey">Taken By</span>
            <span class="q-ml-sm">{{this.$store.state.user.fullName}}</span>
          </p>

          <p class="d-inline-block q-mt-md float-right q-ml-lg">
            <span class="text-grey">Seats Available :</span>
            <span class="q-ml-sm">4</span>
          </p>
        </q-card-section>
        <q-card-actions align="right" class="q-pr-md">
          <DButton label="Add class" type="submit" />
        </q-card-actions>
      </div>
    </q-form>
  </div>
</template>

<script>
import DTextField from "../components/base-components/DTextField.vue";
import DButton from "../components/base-components/DButton.vue";
import DTextArea from "../components/base-components/DTextArea.vue";
import DSelect from "../components/base-components/DSelect.vue";
import axios from "axios";
import { Component, Props } from "vue-property-decorator";
export default {
  components: {
    DTextField,
    DTextArea,
    DButton,
    DSelect,
  },
  name: "ViewDetails",
  data() {
    return {
      titleRules: [(val) => !!val || "Title is required"],
      title: "",
      startDay: "",
      endDay: "",
      startTime: "",
      endTime: "",
      desc: "",
      weekDays: [
        "Monday",
        "Tuesday",
        "WednesDay",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
    };
  },
  methods: {
    getTitle(title) {
      this.title = title;
    },
    getDesc(desc) {
      this.desc = desc;
    },
    getStartDay(startDay) {
      this.startDay = startDay;
    },
    getEndDay(endDay) {
      this.endDay = endDay;
    },
    onSubmit() {
      const response = axios({
        method: "POST",
        url: this.$store.state.apiBaseURL + "/dailies/class/add",
        data: {
          teacherId: this.$store.state.user.id,
          className: this.title,
          description: this.desc,
          startTime: this.startTime,
          endTime: this.endTime,
          daysOfWeek: this.startDay + " to " + this.endDay,
        },
        headers: {
          "content-type": "application/json",
        },
      })
        .then((response) => {
          alert(JSON.stringify(response));
          if (response.status == 200) {
            alert(JSON.stringify(response));
          } else {
            alert(JSON.stringify(response));
          }
        })
        .catch((err) => {
          console.log("error: ", err.message);
        });
    },
  },
};
</script>

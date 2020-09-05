<template>
  <div>
    <q-btn
      :push="push"
      color="light-blue-12"
      :text-color="textColor"
      :label="label"
      @click="buttonClicked"
      class="rounded-borders q-px-md"
      :type="type"
      :outline="outline"
      no-caps
    />
  </div>
</template>
<script>
import { Component, Props } from "vue-property-decorator";
export default {
  props: {
    color: {
      default: "light-blue-12",
    },
    textColor: {
      default: "white",
    },
    label: {
      default: "Push me",
    },
    outline: {
      default: false,
    },
    push: {
      default: false,
    },
    type: {
      default: "submit",
    },
    noCaps: {
      default: true,
    },
  },
  methods: {
    buttonClicked() {
      this.$emit("click", true);
    },
  },
};
</script>

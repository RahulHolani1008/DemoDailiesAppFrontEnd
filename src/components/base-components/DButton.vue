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
      v-if="!isIconRight && !isIconLeft"
      no-caps
    />
    <!-- <q-btn
      :push="push"
      color="light-blue-12"
      :text-color="textColor"
      :label="label"
      @click="buttonClicked"
      class="rounded-borders q-px-md"
      :type="type"
      icon="search"
      v-if="isIconLeft"
      :outline="outline"
    />
    <q-btn
      :push="push"
      color="light-blue-12"
      :outline="outline"
      :text-color="textColor"
      :label="label"
      @click="buttonClicked"
      v-if="isIconRight"
      class="rounded-borders q-px-md"
      :type="type"
      icon-right="keyboard_arrow_right"
    ></q-btn> -->
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

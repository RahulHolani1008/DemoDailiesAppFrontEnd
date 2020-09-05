<template>
  <q-btn-toggle
    push
    v-model="model"
    toggle-color="light-blue-12"
    :options="stringOptions"
    outline
    style="height: 50px"
  />
</template>
<script>
import { Component, Props } from "vue-property-decorator";
export default {
  props: {
    stringOptions: {
      default: [
        { label: "One", value: "one" },
        { label: "Two", value: "two" },
      ],
    },
  },
  data() {
    return {
      model: "",
    };
  },
  watch: {
    model: function (value) {
      this.$emit("model", value);
    },
  },
};
</script>

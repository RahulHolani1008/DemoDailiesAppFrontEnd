<template>
  <span>
    <q-select
      bg-color="white"
      v-model="innerModel"
      :options="stringOptions"
      :clearable="isClearable"
      transition-show="jump-up"
      transition-hide="jump-up"
      :label="label"
      :rules="rules"
      color="primary"
      label-color="primary"
      :outlined="outlined"
    />
  </span>
</template>
<script>
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";

export default {
  props: {
    hideSelected: {
      default: true,
    },
    stringOptions: {
      default: () => [],
    },

    rules: {
      default: () => [],
    },

    model: {
      default: () => [],
    },

    isClearable: {
      default: false,
    },

    outlined: {
      default: false,
    },

    isMultiple: {
      default: false,
    },

    label: {
      default: "Select",
    },

    isLoading: {
      default: false,
    },
  },
  data() {
    return {
      options: this.stringOptions,
      selectedValues: [],
      innerModel: this.model,
    };
  },
  watch: {
    innerModel: function (value) {
      this.$emit("model", value);
    },
  },
};
</script>
<style scoped>
</style>
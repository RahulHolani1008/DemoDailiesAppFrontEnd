<template>
  <span>
    <q-select
      bg-color="white"
      v-model="innermodel"
      :options="options"
      :clearable="isClearable"
      transition-show="jump-up"
      transition-hide="jump-up"
      :label="label"
      option-label="value"
      option-value="id"
      :rules="rules"
      use-input
      emit-value
      map-options
      input-debounce="0"
      @filter="filterFn"
      behavior="menu"
      :multiple="isMultiple"
      :loading="isLoading"
      color="black"
      label-color="black"
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
    };
  },
  methods: {
    filterFn(val, update) {
      if (val === "") {
        update(() => {
          this.options = this.stringOptions;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        this.options = [];
        this.stringOptions.forEach((option) => {
          if (option.value.toString().toLowerCase().indexOf(needle) > -1) {
            this.options.push(option);
          }
        });
      });
    },
  },
  computed: {
    innermodel: {
      set(values) {
        this.$emit("model", values);
        let tempArray = [];
        //
        if (values.length > 0) {
          this.valuemodel = [];
          this.stringOptions.forEach((option) => {
            values.forEach((value) => {
              if (option.id == value) {
                tempArray.push(option.value);
              }
            });
          });
          this.valuemodel = tempArray;
        } else {
          this.stringOptions.forEach((option) => {
            if (option.id == values) {
              if (values != 0) {
                const val = option.value;
                this.valuemodel = [val];
              } else {
                this.valuemodel = [];
              }
            }
          });
        }
      },
      get() {
        return this.model;
      },
    },
    valuemodel: {
      get() {
        return this.selectedValues;
      },
      set(values) {
        this.selectedValues = values;
      },
    },
  },
};
</script>
<style scoped>
</style>
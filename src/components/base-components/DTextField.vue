<template>
  <div>
    <q-input
      :filled="filled"
      :bg-color="bgcolor"
      :prefix="prefix"
      v-model="innerModel"
      :label="label"
      color="black"
      :type="type"
      mask="##/##"
      label-color="black"
      v-if="!isPassword && inputType=='month'"
      :rules="rules"
      lazy-rules
      :outlined="outlined"
    />
    <q-input
      :filled="filled"
      :bg-color="bgcolor"
      :prefix="prefix"
      v-model="innerModel"
      :label="label"
      color="black"
      :type="type"
      mask="(###) ### - ####"
      label-color="black"
      v-if="!isPassword && inputType =='tel'"
      :rules="rules"
      lazy-rules
      :outlined="outlined"
    />
    <q-input
      :filled="filled"
      :bg-color="bgcolor"
      :prefix="prefix"
      v-model="innerModel"
      :label="label"
      color="black"
      :type="type"
      mask="#####"
      label-color="black"
      v-if="!isPassword && inputType=='zip'"
      :rules="rules"
      lazy-rules
      :outlined="outlined"
    />
    <q-input
      :filled="filled"
      :bg-color="bgcolor"
      :prefix="prefix"
      v-model="innerModel"
      :label="label"
      color="black"
      :placeholder="placeholder"
      :type="type"
      label-color="black"
      v-if="!isPassword && inputType=='text' && isLabel==true"
      :rules="rules"
      lazy-rules
      :outlined="outlined"
    />

    <q-input
      :filled="filled"
      :bg-color="bgcolor"
      :prefix="prefix"
      v-model="innerModel"
      color="black"
      :placeholder="placeholder"
      :type="type"
      v-if="!isPassword && inputType=='text' && isLabel==false"
      :rules="rules"
      lazy-rules
      :outlined="outlined"
    />
    <q-input
      :filled="filled"
      :bg-color="bgcolor"
      :prefix="prefix"
      color="black"
      label-color="black"
      v-model="passwordModel"
      :label="label"
      :type="isPwd ? 'password' : 'text'"
      v-if="isPassword"
      :rules="rules"
      counter
      lazy-rules
      :outlined="outlined"
    >
      <template v-slot:append>
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="toggleVisibility"
        />
      </template>
    </q-input>
  </div>
</template>
<style lang="scss" scoped>
.q-field__input {
  border-color: blue !important;
}
</style>
<script>
import { Component, Props } from "vue-property-decorator";
export default {
  data() {
    return {
      passwordModel: this.model,
      isPwd: true,
      innerModel: this.model,
    };
  },
  methods: {
    onRejected() {
      alert("rejected");
    },
    toggleVisibility() {
      this.isPwd = !this.isPwd;
    },
  },
  props: {
    filled: {
      default: false,
    },
    isPassword: {
      default: false,
    },
    isLabel: {
      default: true,
    },
    inputType: {
      default: "text",
    },
    placeholder: {
      default: "",
    },
    type: {
      default: "text",
    },
    label: {
      default: "Password",
    },
    model: {
      default: "",
    },
    rules: {
      default: () => [],
    },
    outlined: {
      default: false,
    },
    filled: {
      default: false,
    },
    accept: {
      default: ".pdf, .doc, .docx",
    },
    iconName: {
      default: "",
    },
    prefix: {
      default: "",
    },
    bgcolor: {
      default: "",
    },
  },
  mounted() {},
  watch: {
    innerModel: function (value) {
      this.$emit("model", value);
    },
    model: function (value) {
      this.innerModel = this.model;
    },
    passwordModel: function (value) {
      this.$emit("model", value);
    },
  },
};
</script>

<template>
  <div>
    <q-btn
      :push="push"
      :color="color"
      :text-color="textColor"
      :label="label"
      v-on:click="buttonClicked"
      class="rounded-borders q-px-md"
      :type="type"
      :outline="outline"
      v-if="!isIconRight && !isIconLeft"
      no-caps
    />

    <q-btn
      :push="push"
      :color="color"
      :text-color="textColor"
      :label="label"
      v-on:click="buttonClicked"
      class="rounded-borders q-px-md"
      :type="type"
      icon="search"
      v-if="isIconLeft"
      :outline="outline"
    />

    <q-btn
      :push="push"
      :color="color"
      :outline="outline"
      :text-color="textColor"
      :label="label"
      v-on:click="buttonClicked"
      v-if="isIconRight"
      class="rounded-borders q-px-md"
      :type="type"
      icon-right="keyboard_arrow_right"
    ></q-btn>
  </div>
</template>
<script>
export default {
  props: {
    color: {
      default: "bg-dailies-blue",
    },
    textColor: {
      default: "white",
    },
    label: {
      default: "Push me",
    },
    outline: {
      default: true,
    },
    push: {
      default: true,
    },
    type: {
      default: "submit",
    },
    iconRightName: {
      default: "",
    },
    isIconRight: {
      default: false,
    },
    isIconLeft: {
      default: false,
    },
    noCaps: {
      default: false,
    },
  },
  methods: {
    buttonClicked() {
      this.$emit("click", true);
    },
  },
};
</script>

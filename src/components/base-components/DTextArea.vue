<template>
  <q-editor
    v-model="innerModel"
    min-height="8rem"
    max-height="8.5rem"
    content-class="bg-white text-black"
    toolbar-text-color="black"
    toolbar-toggle-color="white"
    toolbar-bg="light-blue-12"
    :toolbar="[
        ['bold', 'italic', 'strike', 'underline'],
        ['token', 'hr', 'link', 'custom_btn'],
        [
          {
            label: $q.lang.editor.formatting,
            icon: $q.iconSet.editor.formatting,
            list: 'no-icons',
            options: [
              'p',
              'h4',
              'h5',
              'h6'
            ]
          },
          {
            label: $q.lang.editor.fontSize,
            icon: $q.iconSet.editor.fontSize,
            fixedLabel: true,
            fixedIcon: true,
            list: 'no-icons',
            options: [
              'size-5',
              'size-6',
              'size-7'
            ]
          },
          'removeFormat'
        ],
        ['unordered', 'ordered', 'outdent', 'indent'],
        ['undo', 'redo'],
        ]"
  />
</template>
<script>
export default {
  name: "TextArea",
  props: {
    model: {
      default: "Description",
    },
  },
  data() {
    return {
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
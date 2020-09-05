<template>
    <q-list bordered>
          <q-item clickable
            v-ripple 
            v-for="student in studentList" 
            :active="link === student"
            @click="emitSelectedStudent(student)"
            active-class="my-menu-link" 
            :key="student"
        >
            <q-item-section avatar>
              <q-avatar rounded>
                <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
              </q-avatar>
            </q-item-section>
            <q-item-section>{{ student }}</q-item-section>
          </q-item>
        </q-list>
</template>
<script>
import { Component, Props } from "vue-property-decorator";
export default {
    name: "ChildSelector",
    data() {
        return {
            studentList: [
        "Tarun Khanthuriya",
        "Kanchan Tiwari",
        "Rishabh Songirkar",
        "Vinus Agrawal",
      ],
      link: null
        }
    },
    methods: {
        emitSelectedStudent(student) {
            this.link = student;
            this.$emit("click",this.link)
        }
    }
}
</script>
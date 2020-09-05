<template>
    <q-list bordered dense>
      <q-item clickable
            v-ripple 
            :active="link === 'Add New'"
            @click="emitSelectedStudent('Add New')"
            active-class="bg-light-blue-12 text-white" 
            v-if="addNew"
        >
            <q-item-section avatar>
              <q-avatar icon="person_add" :class="{'text-light-blue-12' : link != 'Add New', 'text-white' : link == 'Add New'}" />
            </q-item-section>
            <q-item-section>Add New</q-item-section>
          </q-item>
          <q-item clickable
            v-ripple 
            v-for="student in studentList" 
            :active="link === student"
            @click="emitSelectedStudent(student)"
            active-class="bg-light-blue-12 text-white" 
            :key="student"
        >
            <q-item-section avatar>
              <q-avatar rounded>
                <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
              </q-avatar>
            </q-item-section>
            <q-item-section>{{ student.name }}</q-item-section>
          </q-item>
        </q-list>
</template>
<script>
import { Component, Props } from "vue-property-decorator";
export default {
    name: "ChildSelector",
    props: {
      addNew: {
        default: false
      }
    },
    data() {
        return {
        studentList: [
          {name: "Tarun Khanthuriya", email: "tkh@gmail.com"},
          {name: "Kanchan Tiwari", email: "kanchant@gmail.com"},
          {name: "Rishabh Songirkar", email: "rish.song@hotmail.com"},
          {name:"Vinus Agrawal", email: "vinus@gmail.com"}
        ],
        link: this.addNew ? "Add New" : null
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
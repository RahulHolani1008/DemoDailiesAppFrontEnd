<template>
  <q-footer
    elevated
    class="row wrap bg-light-blue-12 justify-around text-black items-start content-start"
  >
    <router-link class="text-decoration-none" to="/">
      <div class="text-h4 text-black q-pt-lg">Dailies</div>
    </router-link>
    <div class="q-px-sm">
      <ul style="list-style-type: none">
        <li class="text-h6 logo">Dailies</li>
        <li>About</li>
        <li>Recruiters</li>
        <li>We're hiring</li>
      </ul>
    </div>
    <div class="q-px-sm">
      <ul style="list-style-type: none">
        <li class="text-h6">Classes by days</li>
        <li>Monday</li>
        <li>Friday</li>
        <li>Sunday</li>
      </ul>
    </div>
    <div class="q-px-sm">
      <ul style="list-style-type: none">
        <li class="text-h6">Classes by time</li>
        <li>7:00 PM</li>
        <li>7:00 AM</li>
        <li>3:00 PM</li>
      </ul>
    </div>
    <div class="q-px-sm">
      <ul style="list-style-type: none">
        <li class="text-h6">Our Blog</li>
        <li>How to help your child succeed</li>
        <li>Don't be too hard on your child</li>
        <li>How a parent can be helpful</li>
      </ul>
    </div>
  </q-footer>
</template>
<style lang="scss" scoped>
li:not(.text-h6) {
  font-size: 0.75rem;
}
</style>
<script>
export default {
  name: "Footer",
};
</script>

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
        <li class="text-h6">Jobs by location</li>
        <li>Jobs in New York City</li>
        <li>Jobs in San Francisco</li>
        <li>Jobs in Austin</li>
      </ul>
    </div>
    <div class="q-px-sm">
      <ul style="list-style-type: none">
        <li class="text-h6">Jobs by role</li>
        <li>Delivery driver</li>
        <li>Security</li>
        <li>Administrative Assistant</li>
      </ul>
    </div>
    <div class="q-px-sm">
      <ul style="list-style-type: none">
        <li class="text-h6">Jobs by role and location</li>
        <li>Delivery driver jobs in San Francisco</li>
        <li>Security Jobs in New York City</li>
        <li>Administrative Assistant Jobs in Los Angeles</li>
      </ul>
    </div>
    <div class="q-px-sm">
      <ul style="list-style-type: none">
        <li class="text-h6">Jobs by type</li>
        <li>Full-time</li>
        <li>Part-time</li>
        <li>Contract</li>
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

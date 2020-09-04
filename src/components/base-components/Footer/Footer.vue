<template>
  <q-footer elevated class="row wrap justify-around items-start content-start">
    <router-link class="text-decoration-none" to="/">
      <div class="text-h4 text-white q-pt-lg">Dailies</div>
    </router-link>
    <div class="q-px-sm">
      <ul style="list-style-type: none">
        <li class="text-h6 logo">BlueHire</li>
        <li>About</li>
        <li>Recruiters</li>
        <li>We're hiring</li>
        <li>Help Center</li>
        <li>Press</li>
        <li>Unsubscribe</li>
      </ul>
    </div>
    <div class="q-px-sm">
      <ul style="list-style-type: none">
        <li class="text-h6">Jobs by location</li>
        <li>Jobs in New York City</li>
        <li>Jobs in San Francisco</li>
        <li>Jobs in Austin</li>
        <li>Jobs in Boston</li>
        <li>Jobs in Denver</li>
        <li>Jobs in Washington DC</li>
        <li>Jobs in Seattle</li>
        <li>Jobs in Chicago</li>
        <li>Jobs in Los Angeles</li>
      </ul>
    </div>
    <div class="q-px-sm">
      <ul style="list-style-type: none">
        <li class="text-h6">Jobs by role</li>
        <li>Delivery driver</li>
        <li>Security</li>
        <li>Administrative Assistant</li>
        <li>Cashier</li>
        <li>Sales</li>
        <li>Warehouse Worker</li>
        <li>Nurse</li>
        <li>Server</li>
        <li>Retail Associate</li>
      </ul>
    </div>
    <div class="q-px-sm">
      <ul style="list-style-type: none">
        <li class="text-h6">Jobs by role and location</li>
        <li>Delivery driver jobs in San Francisco</li>
        <li>Security Jobs in New York City</li>
        <li>Administrative Assistant Jobs in Los Angeles</li>
        <li>Cashier Jobs in San Francisco</li>
        <li>Sales Jobs in New York City</li>
        <li>Warehouse Worker Jobs in Los Angeles</li>
        <li>Warehouse Worker Jobs in San Francisco</li>
        <li>Warehouse Worker Jobs in New York City</li>
        <li>Sales Jobs in Los Angeles</li>
      </ul>
    </div>
    <div class="q-px-sm">
      <ul style="list-style-type: none">
        <li class="text-h6">Jobs by type</li>
        <li>Full-time</li>
        <li>Part-time</li>
        <li>Contract</li>
        <li>Seasonal</li>
        <li>Temporary</li>
        <li>Remote</li>
      </ul>
    </div>
    <div class="q-px-sm">
      <ul style="list-style-type: none">
        <li class="text-h6">Our Blog</li>
        <li>Name of article</li>
        <li>Name of article</li>
        <li>Name of article</li>
        <li>Name of article</li>
        <li>Name of article</li>
        <li>Name of article</li>
        <li>Name of article</li>
        <li>Name of article</li>
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
    name:"Footer"
};
</script>

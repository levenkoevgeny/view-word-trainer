<template>
  <div class="container-fluid" v-if="userData">
    <Navbar />
  </div>


  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from "@/components/common/Navbar"
import { mapGetters } from "vuex"
export default {
  components: { Navbar },
  computed: {
    ...mapGetters({
      userData: "auth/getUser",
      userToken: "auth/getToken"
    }),
  },
  created() {},
}
</script>

<style></style>

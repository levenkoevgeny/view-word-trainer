<template>
  <div class="container">
    {{ $store.state.auth.user.lastname }}
    <router-view></router-view>
  </div>
</template>

<script>
import LoginView from "@/components/auth/LoginView"
export default {
  components: { LoginView },

  computed: {},
  created() {
    console.log("App created")
  },
}
</script>

<style></style>

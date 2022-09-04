<template>

  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand fw-bold" href="/">WordTrainer</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/">На главную</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/dictionaries">Мои словари</a>
          </li>
          <li class="nav-item dropdown" v-if="isLogged">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Аккаунт
            </a>
            <ul class="dropdown-menu dropdown-menu-start" aria-labelledby="navbarDropdownMenuLink">
              <li><button class="dropdown-item" @click="">Персональные данные</button></li>
              <li><button class="dropdown-item" @click="logOut">Выход из системы</button></li>
            </ul>
          </li>
        </ul>

      </div>
    </div>
  </nav>
</template>

<script>

import { mapState, mapActions } from "vuex"

export default {
  name: "Navbar",
  computed: mapState({
    isLogged: (state) => state.auth.isLoggedIn,
    user: (state) => state.auth.user,
  }),
  methods: {
    ...mapActions(["auth/actionRemoveLogIn"]),
    logOut() {
      this["auth/actionRemoveLogIn"]()
      this.$router.push({ name: "login" })
    }
  }
}
</script>

<style scoped>

</style>
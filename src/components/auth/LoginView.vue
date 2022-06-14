<template>
  <div
    style="height: 100vh"
    class="d-flex justify-content-center align-items-center"
  >
    <div v-if="isLoading"><Spinner /></div>
    <div v-else>
      <form>
        <div class="mb-3">
          <label class="form-label">Login</label>
          <input
            type="email"
            class="form-control"
            v-model="auth_data.username"
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Password</label>
          <input
            type="password"
            class="form-control"
            v-model="auth_data.password"
          />
        </div>
        <button
          type="button"
          class="btn btn-primary"
          style="width: 100%"
          @click="loginHandler"
        >
          Log in
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import Spinner from "@/components/common/Spinner"
export default {
  components: { Spinner },
  name: "LoginView",
  data() {
    return {
      auth_data: {
        username: "",
        password: "",
      },
      isLoading: false,
      isError: true,
    }
  },
  methods: {
    loginHandler() {
      this.isLoading = true
      fetch(
        `${process.env.VUE_APP_BACKEND_PROTOCOL}://${process.env.VUE_APP_BACKEND_HOST}:${process.env.VUE_APP_BACKEND_PORT}/api-token-auth/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify({
            ...this.auth_data,
          }),
        }
      )
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            return response.json()
          } else {
            throw new Error("Ошибка авторизации")
          }
        })
        .then((data) => {
          this.auth_data = { username: "", password: "" }
          this.isLoading = false
          console.log(data)
        })
        .catch((e) => alert(e.message))
    },
  },
}
</script>

<style scoped></style>

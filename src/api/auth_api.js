function authHeaders(token) {
  return {
    headers: {
      Authorization: `Token ${token}`,
    },
  }
}

export const api = {
  async logInGetToken(username, password) {
    const params = new URLSearchParams()
    params.append("username", username)
    params.append("password", password)
    const options = {
      method: `POST`,
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: params,
    }

    return fetch(
      `${process.env.VUE_APP_BACKEND_PROTOCOL}://${process.env.VUE_APP_BACKEND_HOST}:${process.env.VUE_APP_BACKEND_PORT}/api-token-auth/`,
      options
    )
  },
  async createUser(username, password) {
    const params = new URLSearchParams()
    params.append("username", username)
    params.append("password", password)
    const options = {
      method: `POST`,
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: params,
    }

    return fetch(
      `${process.env.VUE_APP_BACKEND_PROTOCOL}://${process.env.VUE_APP_BACKEND_HOST}:${process.env.VUE_APP_BACKEND_PORT}/users/`,
      options
    )
  },
}

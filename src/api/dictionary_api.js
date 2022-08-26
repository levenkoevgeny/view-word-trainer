import axios from "axios"
import { authHeaders } from "@/api/auth_api"

export const dictionary_api = {
  async getDictionaryList(token) {
    return axios.get(
      `${process.env.VUE_APP_BACKEND_PROTOCOL}://${process.env.VUE_APP_BACKEND_HOST}:${process.env.VUE_APP_BACKEND_PORT}/api/dictionaries`,
      authHeaders(token)
    )
  },
  async getDictionaryListCommon(token) {
    return axios.get(
      `${process.env.VUE_APP_BACKEND_PROTOCOL}://${process.env.VUE_APP_BACKEND_HOST}:${process.env.VUE_APP_BACKEND_PORT}/api/dictionaries/common`,
      authHeaders(token)
    )
  },
  async getDictionary(token, dictionary_id) {
    return axios.get(
      `${process.env.VUE_APP_BACKEND_PROTOCOL}://${process.env.VUE_APP_BACKEND_HOST}:${process.env.VUE_APP_BACKEND_PORT}/api/dictionaries/${dictionary_id}`,
      authHeaders(token)
    )
  }
}
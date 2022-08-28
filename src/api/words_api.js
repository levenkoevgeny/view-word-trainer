import axios from "axios"
import { authHeaders } from "@/api/auth_api"

export const words_api = {
  async addWord(token, wordData) {
    return axios.post(`${process.env.VUE_APP_BACKEND_PROTOCOL}://${process.env.VUE_APP_BACKEND_HOST}:${process.env.VUE_APP_BACKEND_PORT}/api/words/`, wordData,
      authHeaders(token))
  },
  async updateWord(token, wordData) {
    return axios.put(`${process.env.VUE_APP_BACKEND_PROTOCOL}://${process.env.VUE_APP_BACKEND_HOST}:${process.env.VUE_APP_BACKEND_PORT}/api/words/${wordData.id}/`,
      wordData,
      authHeaders(token))
  },
  async deleteWord(token, wordId) {
    return axios.delete(`${process.env.VUE_APP_BACKEND_PROTOCOL}://${process.env.VUE_APP_BACKEND_HOST}:${process.env.VUE_APP_BACKEND_PORT}/api/words/${wordId}/`,
      authHeaders(token))
  }
}
import axios from "axios"
import { authHeaders } from "@/api/auth_api"

export const dictionary_api = {
  async getDictionaryList(token, dictionarySearchField='') {
    console.log('getDictionaryList')
    return axios.get(
      `${process.env.VUE_APP_BACKEND_PROTOCOL}://${process.env.VUE_APP_BACKEND_HOST}:${process.env.VUE_APP_BACKEND_PORT}/api/dictionaries?dictionary_name=${dictionarySearchField}`,
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
    console.log('getDictionary get')
    return axios.get(
      `${process.env.VUE_APP_BACKEND_PROTOCOL}://${process.env.VUE_APP_BACKEND_HOST}:${process.env.VUE_APP_BACKEND_PORT}/api/dictionaries/${dictionary_id}`,
      authHeaders(token)
    )
  },
  async updateDictionary(token, dictionaryData) {
    return axios.put(`${process.env.VUE_APP_BACKEND_PROTOCOL}://${process.env.VUE_APP_BACKEND_HOST}:${process.env.VUE_APP_BACKEND_PORT}/api/dictionaries/${dictionaryData.id}/`,
      dictionaryData,
      authHeaders(token))
  },
}
import axios from "axios"
import { authHeaders } from "@/api/auth_api"

export const dictionary_api = {
  async getDictionaryList(token, dictionarySearchField='') {
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
    return axios.get(
      `${process.env.VUE_APP_BACKEND_PROTOCOL}://${process.env.VUE_APP_BACKEND_HOST}:${process.env.VUE_APP_BACKEND_PORT}/api/dictionaries/${dictionary_id}`,
      authHeaders(token)
    )
  },
  async addDictionary(token, dictionaryData) {
    return axios.post(
      `${process.env.VUE_APP_BACKEND_PROTOCOL}://${process.env.VUE_APP_BACKEND_HOST}:${process.env.VUE_APP_BACKEND_PORT}/api/dictionaries/`,
      dictionaryData,
      authHeaders(token)
    )
  },
  async updateDictionary(token, dictionaryData) {
    return axios.put(`${process.env.VUE_APP_BACKEND_PROTOCOL}://${process.env.VUE_APP_BACKEND_HOST}:${process.env.VUE_APP_BACKEND_PORT}/api/dictionaries/${dictionaryData.id}/`,
      dictionaryData,
      authHeaders(token))
  },
  async updateDictionaryPartly(token, dictionaryId, dictionaryData) {
    console.log(dictionaryId)
    console.log(dictionaryData)
    return axios.patch(`${process.env.VUE_APP_BACKEND_PROTOCOL}://${process.env.VUE_APP_BACKEND_HOST}:${process.env.VUE_APP_BACKEND_PORT}/api/dictionaries/${dictionaryId}/`,
      dictionaryData,
      authHeaders(token))
  },
  async deleteDictionary(token, dictionaryId){
    return axios.delete(`${process.env.VUE_APP_BACKEND_PROTOCOL}://${process.env.VUE_APP_BACKEND_HOST}:${process.env.VUE_APP_BACKEND_PORT}/api/dictionaries/${dictionaryId}/`,
      authHeaders(token))
  }
}
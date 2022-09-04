<template>
  <div class="my-3 mx-1 shadow p-3 bg-body rounded row">
    <div class="row d-flex justify-content-center align-items-center">
      <div class="col-1 d-flex align-items-center justify-content-center">
        <div class="mb-3 form-check d-flex align-items-center justify-content-center">
          <input class="form-check-input" type="checkbox" v-model="wordItem.checked_val">
        </div>
      </div>
      <div class="col-11">
        <div class="row">
          <div class="col-lg-4">
            <div class="mb-3">
              <input type="text" class="form-control" v-model="wordItem.word_eng">
            </div>
          </div>
          <div class="col-lg-4">
            <div class="mb-3">
              <input type="text" class="form-control" v-model="wordItem.word_rus">
            </div>

          </div>
          <div class="col-lg-4">

            <div class="mb-3">
              <select class="form-select" aria-label="Default select example" v-model="wordItem.dictionary">
                <option :value="dict.id" v-for="dict in dictionaryList" :key="dict.id">{{ dict.dictionary_name }}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>








  </div>
</template>

<script>

import debounce from "lodash.debounce"
import { words_api } from "@/api/words_api"
import { mapGetters } from "vuex"

export default {
  name: "WordItem",
  props: {
    wordItem: { type: Object, required: true },
    dictionaryList: { type: Array, required: true }
  },
  computed: {
    ...mapGetters({
      userData: "auth/getUser",
      userToken: "auth/getToken"
    })
  },
  methods: {
    updateWordData: debounce(async function() {
      try {
        const response = await words_api.updateWord(
          this.userToken,
          this.wordItem
        )
      } catch (error) {
        // this.$emit("setIsError", true)
      }
    }, 500)
  },
  watch: {
    "wordItem.word_rus": {
      handler(newValue, oldValue) {
        this.updateWordData()
      }
    },
    "wordItem.word_eng": {
      handler(newValue, oldValue) {
        this.updateWordData()
      }
    },
    "wordItem.dictionary": {
      handler(newValue, oldValue) {
        this.updateWordData()
      }
    }
  }
}
</script>

<style scoped>

</style>
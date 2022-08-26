<template>
  <div class="d-flex flex-row my-3">
    <div class="form-check">
      <input class="form-check-input" type="checkbox" v-model="wordItem.checked_val">
    </div>
    <input type="text" class="form-control" v-model="wordItem.word_rus">
    <input type="text" class="form-control mx-2" v-model="wordItem.word_eng">
    <select class="form-select" aria-label="Default select example" v-model="wordItem.dictionary">
      <option :value="dict.id" v-for="dict in dictionaryList" :key="dict.id">{{dict.dictionary_name}}</option>
    </select>
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
    dictionaryList: {type: Array, required: true}
  },
  computed: {
    ...mapGetters({
      userData: "auth/getUser",
      userToken: "auth/getToken"
    }),
  },
  methods:{
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
    },
  }
}
</script>

<style scoped>

</style>
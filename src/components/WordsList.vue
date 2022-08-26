<template>
  <div v-if="isLoading">
    <Spinner />
  </div>
  <div v-else>
    <div class="mb-3">
    <input class="form-control fs-4" type="text" v-model="dictionary.dictionary_name">
    </div>
    <br>

    <form @submit="addNewWordHandler" method="POST">
      <div class="row">
        <div class="col-md-6">
          <div class="mb-3">
            <label class="form-label">Оригинал</label>
            <input type="text" class="form-control" v-model="newWordForm.word_rus">
          </div>
        </div>
        <div class="col-md-6">
          <div class="mb-3">
            <label class="form-label">Перевод</label>
            <input type="text" class="form-control" v-model="newWordForm.word_eng">
          </div>
        </div>
      </div>
      <button type="submit" class="btn btn-primary" style="width: 100%">Добавить</button>
    </form>
    <br>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" @change="checkAllHandler($event)">
      <label class="form-check-label" for="flexCheckDefault">
        Выделить все
      </label>
    </div>
    <button @click="deleteCheckedWordsHandler" class="btn btn-danger">Удалить выбранные</button>
    <div class="mt-3">
      <div v-if="wordsCount" v-for="word in dictionary.words" :key="word.id">
        <WordItem
          @addInCheckedArray="addInCheckedArrayHandler"
          :wordItem="word" />
      </div>
    </div>
  </div>
</template>

<script>
import Spinner from "@/components/common/Spinner"
import { dictionary_api } from "@/api/dictionary_api"
import { mapGetters } from "vuex"
import WordItem from "@/components/WordItem"
import { words_api } from "@/api/words_api"

export default {
  name: "WordsList",
  components: { WordItem, Spinner },
  data() {
    return {
      dictionary: null,
      isLoading: true,
      newWordForm: {
        word_rus: "",
        word_eng: ""
      },
      checkedWordsForDelete: []
    }
  },
  async created() {
    await this.initData()

    this.$watch(
      async () => this.$route.params.id,
      async (toParams, previousParams) => {
        await this.initData()
      }
    )
  },
  computed: {
    ...mapGetters({
      userData: "auth/getUser",
      userToken: "auth/getToken"
    }),
    wordsCount() {
      return this.dictionary.words.length > 0
    }
  },
  methods: {
    async addNewWordHandler(e) {
      e.preventDefault()
      this.isLoading = true
      try {
        const response = await words_api.addWord(
          this.userToken,
          {
            ...this.newWordForm,
            "dictionary": this.dictionary.id
          }
        )
        const newWord = await response.data
        this.dictionary.words.push(newWord)
      } catch (e) {
        this.isError = true
      } finally {
        this.isLoading = false
      }
    },
    deleteCheckedWordsHandler() {
      let requestIds = []
      let responseIds = []

      this.dictionary.words.map(word => {
        if (word.checked_val) {
          requestIds.push(word.id)
        } return
      })
      let requests = requestIds.map(id => words_api.deleteWord(this.userToken, id)
      )
      Promise.all(requests)
        .then(responses => responses.forEach(
          response => {
            responseIds.push(response.data.id)
          })
        ).then(() => {
          this.dictionary.words = this.dictionary.words.filter(word => !responseIds.includes(word.id))
        }
      )
    },
    updateWordHandler() {
    },
    checkAllHandler(e) {
      if (e.target.checked) {
        this.dictionary.words = this.dictionary.words.map(word => ({...word, checked_val: true}))
      } else {
        this.dictionary.words = this.dictionary.words.map(word => ({...word, checked_val: false}))
      }
    },
    async initData() {
      try {
        const response = await dictionary_api.getDictionary(
          this.userToken,
          this.$route.params.id
        )
        this.dictionary = await response.data

        this.dictionary.words = this.dictionary.words.map(word => ({ ...word, checked_val: false }))
      } catch (e) {
        this.isError = true
      } finally {
        this.isLoading = false
      }
    },
    addInCheckedArrayHandler(id, checkedStatus) {
      if (checkedStatus) {
        this.checkedWordsForDelete.push(id)
      } else {
        for (let i = 0; i < this.checkedWordsForDelete.length; i++) {
          if (this.checkedWordsForDelete[i] === id) {
            this.checkedWordsForDelete.splice(i, 1)
          }
        }
      }
    }

  }
}
</script>

<style scoped></style>

<template>
  <div v-if="isLoading" class="d-flex justify-content-center align-items-center border"
       style="width: 100%; height: 100vh">
    <Spinner />
  </div>
  <div v-else>
    <div class="my-3">
      <input
        class="form-control fs-4"
        type="text"
        v-model="dictionary.dictionary_name"
        placeholder="Название словаря">
    </div>
    <div class="my-3">
      <input
        class="form-control fs-6"
        type="text"
        v-model="dictionary.description"
        placeholder="Описание">
    </div>
    <br>

    <div class="shadow p-3 mb-5 bg-body rounded">
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
    </div>

<div class="d-flex flex-row justify-content-between align-items-end">
  <div class="form-check">
    <input class="form-check-input" id="checkAllId" ref="checkAllId" type="checkbox"
           @change="checkAllHandler($event)">
    <label class="form-check-label">
      Выделить все
    </label>
  </div>
  <button @click="deleteCheckedWordsHandler" class="btn btn-danger" v-if="checkedForDeleteCount > 0">
    Удалить выбранные ({{ checkedForDeleteCount }})
  </button>
</div>




    <div class="mt-3">
      <div v-if="wordsCount" v-for="word in filteredWords" :key="word.id">
        <WordItem
          @addInCheckedArray="addInCheckedArrayHandler"
          :wordItem="word"
          :dictionaryList="dictionaryList"
        />
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
import debounce from "lodash.debounce"

export default {
  name: "WordsList",
  components: { WordItem, Spinner },
  data() {
    return {
      dictionaryList: [],
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
        if (this.$route.params.id) {
          await this.initData()
        }
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
    },
    checkedForDeleteCount() {
      let counter = 0
      this.dictionary.words.map(word => {
        if (word.checked_val) {
          counter++
        }
      })
      return counter
    },
    filteredWords() {
      return this.dictionary.words.filter(word => word.dictionary === this.dictionary.id)
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
        this.newWordForm = {
          word_rus: "",
          word_eng: ""
        }
      } catch (e) {
        this.isError = true
      } finally {
        this.isLoading = false
      }
    },
    async initData() {
      try {
        const response = await dictionary_api.getDictionaryList(
          this.userToken
        )
        this.dictionaryList = await response.data


        const responseDict = await dictionary_api.getDictionary(
          this.userToken,
          this.$route.params.id
        )
        this.dictionary = await responseDict.data

        this.dictionary.words = this.dictionary.words.map(word => ({ ...word, checked_val: false }))

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
        }
        return
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
        this.$refs.checkAllId.checked = false
      })
    },
    checkAllHandler(e) {
      if (e.target.checked) {
        this.dictionary.words = this.dictionary.words.map(word => ({ ...word, checked_val: true }))
      } else {
        this.dictionary.words = this.dictionary.words.map(word => ({ ...word, checked_val: false }))
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
    },
    updateDictionaryData: debounce(async function() {
      try {
        const response = await dictionary_api.updateDictionary(
          this.userToken,
          this.dictionary
        )
        // this.$emit("sendSuccessToast")
      } catch (error) {
        // this.$emit("setIsError", true)
      }
    }, 500)
  },
  watch: {
    "dictionary.dictionary_name": {
      handler(newValue, oldValue) {
        this.updateDictionaryData()
      }
    },
    "dictionary.description": {
      handler(newValue, oldValue) {
        this.updateDictionaryData()
      }
    }

  }
}
</script>

<style scoped></style>

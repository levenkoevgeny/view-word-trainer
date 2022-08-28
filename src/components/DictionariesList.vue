<template>
  <!--add modal-->
  <div class="modal fade" id="addDictionaryModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <form @submit="addNewDictionaryHandler" method="POST">
        <div class="modal-content" style="width: 400px;">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Новый словарь</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">Название словаря</label>
              <input type="text" class="form-control" v-model="newDictionaryForm.dictionary_name" required>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" ref="modalClose" data-bs-dismiss="modal">Закрыть</button>
            <button type="submit" class="btn btn-primary">Добавить</button>
          </div>
        </div>
      </form>
    </div>
  </div>

  <div>
    <div class="row">
      <div class="col-md-4">
        <div v-if="isLoading" class="d-flex justify-content-center align-items-center" style="height: 100vh">
          <Spinner />
        </div>
        <div v-else>
          <div class="d-flex flex-column align-items-stretch flex-shrink-0 bg-white">
            <!--            <a href="/"-->
            <!--               class="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom">-->
            <!--              <span class="fs-5 fw-semibold">Dictionary list</span>-->
            <!--            </a>-->
            <!--            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addDictionaryModal">-->
            <!--              Add new-->
            <!--            </button>-->
            <h3 class="my-3">Список словарей</h3>
            <input type="text" class="form-control mt-3" v-model="dictionarySearchField" placeholder="Поиск..."><br>
            <button
              type="button"
              class="btn btn-light link-secondary fs-5 text-center mb-3"
              title="Создать копию"
              data-bs-toggle="modal"
              data-bs-target="#addDictionaryModal"
              style="width: 50px;"
            >
              <font-awesome-icon icon="fa-solid fa-square-plus" style="font-size: 30px;"/>
            </button>
            <div class="list-group list-group-flush border-bottom scrollarea" style="overflow: auto; height: 70vh;">
              <template v-for="dict in dictionariesList" :key="dict.id">
                <div>
                  <button
                    class="list-group-item list-group-item-action py-3 lh-tight d-flex flex-row" aria-current="true"
                    @click="() => this.$router.push({ name: 'dictionary_words', params: { id: dict.id } })">
                    <img :src="getLogoUrlDefault()" class="m-2" alt="ggg" style="height: 30px;">
                    <div>
                      <div class="d-flex w-100 align-items-center justify-content-between">
                        <strong class="mb-1">{{ dict.dictionary_name }}</strong>
                      </div>
                      <div class="col-10 mb-1 small">{{ dict.description }}</div>
                    </div>
                  </button>
                </div>
                <div class="d-flex flex-row">
                  <!--                  <div class="dropdown" style="width: 100%">-->
                  <!--                    <button class="btn btn-sm btn-outline-secondary dropdown-toggle text-wrap" type="button"-->
                  <!--                            id="dropdownMenuButton10" data-bs-toggle="dropdown" aria-expanded="false"-->
                  <!--                            style="border-top-left-radius: 0px; border-bottom-left-radius: 0px;width: 50%">-->
                  <!--                      Тренировать-->
                  <!--                    </button>-->
                  <!--                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">-->
                  <!--                      <li>-->
                  <!--                        <button class="dropdown-item" @click="changeRoute(dict.id, 'dictionaries_time_training')">-->
                  <!--                          Тренировка на скорость-->
                  <!--                        </button>-->
                  <!--                      </li>-->
                  <!--                      <li>-->
                  <!--                        <button class="dropdown-item" @click="changeRoute(dict.id, 'dictionaries_spelling_training')">-->
                  <!--                          Тренировка правописания-->
                  <!--                        </button>-->
                  <!--                      </li>-->
                  <!--                    </ul>-->
                  <!--                  </div>-->
                  <!--                  <div>-->
                  <!--                    <button class="btn btn-outline-danger" @click="deleteDictionaryHandler(dict.id)">Удалить словарь</button>-->
                  <!--                  </div>-->
                </div>

                <!--                <div class="dropdown">-->
                <!--                  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1"-->
                <!--                          data-bs-toggle="dropdown"-->
                <!--                          aria-expanded="false">-->
                <!--                    Train-->
                <!--                  </button>-->
                <!--                  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">-->
                <!--                    <li>-->
                <!--                      <button class="dropdown-item" @click="changeRoute(dict.id, 'dictionaries_time_training')">Time-->
                <!--                        training-->
                <!--                      </button>-->
                <!--                    </li>-->
                <!--                    <li>-->
                <!--                      <button class="dropdown-item" @click="changeRoute(dict.id, 'dictionaries_spelling_training')">-->
                <!--                        Spelling-->
                <!--                        training-->
                <!--                      </button>-->
                <!--                    </li>-->
                <!--                  </ul>-->
                <!--                </div>-->
                <!--                <button @click="deleteDictionaryHandler(dict.id)">Удалить словарь</button>-->


              </template>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <router-view />
      </div>
    </div>
  </div>

</template>

<script>
import { mapGetters } from "vuex"
import Spinner from "@/components/common/Spinner"
import WordItem from "@/components/WordItem"
import { dictionary_api } from "@/api/dictionary_api"
import WordsList from "@/components/WordsList"
import debounce from "lodash.debounce"

export default {
  name: "DictionariesList",
  components: { WordsList, Spinner, WordItem },
  data() {
    return {
      dictionariesList: [],
      wordsList: [],
      dictionarySearchField: "",
      newDictionaryForm: {
        dictionary_name: ""
      },
      isLoading: true,
      isError: false
    }
  },
  async created() {
    await this.initData(this.dictionarySearchField)
  },
  methods: {
    async addNewDictionaryHandler(e) {
      e.preventDefault()
      try {

        const response = await dictionary_api.addDictionary(
          this.userToken,
          {
            ...this.newDictionaryForm,
            "owner": this.userData.id
          }
        )
        const newDictionary = await response.data
        this.dictionariesList.push(newDictionary)
        this.$refs.modalClose.click()
        this.newDictionaryForm.dictionary_name = ""
        // this.$emit("sendSuccessToast")
      } catch (error) {
        // this.$emit("setIsError", true)
      } finally {
      }
    },
    async deleteDictionaryHandler(id) {
      let result = confirm("Удалить словарь со всеми словами?")
      if (result) {
        try {
          await dictionary_api.deleteDictionary(
            this.userToken,
            id)
          this.dictionariesList = this.dictionariesList.filter(dictionary => dictionary.id !== id)
          // this.$emit("sendSuccessToast")
        } catch (error) {
          // this.$emit("setIsError", true)
        } finally {
        }
      }

    },
    changeRoute(dictionaryId, viewName) {
      this.$router.push({
        name: viewName,
        params: { id: parseInt(dictionaryId) }
      })
    },

    searchData: debounce(async function(searchField) {
      try {
        const response = await dictionary_api.getDictionaryList(
          this.userToken, searchField
        )
        this.dictionariesList = await response.data
      } catch (e) {
        this.isError = true
      } finally {
        this.isLoading = false
      }
    }, 500),
    async initData(searchField) {
      this.isLoading = true
      try {
        const response = await dictionary_api.getDictionaryList(
          this.userToken, searchField
        )
        this.dictionariesList = await response.data
      } catch (e) {
        this.isError = true
      } finally {
        this.isLoading = false
      }
    },
    getLogoUrlDefault() {
      return `${process.env.VUE_APP_BACKEND_PROTOCOL}://${process.env.VUE_APP_BACKEND_HOST}:${process.env.VUE_APP_BACKEND_PORT}/media/dictionary/dictionary-default.png`
    }
  },
  computed: {
    ...mapGetters({
      userData: "auth/getUser",
      userToken: "auth/getToken"
    }),
    sortedWords: function() {
      return this.wordsList.sort(function(a, b) {
        if (a.word_rus < b.word_rus) {
          return -1
        }
        if (a.word_rus > b.word_rus) {
          return 1
        }
        return 0
      })
    }
  },
  watch: {
    dictionarySearchField: {
      handler(newValue, oldValue) {
        this.searchData(this.dictionarySearchField)
      }
    }
  }
}
</script>

<style scoped>

.bi {
  vertical-align: -.125em;
  pointer-events: none;
  fill: currentColor;
}

.nav-flush .nav-link {
  border-radius: 0;
}

.btn-toggle-nav a {
  display: inline-flex;
  padding: .1875rem .5rem;
  margin-top: .125rem;
  margin-left: 1.25rem;
  text-decoration: none;
}

.btn-toggle-nav a:hover,
.btn-toggle-nav a:focus {
  background-color: #d2f4ea;
}

.scrollarea {
  overflow-y: auto;
}

.fw-semibold {
  font-weight: 600;
}

.lh-tight {
  line-height: 1.25;
}
</style>

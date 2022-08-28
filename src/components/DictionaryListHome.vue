<template>
<div v-if="isLoading" class="d-flex justify-content-center align-items-center" style="height: 100vh"><Spinner /></div>
<div v-else>
  <div class="alert alert-danger" role="alert" v-if="isError">
    Ошибка загрузки данных...
  </div>
  <div class="modal fade" id="addDictionaryModalHome" tabindex="-1" aria-labelledby="exampleModalLabel"
       aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <form @submit="addNewDictionaryHandler" method="POST">
        <div class="modal-content">
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
  <main>
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <h1 class="fw-light">Album example</h1>
          <p class="lead text-muted">Something short and leading about the collection below—its contents, the creator,
            etc. Make it short and sweet, but not too short so folks don’t simply skip over it entirely.</p>
          <p>
            <!--            <a href="#" class="btn btn-primary my-2">Main call to action</a>-->
            <!--            <a href="#" class="btn btn-secondary my-2">Secondary action</a>-->
          </p>
        </div>
      </div>
    </section>
    <div class="my-3">
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addDictionaryModalHome">
        Добавить словарь
      </button>
    </div>
    <div class="album py-5 bg-light">
      <div class="container">
        <h1 class="mb-3">Ваши словари</h1>

        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">

          <div class="col" v-for="dict in dictionariesList" :key="dict.id">
            <div class="card shadow-sm">
              <div class="d-flex justify-content-center align-items-center">
                <img :src="getLogoUrl(dict.logo)" class="img-fluid m-2" alt="No image" style="width: 50%; height: 150px;" v-if="dict.logo">
                <img :src="getLogoUrlDefault()" class="img-fluid m-2" alt="No image" style="width: 50%; height: 150px;" v-else>
              </div>


              <div class="card-body">
                <h5>{{ dict.dictionary_name }}</h5>
                <p class="card-text text-truncate" style="height: 20px"
                   title="This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.">
                  This is a wider card with supporting text below as a natural lead-in to additional content. This
                  content is a little bit longer.</p>
                <div style="height: 10px;"></div>
                <small class="text-muted">{{ dict.words.length }} слов</small>
                <div class="d-flex justify-content-between align-items-center mt-2">
                  <div class="btn-group" style="width: 100%">
                    <button type="button"
                            class="btn btn-sm btn-outline-secondary" style="width: 50%"
                            @click="changeRoute(dict.id, 'dictionary_words')">Редакт.
                    </button>
                    <div class="dropdown" style="width: 50%">
                      <button class="btn btn-sm btn-outline-secondary dropdown-toggle text-wrap" type="button"
                              id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"
                              style="border-top-left-radius: 0px; border-bottom-left-radius: 0px;width: 100%">
                        Трен.
                      </button>
                      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li>
                          <button class="dropdown-item" @click="changeRoute(dict.id, 'dictionaries_time_training')">
                            Тренировка на скорость
                          </button>
                        </li>
                        <li>
                          <button class="dropdown-item" @click="changeRoute(dict.id, 'dictionaries_spelling_training')">
                            Тренировка правописания
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        <h1 class="my-3">Общие словари</h1>
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">

          <div class="col" v-for="dict in dictionariesListCommon" :key="dict.id">
            <div class="card shadow-sm">
              <div class="d-flex justify-content-center align-items-center">
                <img :src="getLogoUrl(dict.logo)" class="img-fluid m-2" alt="No image" style="width: 50%; height: 150px;" v-if="dict.logo">
                <img :src="getLogoUrlDefault()" class="img-fluid m-2" alt="No image" style="width: 50%; height: 150px;" v-else>
              </div>
              <div class="card-body">
                <h5>{{ dict.dictionary_name }}</h5>
                <p class="card-text text-truncate" style="height: 20px"
                   title="This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.">
                  This is a wider card with supporting text below as a natural lead-in to additional content. This
                  content is a little bit longer.</p>
                <div style="height: 10px;"></div>
                <small class="text-muted">{{ dict.words.length }} слов</small>
                <div class="d-flex justify-content-between align-items-center mt-2">
                  <div class="btn-group" style="width: 100%">
                    <div class="dropdown" style="width: 100%">
                      <button class="btn btn-sm btn-outline-secondary dropdown-toggle text-wrap" type="button"
                              id="dropdownMenuButton10" data-bs-toggle="dropdown" aria-expanded="false"
                              style="border-top-left-radius: 0px; border-bottom-left-radius: 0px;width: 100%">
                        Тренировать
                      </button>
                      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li>
                          <button class="dropdown-item" @click="changeRoute(dict.id, 'dictionaries_time_training')">
                            Тренировка на скорость
                          </button>
                        </li>
                        <li>
                          <button class="dropdown-item" @click="changeRoute(dict.id, 'dictionaries_spelling_training')">
                            Тренировка правописания
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

  </main>
</div>

</template>

<script>
import { mapGetters } from "vuex"
import Spinner from "@/components/common/Spinner"
import { dictionary_api } from "@/api/dictionary_api"

export default {
  name: "DictionaryListHome",
  components: { Spinner },
  data() {
    return {
      dictionariesList: [],
      dictionariesListCommon: [],
      newDictionaryForm: {
        dictionary_name: ""
      },
      dictionarySearchField: "",
      isLoading: true,
      isError: false
    }
  },
  async created() {
    try {

      const response = await dictionary_api.getDictionaryList(
        this.userToken, this.dictionarySearchField
      )
      const responseCommon = await dictionary_api.getDictionaryListCommon(
        this.userToken
      )
      this.dictionariesList = await response.data
      this.dictionariesListCommon = await responseCommon.data
    } catch (e) {
      this.isError = true
    } finally {
      this.isLoading = false
    }
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
    deleteDictionaryHandler() {
    },
    updateDictionaryHandler() {
    },
    changeRoute(dictionaryId, viewName) {
      this.$router.push({
        name: viewName,
        params: { id: parseInt(dictionaryId) }
      })
    },
    getLogoUrl(path) {
      return `${process.env.VUE_APP_BACKEND_PROTOCOL}://${process.env.VUE_APP_BACKEND_HOST}:${process.env.VUE_APP_BACKEND_PORT}${path}`
    },
    getLogoUrlDefault() {
      return `${process.env.VUE_APP_BACKEND_PROTOCOL}://${process.env.VUE_APP_BACKEND_HOST}:${process.env.VUE_APP_BACKEND_PORT}/media/dictionary/dictionary-default.png`
    },
  },
  computed: {
    ...mapGetters({
      userData: "auth/getUser",
      userToken: "auth/getToken"
    })
  }
}
</script>

<style scoped>

.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}

</style>